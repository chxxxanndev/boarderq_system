import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req) {
  try {
    const user = getCurrentUser(req);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized Admin Access" }, { status: 401 });
    }

    const query = `
      SELECT 
        u.id, u.name, u.email, u.status, u.created_at,
        a.id as application_id,
        a.room_id as preferred_room_id,
        r.name as preferred_room_name
      FROM users u
      LEFT JOIN applications a ON u.email = a.applicant_email AND a.status IN ('pending', 'approved')
      LEFT JOIN rooms r ON a.room_id = r.id
      WHERE u.role = 'tenant' AND u.status = 'pending'
      ORDER BY u.created_at DESC
    `;
    const [rows] = await pool.query(query);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET Users Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  const connection = await pool.getConnection(); 
  try {
    const adminUser = getCurrentUser(req);
    if (!adminUser || adminUser.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, status, room_id } = await req.json();

    if (status === 'active') {
      if (!room_id) return NextResponse.json({ error: "Room selection required" }, { status: 400 });

      await connection.beginTransaction(); 

      const [userRows] = await connection.query("SELECT email FROM users WHERE id = ?", [id]);
      if (userRows.length === 0) throw new Error("User not found");
      const userEmail = userRows[0].email;

      await connection.query("UPDATE users SET status = 'active' WHERE id = ?", [id]);

      await connection.query(
        "INSERT INTO room_tenants (room_id, user_id, move_in_date) VALUES (?, ?, CURDATE())",
        [room_id, id]
      );

      if (userEmail) {
        await connection.query(
          "UPDATE applications SET status = 'approved', reviewed_at = CURRENT_TIMESTAMP WHERE applicant_email = ? AND status = 'pending'",
          [userEmail]
        );
      }

      await connection.commit(); 
      return NextResponse.json({ message: "Tenant activated!" });
    }

    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  } catch (error) {
    if (connection) await connection.rollback();
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    connection.release();
  }
}

export async function DELETE(req) {
  try {
    const adminUser = getCurrentUser(req);
    if (!adminUser || adminUser.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await pool.query('DELETE FROM users WHERE id = ?', [id]);

    return NextResponse.json({ message: "User removed successfully" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
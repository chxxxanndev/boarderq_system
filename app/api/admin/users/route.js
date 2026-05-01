import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // FIXED: Added single quotes around string values in the IN clause
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

export async function PATCH(request) {
  const connection = await pool.getConnection(); 
  try {
    const { id, status, room_id } = await request.json();

    if (status === 'active') {
      if (!room_id) return NextResponse.json({ error: "Room selection required" }, { status: 400 });

      await connection.beginTransaction(); 

      // 1. Get user email first to find their application
      const [userRows] = await connection.query("SELECT email FROM users WHERE id = ?", [id]);
      if (userRows.length === 0) throw new Error("User not found");
      const userEmail = userRows[0].email;

      // 2. Activate User
      await connection.query("UPDATE users SET status = 'active' WHERE id = ?", [id]);

      // 3. Assign to Room
      await connection.query(
        "INSERT INTO room_tenants (room_id, user_id, move_in_date) VALUES (?, ?, CURDATE())",
        [room_id, id]
      );

      // 4. AUTOMATIC: Sync any application for this email
      // We update to approved just in case it was still pending
      if (userEmail) {
        await connection.query(
          "UPDATE applications SET status = 'approved', reviewed_at = CURRENT_TIMESTAMP WHERE applicant_email = ? AND status = 'pending'",
          [userEmail]
        );
      }

      await connection.commit(); 
      return NextResponse.json({ message: "Tenant activated and deployed!" });
    }

    return NextResponse.json({ error: "Invalid status update" }, { status: 400 });
  } catch (error) {
    if (connection) await connection.rollback();
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    connection.release();
  }
}
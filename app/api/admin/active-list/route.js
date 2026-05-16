import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req) {
  try {
    const user = getCurrentUser(req);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized Admin" }, { status: 401 });
    }

    const [rows] = await pool.query(`
      SELECT 
        rt.id as tenancy_id, 
        u.name as tenant_name, 
        u.email as tenant_email,
        r.name as room_name, 
        r.monthly_rate, 
        rt.move_in_date, 
        rt.move_out_date
      FROM room_tenants rt
      LEFT JOIN users u ON rt.user_id = u.id
      LEFT JOIN rooms r ON rt.room_id = r.id
      ORDER BY rt.created_at DESC
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Active List GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req) {
  const connection = await pool.getConnection(); 
  try {
    const user = getCurrentUser(req);
    if (!user || user.role !== 'admin') return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await req.json(); 

    await connection.beginTransaction();

    const [tenancy] = await connection.query('SELECT user_id FROM room_tenants WHERE id = ?', [id]);
    
    if (tenancy.length === 0) {
        await connection.rollback();
        return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    const userId = tenancy[0].user_id;

    await connection.query('DELETE FROM room_tenants WHERE id = ?', [id]);

    await connection.query('DELETE FROM users WHERE id = ?', [userId]);

    await connection.commit();
    return NextResponse.json({ message: "Resident account and tenancy deleted" });

  } catch (error) {
    await connection.rollback();
    console.error("Move-out Deletion Error:", error);
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  } finally {
    connection.release();
  }
}
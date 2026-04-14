import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req) {
  try {
    const user = getCurrentUser(req);
    if (!user || user.role !== 'admin') {
      // Always return JSON
      return NextResponse.json({ error: "Unauthorized Admin" }, { status: 401 });
    }

    const [rows] = await pool.query(`
      SELECT rt.id as tenancy_id, u.name as tenant_name, u.email as tenant_email,
             r.name as room_name, r.monthly_rate, rt.move_in_date, rt.move_out_date
      FROM room_tenants rt
      JOIN users u ON rt.user_id = u.id
      JOIN rooms r ON rt.room_id = r.id
      ORDER BY rt.move_out_date ASC, rt.move_in_date DESC
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Active List API Error:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
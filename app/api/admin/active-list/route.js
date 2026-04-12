import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // We join room_tenants with users and rooms to get the full picture
    const [rows] = await pool.query(`
      SELECT 
        rt.id as tenancy_id,
        u.name as tenant_name,
        u.email as tenant_email,
        r.name as room_name,
        r.monthly_rate,
        rt.move_in_date
      FROM room_tenants rt
      JOIN users u ON rt.user_id = u.id
      JOIN rooms r ON rt.room_id = r.id
      ORDER BY rt.move_in_date DESC
    `);

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Handle Move-Out
export async function DELETE(request) {
  const connection = await pool.getConnection();
  try {
    const { searchParams } = new URL(request.url);
    const tenancy_id = searchParams.get('id');

    await connection.beginTransaction();

    // 1. Find the room_id before deleting the record so we can mark the room as available
    const [tenancy] = await connection.query('SELECT room_id FROM room_tenants WHERE id = ?', [tenancy_id]);
    if (tenancy.length === 0) throw new Error("Tenancy not found");
    const roomId = tenancy[0].room_id;

    // 2. Remove the tenancy record
    await connection.query('DELETE FROM room_tenants WHERE id = ?', [tenancy_id]);

    // 3. Mark the room as available again
    await connection.query("UPDATE rooms SET status = 'available' WHERE id = ?", [roomId]);

    await connection.commit();
    return NextResponse.json({ message: "Move-out processed. Room is now available." });
  } catch (error) {
    await connection.rollback();
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    connection.release();
  }
}
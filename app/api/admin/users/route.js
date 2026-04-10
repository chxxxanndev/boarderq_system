import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, status, created_at FROM users WHERE role = 'tenant' AND status = 'pending' ORDER BY created_at DESC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  const connection = await pool.getConnection(); // Get a connection for a transaction
  try {
    const { id, status, room_id } = await request.json();

    if (status === 'active') {
      if (!room_id) return NextResponse.json({ error: "Room selection required" }, { status: 400 });

      await connection.beginTransaction(); // START TRANSACTION

      // 1. Activate User
      await connection.query("UPDATE users SET status = 'active' WHERE id = ?", [id]);

      // 2. Assign to Room (Current date as move-in date)
      await connection.query(
        "INSERT INTO room_tenants (room_id, user_id, move_in_date) VALUES (?, ?, CURDATE())",
        [room_id, id]
      );

      // 3. Mark Room as Occupied
      await connection.query("UPDATE rooms SET status = 'occupied' WHERE id = ?", [room_id]);

      await connection.commit(); // SAVE ALL CHANGES
      return NextResponse.json({ message: "Tenant activated and room assigned!" });
    }

    return NextResponse.json({ error: "Invalid status update" }, { status: 400 });
  } catch (error) {
    await connection.rollback(); // CANCEL EVERYTHING IF ONE FAILS
    console.error("Activation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    connection.release();
  }
}
import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

export async function PATCH(request) {
  try {
    const user = getCurrentUser(request);
    const { date } = await request.json();

    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await pool.query(
      "UPDATE room_tenants SET move_out_date = ? WHERE user_id = ? AND move_out_date IS NULL",
      [date, user.id]
    );

    return NextResponse.json({ message: "Move-out notice submitted successfully." });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
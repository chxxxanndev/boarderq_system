// app/api/auth/approve-user/route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { userId } = await request.json();

    // Update user to active
    await pool.query('UPDATE users SET status = "active" WHERE id = ?', [userId]);

    return NextResponse.json({ message: "User access granted!" });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
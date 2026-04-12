// app/api//route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { title, body, created_by } = await request.json();
    await pool.query(
      'INSERT INTO announcements (title, body, created_by) VALUES (?, ?, ?)',
      [title, body, created_by || 1] // Default to admin ID 1
    );
    return NextResponse.json({ message: "Announcement broadcasted!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
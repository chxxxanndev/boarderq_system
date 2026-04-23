// app/api/announcements/route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

// ─── ADD THIS GET METHOD ───
export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        a.id, a.title, a.body, a.created_at, 
        u.name as author 
      FROM announcements a
      JOIN users u ON a.created_by = u.id
      ORDER BY a.created_at DESC
      LIMIT 10
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET /announcements error:", error);
    return NextResponse.json({ error: "Failed to fetch announcements" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, body, created_by } = await request.json();
    await pool.query(
      'INSERT INTO announcements (title, body, created_by) VALUES (?, ?, ?)',
      [title, body, created_by || 1] 
    );
    return NextResponse.json({ message: "Announcement broadcasted!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
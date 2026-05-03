import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req) {
  try {
    const [rows] = await pool.query(`
      SELECT 
        a.id, a.title, a.body, a.created_at, 
        u.name as author 
      FROM announcements a
      JOIN users u ON a.created_by = u.id
      ORDER BY a.created_at DESC
    `);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req) {
  const user = getCurrentUser(req);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, body } = await req.json();
    await pool.query(
      'INSERT INTO announcements (title, body, created_by) VALUES (?, ?, ?)',
      [title, body, user.id]
    );
    return NextResponse.json({ message: "Broadcasted!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
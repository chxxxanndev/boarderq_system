// app/api/admin/applications/route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [stats] = await pool.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
        SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected
      FROM applications
    `);

    const [rows] = await pool.query(`
      SELECT a.*, r.name as room_name 
      FROM applications a 
      JOIN rooms r ON a.room_id = r.id 
      WHERE a.status = 'pending'
      ORDER BY a.applied_at DESC
    `);

    return NextResponse.json({
      stats: stats[0],
      applications: rows
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { id, status } = await request.json();
    
    await pool.query('UPDATE applications SET status = ?, reviewed_at = CURRENT_TIMESTAMP WHERE id = ?', [status, id]);

    return NextResponse.json({ message: `Application ${status}` });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
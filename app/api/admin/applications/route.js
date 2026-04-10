import pool from '@/lib/db';
import { NextResponse } from 'next/server';

// GET: Fetch all applications and stats
export async function GET() {
  try {
    // 1. Fetch Stats
    const [stats] = await pool.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
        SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected
      FROM applications
    `);

    // 2. Fetch Pending Applications with Room Names
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

// PATCH: Update application status (Approve/Reject)
export async function PATCH(request) {
  try {
    const { id, status } = await request.json();
    
    // Update the application status
    await pool.query('UPDATE applications SET status = ?, reviewed_at = CURRENT_TIMESTAMP WHERE id = ?', [status, id]);

    // OPTIONAL: If approved, you could also update the room status to 'occupied' here
    // But usually, that's done after the tenant actually moves in.

    return NextResponse.json({ message: `Application ${status}` });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
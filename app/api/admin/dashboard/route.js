// app/api/admin/dashboard/route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. Get Stats
    const [tenants] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'tenant' AND status = 'active'");
    const [available] = await pool.query("SELECT COUNT(*) as count FROM rooms WHERE status = 'available'");
    const [maintenance] = await pool.query("SELECT COUNT(*) as count FROM maintenance_requests WHERE status = 'pending'");
    const [revenue] = await pool.query("SELECT SUM(amount) as total FROM payments WHERE status = 'confirmed'");

    // 2. Get Recent Applications (Module 1)
    const [apps] = await pool.query(`
      SELECT a.*, r.name as room_name 
      FROM applications a 
      JOIN rooms r ON a.room_id = r.id 
      WHERE a.status = 'pending' 
      ORDER BY a.applied_at DESC LIMIT 3
    `);

    // 3. Get System Logs (Creative Feature)
    const [logs] = await pool.query("SELECT title, created_at FROM announcements ORDER BY created_at DESC LIMIT 4");

    return NextResponse.json({
      stats: {
        tenants: tenants[0].count,
        available: available[0].count,
        maintenance: maintenance[0].count,
        revenue: revenue[0].total || 0
      },
      recentApplications: apps,
      systemLogs: logs
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
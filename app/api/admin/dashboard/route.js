import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. Get Stats
    const [tenants] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'tenant' AND status = 'active'");
    const [available] = await pool.query("SELECT COUNT(*) as count FROM rooms WHERE status = 'available'");
    const [maintenance] = await pool.query("SELECT COUNT(*) as count FROM maintenance_requests WHERE status = 'pending'");
    const [revenue] = await pool.query("SELECT COALESCE(SUM(amount), 0) as total FROM payments WHERE status = 'confirmed'");
    // 2. Get Recent Applications 
    const [apps] = await pool.query(`
      SELECT a.applicant_name as name, r.name as room_name, a.applied_at 
      FROM applications a 
      JOIN rooms r ON a.room_id = r.id 
      WHERE a.status = 'pending' 
      ORDER BY a.applied_at DESC LIMIT 3
    `);

    // Return a flat structure to match the frontend state
    return NextResponse.json({
      tenants: tenants[0].count,
      available: available[0].count,
      maintenance: maintenance[0].count,
      revenue: revenue[0].total || 0,
      applications: apps // Matches data?.applications in your frontend
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
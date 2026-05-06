import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [tenants] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'tenant' AND status = 'active'");
    const [available] = await pool.query("SELECT COUNT(*) as count FROM rooms WHERE status = 'available'");
    const [maintenance] = await pool.query("SELECT COUNT(*) as count FROM maintenance_requests WHERE status = 'pending'");
    const [revenue] = await pool.query("SELECT COALESCE(SUM(amount), 0) as total FROM payments WHERE status = 'confirmed'");
    const [occupied] = await pool.query("SELECT COUNT(DISTINCT user_id) as count FROM room_tenants WHERE move_out_date IS NULL");
    const [totalRooms] = await pool.query("SELECT COUNT(*) as count FROM rooms");
    const [pendingPay] = await pool.query("SELECT COUNT(*) as count FROM payments WHERE status = 'pending'");

    const [newestTenant] = await pool.query(`
      SELECT u.name, u.email, u.created_at, r.name as room_name
      FROM users u
      JOIN room_tenants rt ON u.id = rt.user_id
      JOIN rooms r ON rt.room_id = r.id
      WHERE u.role = 'tenant' AND u.status = 'active'
      ORDER BY u.created_at DESC LIMIT 1
    `);

    const [topRoom] = await pool.query(`
      SELECT r.name, SUM(p.amount) as total
      FROM payments p
      JOIN rooms r ON p.room_id = r.id
      WHERE p.status = 'confirmed'
      GROUP BY r.id, r.name
      ORDER BY total DESC LIMIT 1
    `);

    const [apps] = await pool.query(`
      SELECT 
        'application' as type, a.id, a.applicant_name as actor,
        r.name as room_name, a.status, a.applied_at as timestamp
      FROM applications a 
      JOIN rooms r ON a.room_id = r.id 
      ORDER BY a.applied_at DESC LIMIT 5
    `);

    const [payments] = await pool.query(`
      SELECT 
        'payment' as type, p.id, u.name as actor,
        r.name as room_name, p.amount, p.method, p.status,
        p.created_at as timestamp
      FROM payments p
      JOIN users u ON p.tenant_id = u.id
      JOIN rooms r ON p.room_id = r.id
      ORDER BY p.created_at DESC LIMIT 5
    `);

    const [maintenanceItems] = await pool.query(`
      SELECT 
        'maintenance' as type, m.id, u.name as actor,
        r.name as room_name, m.title, m.status,
        m.created_at as timestamp
      FROM maintenance_requests m
      JOIN users u ON m.tenant_id = u.id
      JOIN rooms r ON m.room_id = r.id
      ORDER BY m.created_at DESC LIMIT 5
    `);

    const activity = [...apps, ...payments, ...maintenanceItems]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);

    return NextResponse.json({
      tenants: tenants[0].count,
      available: available[0].count,
      maintenance: maintenance[0].count,
      revenue: revenue[0].total || 0,
      occupancy: {
        occupied: occupied[0].count,
        total: totalRooms[0].count,
      },
      pendingPayments: pendingPay[0].count,
      newestTenant: newestTenant[0] ?? null,
      topRoom: topRoom[0] ?? null,
      applications: apps,
      activity,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req) {
  try {
    const user = getCurrentUser(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    let notifications = [];

    if (user.role === 'admin') {
      const [apps] = await pool.query(`
        SELECT 
          a.id,
          'application' as type,
          a.applicant_name as actor,
          r.name as room_name,
          a.applied_at as date,
          'pending' as status
        FROM applications a
        JOIN rooms r ON a.room_id = r.id
        WHERE a.status = 'pending'
        ORDER BY a.applied_at DESC
        LIMIT 5
      `);

      const [pays] = await pool.query(`
        SELECT
          p.id,
          'payment' as type,
          u.name as actor,
          r.name as room_name,
          p.amount,
          p.method,
          p.created_at as date,
          p.status
        FROM payments p
        JOIN users u ON p.tenant_id = u.id
        JOIN rooms r ON p.room_id = r.id
        WHERE p.status = 'pending'
        ORDER BY p.created_at DESC
        LIMIT 5
      `);

      const [flagged] = await pool.query(`
        SELECT
          p.id,
          'flagged' as type,
          u.name as actor,
          r.name as room_name,
          p.amount,
          p.method,
          p.created_at as date,
          p.status
        FROM payments p
        JOIN users u ON p.tenant_id = u.id
        JOIN rooms r ON p.room_id = r.id
        WHERE p.status = 'flagged'
        ORDER BY p.created_at DESC
        LIMIT 3
      `);

      const [maint] = await pool.query(`
        SELECT
          m.id,
          'maintenance' as type,
          u.name as actor,
          r.name as room_name,
          m.title as issue,
          m.created_at as date,
          m.status
        FROM maintenance_requests m
        JOIN users u ON m.tenant_id = u.id
        JOIN rooms r ON m.room_id = r.id
        WHERE m.status IN ('pending', 'received')
        ORDER BY m.created_at DESC
        LIMIT 5
      `);

      notifications = [...apps, ...pays, ...flagged, ...maint]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 15);

    } else {

      const [ann] = await pool.query(`
        SELECT
          a.id,
          'announcement' as type,
          a.title,
          a.body,
          a.created_at as date
        FROM announcements a
        ORDER BY a.created_at DESC
        LIMIT 5
      `);

      const [pays] = await pool.query(`
        SELECT
          p.id,
          'payment' as type,
          p.amount,
          p.method,
          r.name as room_name,
          p.status,
          p.updated_at as date
        FROM payments p
        JOIN rooms r ON p.room_id = r.id
        WHERE p.tenant_id = ? AND p.status IN ('confirmed', 'flagged')
        ORDER BY p.updated_at DESC
        LIMIT 5
      `, [user.id]);

      const [maint] = await pool.query(`
        SELECT
          m.id,
          'maintenance' as type,
          m.title as issue,
          r.name as room_name,
          m.status,
          m.updated_at as date
        FROM maintenance_requests m
        JOIN rooms r ON m.room_id = r.id
        WHERE m.tenant_id = ? AND m.status IN ('in_progress', 'resolved')
        ORDER BY m.updated_at DESC
        LIMIT 5
      `, [user.id]);

      notifications = [...ann, ...pays, ...maint]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 12);
    }

    return NextResponse.json(notifications);
  } catch (err) {
    console.error('Notifications API error:', err);
    return NextResponse.json([], { status: 500 });
  }
}
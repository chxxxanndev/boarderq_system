import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req) {
  try {
    const user = getCurrentUser(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    let notifications = [];

    if (user.role === 'admin') {
      // 1. Get Pending Applications
      const [apps] = await pool.query(
        'SELECT id, applicant_name as title, "New Application" as type, applied_at as date FROM applications WHERE status = "pending" ORDER BY applied_at DESC LIMIT 3'
      );
      // 2. Get Pending Payments
      const [pays] = await pool.query(
        'SELECT id, CONCAT("P", amount) as title, "Pending Payment" as type, created_at as date FROM payments WHERE status = "pending" ORDER BY created_at DESC LIMIT 3'
      );
      notifications = [...apps, ...pays];
    } else {
      // 1. Get Latest Announcements
      const [ann] = await pool.query(
        'SELECT id, title, "Announcement" as type, created_at as date FROM announcements ORDER BY created_at DESC LIMIT 5'
      );
      notifications = ann;
    }

    return NextResponse.json(notifications);
  } catch (err) {
    return NextResponse.json([], { status: 500 });
  }
}
// app/api/tenant/dashboard/route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const decoded = verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // 1. Fetch User & Room Details
    const [userData] = await pool.query(`
      SELECT u.name, r.name as room_name, r.monthly_rate, rt.move_in_date
      FROM users u
      LEFT JOIN room_tenants rt ON u.id = rt.user_id
      LEFT JOIN rooms r ON rt.room_id = r.id
      WHERE u.id = ?
    `, [userId]);

    // 2. NEW: Fetch Latest Payment Status for this month
    const [payments] = await pool.query(`
      SELECT status, amount, created_at 
      FROM payments 
      WHERE tenant_id = ? 
      ORDER BY created_at DESC LIMIT 1
    `, [userId]);

    // 3. Fetch Announcements
    const [announcements] = await pool.query(
      "SELECT id, title, body, created_at FROM announcements ORDER BY created_at DESC LIMIT 5"
    );

    // 4. Calculate Next Due Date
    const moveInDate = userData[0]?.move_in_date || new Date();
    const nextDue = new Date();
    nextDue.setDate(new Date(moveInDate).getDate());
    if (nextDue < new Date()) nextDue.setMonth(nextDue.getMonth() + 1);

    return NextResponse.json({
      user: userData[0],
      paymentStatus: payments[0]?.status || 'unpaid', // status from DB: 'pending', 'confirmed', etc.
      announcements: announcements,
      nextDueDate: nextDue.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
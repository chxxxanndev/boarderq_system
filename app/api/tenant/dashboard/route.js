import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const decoded = verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const [userData] = await pool.query(`
      SELECT u.name, u.email, u.status,
        r.name as room_name, r.monthly_rate, r.amenities, r.location,
        rt.move_in_date, rt.move_out_date, rt.room_id
      FROM users u
      LEFT JOIN room_tenants rt ON u.id = rt.user_id AND rt.move_out_date IS NULL
      LEFT JOIN rooms r ON rt.room_id = r.id
      WHERE u.id = ?
    `, [userId]);

    const [payments] = await pool.query(`
      SELECT id, amount, status, method, month_covered, created_at
      FROM payments
      WHERE tenant_id = ?
      ORDER BY created_at DESC
    `, [userId]);

    const [maintenance] = await pool.query(`
      SELECT id, title, status, created_at, updated_at
      FROM maintenance_requests
      WHERE tenant_id = ?
      ORDER BY created_at DESC
      LIMIT 5
    `, [userId]);

    const recentPayments = payments.slice(0, 3).map(p => ({
      type: 'payment',
      id: p.id,
      title: `₱${Number(p.amount).toLocaleString()} payment`,
      status: p.status,
      date: p.created_at,
    }));

    const recentMaintenance = maintenance.slice(0, 3).map(m => ({
      type: 'maintenance',
      id: m.id,
      title: m.title,
      status: m.status,
      date: m.created_at,
    }));

    const recentActivity = [...recentPayments, ...recentMaintenance]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    const totalPaid = payments
      .filter(p => p.status === 'confirmed')
      .reduce((sum, p) => sum + Number(p.amount), 0);
    const pendingPayments = payments.filter(p => p.status === 'pending').length;
    const latestPayment = payments[0] ?? null;

    // ── Days since move-in — only calculate if move_in_date actually exists ──
    const rawMoveIn = userData[0]?.move_in_date;
    const moveIn = rawMoveIn ? new Date(rawMoveIn) : null;
    const daysSinceMoveIn =
      moveIn && !isNaN(moveIn.getTime())
        ? Math.floor((Date.now() - moveIn.getTime()) / (1000 * 60 * 60 * 24))
        : 0;

    // ── Next due date — based on move-in day of month ──
    let nextDueDate = null;
    if (moveIn && !isNaN(moveIn.getTime())) {
      const nextDue = new Date();
      nextDue.setDate(moveIn.getDate());
      nextDue.setHours(0, 0, 0, 0);
      if (nextDue <= new Date()) nextDue.setMonth(nextDue.getMonth() + 1);
      nextDueDate = nextDue.toLocaleDateString('en-US', {
        month: 'long', day: '2-digit', year: 'numeric',
      });
    }

    return NextResponse.json({
      user: userData[0],
      paymentStatus: latestPayment?.status || 'unpaid',
      latestPayment,
      totalPaid,
      pendingPayments,
      maintenance,
      recentActivity,
      nextDueDate,
      daysSinceMoveIn,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
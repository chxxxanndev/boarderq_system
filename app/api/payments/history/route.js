import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function GET(request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = verify(token, process.env.JWT_SECRET);

    const [rows] = await pool.query(`
      SELECT 
        p.id, p.amount, p.method, p.status,
        p.reference_number, p.proof_url,
        p.month_covered, p.notes,
        p.created_at
      FROM payments p
      WHERE p.tenant_id = ?
      ORDER BY p.created_at DESC
    `, [decoded.id]);

    return NextResponse.json(rows);
  } catch (err) {
    console.error('Payment history error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.id, 
        p.amount, 
        p.method, 
        p.reference_number, 
        p.month_covered,
        p.proof_url,
        p.notes,
        p.status,
        p.created_at,
        u.name as tenant_name, 
        r.name as room_name
      FROM payments p
      JOIN users u ON p.tenant_id = u.id
      JOIN rooms r ON p.room_id = r.id
      ORDER BY p.created_at DESC
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Admin Payment Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch ledger" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    let adminId = null;
    if (token) {
      const decoded = verify(token, process.env.JWT_SECRET);
      adminId = decoded.id;
    }

    const { id, status, notes } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    await pool.query(
      `UPDATE payments 
       SET status = ?, 
           notes = ?,
           verified_at = NOW(), 
           verified_by = ?, 
           paid_date = CURDATE() 
       WHERE id = ?`,
      [status, notes ?? null, adminId, id]
    );

    return NextResponse.json({ message: "Transaction status updated" });
  } catch (error) {
    console.error("Admin Payment Patch Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
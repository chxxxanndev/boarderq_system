import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function PATCH(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const decoded = verify(token, process.env.JWT_SECRET);
    const adminId = decoded.id; // Get the Admin's ID

    const { id, status } = await request.json();

    if (status === 'confirmed') {
      // If confirmed, fill in verified_by and set paid_date to today
      await pool.query(
        `UPDATE payments 
         SET status = ?, 
             verified_at = NOW(), 
             verified_by = ?, 
             paid_date = CURDATE() 
         WHERE id = ?`,
        [status, adminId, id]
      );
    } else {
      // If flagged/rejected, just update status
      await pool.query(
        "UPDATE payments SET status = ?, verified_at = NOW() WHERE id = ?",
        [status, id]
      );
    }

    return NextResponse.json({ message: "Ledger Updated" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
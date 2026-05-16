import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { amount, method, reference_number, month_covered, notes, proof_url } = await request.json();

    const [roomData] = await pool.query(
      "SELECT room_id FROM room_tenants WHERE user_id = ? ORDER BY created_at DESC LIMIT 1",
      [userId]
    );

    if (roomData.length === 0) {
      return NextResponse.json({ error: "No room assigned to this user node" }, { status: 400 });
    }

    const room_id = roomData[0].room_id;

    await pool.query(
      `INSERT INTO payments 
      (tenant_id, room_id, amount, method, status, reference_number, proof_url, month_covered, due_date, notes) 
      VALUES (?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?)`,
      [userId, room_id, amount, method, reference_number, proof_url, month_covered, month_covered, notes]
    );

    return NextResponse.json({ message: "Transmission Success" }, { status: 201 });

  } catch (error) {
    console.error("Payment API Error:", error);
    return NextResponse.json({ error: "System Error during transmission" }, { status: 500 });
  }
}
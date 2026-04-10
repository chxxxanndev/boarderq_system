// app/api/auth/me/route.js
import pool from '@/lib/db';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Get token from headers
    const authHeader = request.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: "No token" }, { status: 401 });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'boarderq_secret_key');

    // Fetch fresh data from DB
    const [rows] = await pool.query(
        'SELECT name, email, role, status FROM users WHERE id = ?', 
        [decoded.userId]
    );

    if (rows.length === 0) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }
}
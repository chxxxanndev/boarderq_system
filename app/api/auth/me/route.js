// app/api/auth/me/route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    if (!token) return NextResponse.json({ error: "No token" }, { status: 401 });

    const decoded = verify(token, process.env.JWT_SECRET);
    
    // We join with room_tenants to get the move_out_date for the new feature
    const [rows] = await pool.query(`
      SELECT u.id, u.name, u.email, u.role, u.status, 
             r.name as room_name, r.monthly_rate, rt.move_out_date
      FROM users u
      LEFT JOIN room_tenants rt ON u.id = rt.user_id
      LEFT JOIN rooms r ON rt.room_id = r.id
      WHERE u.id = ?
    `, [decoded.id]);

    if (rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // THE FIX: Return rows[0] instead of 'user'
    return NextResponse.json(rows[0]);

  } catch (error) {
    console.error("Auth Me Error:", error);
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }
}
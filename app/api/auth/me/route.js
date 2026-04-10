import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) return NextResponse.json({ error: "No token" }, { status: 401 });

    // Verify the token
    const decoded = verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Fetch user details from DB
    const [rows] = await pool.query(
      "SELECT id, name, email, role, status FROM users WHERE id = ?", 
      [userId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = rows[0];

    // FIX: Admins are always active, or check if status is active
    if (user.role !== 'admin' && user.status !== 'active') {
      return NextResponse.json({ error: "Account inactive" }, { status: 403 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Auth Me Error:", error);
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }
}
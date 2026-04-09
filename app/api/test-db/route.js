// app/api/test-db/route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    return NextResponse.json({ message: "Database Connected!", result: rows });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM rooms ORDER BY created_at DESC');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, monthly_rate, amenities } = await request.json();

    if (!name || !monthly_rate) {
      return NextResponse.json({ error: "Missing required unit parameters" }, { status: 400 });
    }

    // Fixed to include amenities and default values for location/capacity/image_url
    const [result] = await pool.query(
      `INSERT INTO rooms (name, monthly_rate, amenities, status) 
       VALUES (?, ?, ?, 'available')`,
      [name, monthly_rate, amenities]
    );

    return NextResponse.json({ 
      message: "Unit initialized successfully", 
      id: result.insertId 
    }, { status: 201 });

  } catch (error) {
    console.error("Creation Error:", error);
    return NextResponse.json({ error: "Failed to initialize unit" }, { status: 500 });
  }
}
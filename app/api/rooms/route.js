// app/api/rooms/route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

// 1. GET ALL ROOMS (Fetching from Navicat to display on your UI)
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM rooms ORDER BY created_at DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 });
  }
}

// 2. CREATE NEW ROOM (Saving from your "Register Unit" Modal to Navicat)
export async function POST(request) {
  try {
    const { name, monthly_rate, location, capacity, image_url } = await request.json();

    // Validating required fields
    if (!name || !monthly_rate) {
      return NextResponse.json({ error: "Missing required unit parameters" }, { status: 400 });
    }

    const [result] = await pool.query(
      `INSERT INTO rooms (name, monthly_rate, location, capacity, image_url, status) 
       VALUES (?, ?, ?, ?, ?, 'available')`,
      [name, monthly_rate, location, capacity, image_url]
    );

    return NextResponse.json({ 
      message: "Unit initialized successfully", 
      id: result.insertId 
    }, { status: 201 });

  } catch (error) {
    console.error("Creation Error:", error);
    return NextResponse.json({ error: "Failed to initialize unit node" }, { status: 500 });
  }
}
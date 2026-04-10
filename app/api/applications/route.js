import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { room_id, applicant_name, applicant_email, applicant_phone, message } = await request.json();

    // Basic validation
    if (!room_id || !applicant_name || !applicant_email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [result] = await pool.query(
      `INSERT INTO applications (room_id, applicant_name, applicant_email, applicant_phone, message, status) 
       VALUES (?, ?, ?, ?, ?, 'pending')`,
      [room_id, applicant_name, applicant_email, applicant_phone, message]
    );

    return NextResponse.json({ message: "Application submitted", id: result.insertId }, { status: 201 });
  } catch (error) {
    console.error("Application Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
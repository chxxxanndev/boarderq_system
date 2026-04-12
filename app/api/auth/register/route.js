// app/api/auth/register/route.js
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // 1. Check if email is already taken
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return NextResponse.json({ error: "Identity already exists in the system." }, { status: 400 });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Insert as 'tenant' with 'pending' status
    await pool.query(
      'INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, 'tenant', 'pending']
    );

    return NextResponse.json({ message: "Profile initialized. Waiting for Admin approval." }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "System initialization failure." }, { status: 500 });
  }
}
// app/api/auth/login/route.js
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    console.log("--- Login Attempt ---");
    console.log("Email entered:", email);

    // 1. Fetch user
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (rows.length === 0) {
      console.log("Result: Email NOT found in database.");
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const user = rows[0];
    console.log("User found in DB:", user.email);
    console.log("Role in DB:", user.role);
    console.log("Hashed Password in DB:", user.password);

    // ... existing user lookup code ...
    // NEW: Check if account is approved
    if (user.role === 'tenant' && user.status !== 'active') {
    return NextResponse.json({ 
        error: "Access Restricted: Your profile is awaiting final admin approval." 
    }, { status: 403 });
    }

// ... existing password comparison code ...

    // 2. Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password comparison result:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Result: Password does not match hash.");
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Inside your Login API POST function
    const token = jwt.sign(
      { 
        id: user.id,      // <--- THIS IS THE KEY PART
        email: user.email, 
        role: user.role 
      }, 
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    console.log("Result: LOGIN SUCCESS!");
    return NextResponse.json({
      token,
      user: { id: user.id, name: user.name, role: user.role, email: user.email }
    });

  } catch (error) {
    console.error('CRITICAL ERROR:', error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
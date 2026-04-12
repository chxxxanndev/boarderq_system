// app/api/auth/hash/route.js
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function GET() {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash('admin123', salt);
  return NextResponse.json({ 
    password: 'admin123',
    new_hash: hash 
  });
}
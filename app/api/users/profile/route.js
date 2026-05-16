//\api\users\profile\route.js
import { NextResponse } from 'next/server';
import pool from '@/lib/db'; 
import bcrypt from 'bcryptjs';
import { getCurrentUser } from '@/lib/auth';

export async function PUT(req) {
  try {
    const user = getCurrentUser(req); 

    if (!user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, email, currentPassword, newPassword } = await req.json();

    const [existing] = await pool.query(
      'SELECT id FROM users WHERE email = ? AND id != ?', 
      [email, user.id]
    );

    if (existing.length > 0) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    if (newPassword && newPassword.trim() !== "") {
      const [rows] = await pool.query('SELECT password FROM users WHERE id = ?', [user.id]);
      
      const isMatch = await bcrypt.compare(currentPassword, rows[0].password);
      if (!isMatch) {
        return NextResponse.json({ error: 'Current password incorrect' }, { status: 400 });
      }

      const hashedPass = await bcrypt.hash(newPassword, 10);
      await pool.query(
        'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
        [name, email, hashedPass, user.id]
      );
    } else {
      await pool.query(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [name, email, user.id]
      );
    }

    const [updated] = await pool.query('SELECT avatar_url FROM users WHERE id = ?', [user.id]);
    return NextResponse.json({ 
      user: { id: user.id, name, email, role: user.role, avatar_url: updated[0]?.avatar_url || null }
    });

  } catch (err) {
    console.error("Profile Update Error:", err);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
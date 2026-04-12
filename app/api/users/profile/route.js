import { NextResponse } from 'next/server';
import pool from '@/lib/db'; // Using 'pool' to match your db.js
import bcrypt from 'bcryptjs';
import { getCurrentUser } from '@/lib/auth'; // Name matched!

export async function PUT(req) {
  try {
    // 1. Get the current user using the function in lib/auth.js
    const user = getCurrentUser(req); 

    if (!user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, email, currentPassword, newPassword } = await req.json();

    // 2. Check if the email is taken by someone else
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE email = ? AND id != ?', 
      [email, user.id]
    );

    if (existing.length > 0) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    // 3. Logic for Password update
    if (newPassword && newPassword.trim() !== "") {
      // Get the hashed password from DB to verify current user
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
      // Update just Name and Email
      await pool.query(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [name, email, user.id]
      );
    }

    // 4. Return the updated info to sync the Frontend
    return NextResponse.json({ 
      user: { id: user.id, name, email, role: user.role } 
    });

  } catch (err) {
    console.error("Profile Update Error:", err);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
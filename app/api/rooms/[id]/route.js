// app/api/rooms/[id]/route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    // FIX: Await params for Next.js 15
    const { id } = await params;
    const body = await request.json();
    
    if (Object.keys(body).length === 1 && body.status) {
      await pool.query('UPDATE rooms SET status = ? WHERE id = ?', [body.status, id]);
    } else {
      const { name, monthly_rate, location, capacity, image_url } = body;
      await pool.query(
        `UPDATE rooms SET name=?, monthly_rate=?, location=?, capacity=?, image_url=? WHERE id=?`,
        [name, monthly_rate, location, capacity, image_url, id]
      );
    }
    return NextResponse.json({ message: "Update successful" });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    // FIX: Await params for Next.js 15
    const { id } = await params;
    await pool.query('DELETE FROM rooms WHERE id = ?', [id]);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
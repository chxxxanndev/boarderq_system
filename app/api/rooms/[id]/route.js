import pool from '@/lib/db';
import { NextResponse } from 'next/server';

/**
 * GET /api/rooms/[id]
 * Fetch single room details
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const [rows] = await pool.query('SELECT * FROM rooms WHERE id = ?', [id]);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("GET /rooms/[id] error:", error);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

/**
 * PUT /api/rooms/[id]
 * Update room details or status
 */
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    if (Object.keys(body).length === 1 && body.status) {
      await pool.query('UPDATE rooms SET status = ? WHERE id = ?', [body.status, id]);
    } else {
      const { name, monthly_rate, location, capacity, image_url, amenities, house_rules } = body;
      await pool.query(
        `UPDATE rooms SET name=?, monthly_rate=?, location=?, capacity=?, image_url=?, amenities=?, house_rules=? WHERE id=?`,
        [name, monthly_rate, location, capacity, image_url, amenities, house_rules, id]
      );
    }
    return NextResponse.json({ message: "Update successful" });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

/**
 * DELETE /api/rooms/[id]
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await pool.query('DELETE FROM rooms WHERE id = ?', [id]);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
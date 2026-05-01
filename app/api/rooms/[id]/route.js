// app/api/room/[id]/route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    // We join with room_tenants to see how many people are actually inside
    const query = `
      SELECT 
        r.*, 
        (SELECT COUNT(*) FROM room_tenants WHERE room_id = r.id) AS current_occupants
      FROM rooms r 
      WHERE r.id = ?
    `;
    
    const [rows] = await pool.query(query, [id]);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    const room = rows[0];
    
    // Ensure capacity is treated as a number for math
    const capacityNum = parseInt(room.capacity) || 1;
    const occupantsNum = parseInt(room.current_occupants) || 0;

    // Add calculated fields for the frontend
    room.slots_left = capacityNum - occupantsNum;
    room.is_full = occupantsNum >= capacityNum;

    return NextResponse.json(room);
  } catch (error) {
    console.error("GET /rooms/[id] error:", error);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, monthly_rate, location, capacity, image_url, amenities, house_rules, status } = body;
    
    await pool.query(
      `UPDATE rooms SET name=?, monthly_rate=?, location=?, capacity=?, image_url=?, amenities=?, house_rules=?, status=? WHERE id=?`,
      [name, monthly_rate, location, capacity, image_url, amenities, house_rules, status || 'available', id]
    );
    return NextResponse.json({ message: "Update successful" });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await pool.query('DELETE FROM rooms WHERE id = ?', [id]);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
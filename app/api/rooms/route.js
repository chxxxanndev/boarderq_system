// app/api/room/route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

/**
 * GET /api/rooms
 * Returns rooms with computed occupancy data
 */
export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        r.*,
        COUNT(rt.id) AS current_tenants
      FROM rooms r
      LEFT JOIN room_tenants rt ON r.id = rt.room_id
      GROUP BY r.id
      ORDER BY r.created_at DESC
    `);

    // compute status dynamically
    const formatted = rows.map(room => {
      const capacity = Number(room.capacity || 0);
      const current = Number(room.current_tenants || 0);

      let computedStatus = room.status;

      if (room.status !== 'maintenance') {
        if (current >= capacity && capacity > 0) {
          computedStatus = 'full';
        } else {
          computedStatus = 'available';
        }
      }

      return {
        ...room,
        capacity,
        current_tenants: current,
        computed_status: computedStatus,
        is_full: current >= capacity
      };
    });

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("GET /rooms error:", error);
    return NextResponse.json(
      { error: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/rooms
 * Create new room (bedspace aware)
 */
export async function POST(request) {
  try {
    const {
      name,
      monthly_rate,
      location,
      capacity,
      image_url,
      amenities
    } = await request.json();

    if (!name || !monthly_rate || !capacity) {
      return NextResponse.json(
        { error: "Missing required fields (name, rate, capacity)" },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO rooms 
        (name, monthly_rate, location, capacity, image_url, amenities, status) 
       VALUES (?, ?, ?, ?, ?, ?, 'available')`,
      [
        name,
        monthly_rate,
        location || null,
        Number(capacity),
        image_url || null,
        amenities || ''
      ]
    );

    return NextResponse.json(
      {
        message: "Room created successfully",
        id: result.insertId
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("POST /rooms error:", error);
    return NextResponse.json(
      { error: "Failed to create room" },
      { status: 500 }
    );
  }
}
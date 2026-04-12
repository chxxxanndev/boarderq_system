// app/api/rooms/[id]/route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

// UPDATE ROOM (Modify or Toggle Status)
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // We dynamically build the query based on provided fields
    const fields = [];
    const values = [];
    
    for (const [key, value] of Object.entries(body)) {
      if (key !== 'id' && key !== 'created_at') {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }
    
    if (fields.length === 0) return NextResponse.json({ error: "No fields to update" }, { status: 400 });

    values.push(id);
    const query = `UPDATE rooms SET ${fields.join(', ')} WHERE id = ?`;
    
    await pool.query(query, values);
    return NextResponse.json({ message: "Updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE/ARCHIVE ROOM
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await pool.query('DELETE FROM rooms WHERE id = ?', [id]);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req) {
  const user = getCurrentUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    if (user.role === 'admin') {
      const [rows] = await db.execute(`
        SELECT mr.*, u.name as tenant_name, r.name as room_name 
        FROM maintenance_requests mr
        JOIN users u ON mr.tenant_id = u.id
        JOIN rooms r ON mr.room_id = r.id
        ORDER BY mr.created_at DESC
      `);
      return NextResponse.json(rows);
    } else {
      const [rows] = await db.execute(`
        SELECT mr.*, r.name as room_name 
        FROM maintenance_requests mr
        JOIN rooms r ON mr.room_id = r.id
        WHERE mr.tenant_id = ?
        ORDER BY mr.created_at DESC
      `, [user.id]);
      return NextResponse.json(rows);
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const user = getCurrentUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { title, description } = await req.json();

    const [tenancy] = await db.execute(
      'SELECT room_id FROM room_tenants WHERE user_id = ? LIMIT 1',
      [user.id]
    );

    if (tenancy.length === 0) {
      return NextResponse.json({ error: "No room assigned to this user" }, { status: 400 });
    }

    const roomId = tenancy[0].room_id;

    const [result] = await db.execute(
      'INSERT INTO maintenance_requests (tenant_id, room_id, title, description, status) VALUES (?, ?, ?, ?, ?)',
      [user.id, roomId, title, description, 'pending']
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  const user = getCurrentUser(req);
  
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
  }

  try {
    const { id, status } = await req.json();
    const validStatuses = ['pending', 'received', 'in_progress', 'resolved'];
    
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    await db.execute(
      'UPDATE maintenance_requests SET status = ? WHERE id = ?', 
      [status, id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
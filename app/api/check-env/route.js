// app/api/check-env/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    database_name: process.env.DB_NAME,
    message: "If you see 'boarder_q' above, your .env is working!"
  });
}
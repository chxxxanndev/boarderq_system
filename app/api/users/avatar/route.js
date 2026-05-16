import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const user = getCurrentUser(req);
    if (!user || !user.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const data = await req.formData();
    const file = data.get('file');
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'boarderq_avatars', resource_type: 'image', transformation: [{ width: 200, height: 200, crop: 'fill', gravity: 'face' }] },
        (error, result) => error ? reject(error) : resolve(result)
      ).end(buffer);
    });

    await pool.query('UPDATE users SET avatar_url = ? WHERE id = ?', [result.secure_url, user.id]);

    return NextResponse.json({ avatar_url: result.secure_url });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
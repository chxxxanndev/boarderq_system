// app/api/rooms/upload/route.js
import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename to prevent overwriting
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    
    // Define the path to the public/uploads folder
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    
    // Ensure the directory exists
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      // Directory already exists
    }

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    // Return the URL that the browser can access
    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
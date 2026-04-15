// app/api/rooms/upload/route.js
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

// 1. Configure Cloudinary using your Environment Variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 2. Convert the file into a Buffer for Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Use Cloudinary's "Upload Stream" to send the image to the cloud
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          folder: 'boarderq_uploads', // This creates a folder in your Cloudinary
          resource_type: 'auto' 
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      
      // Write the file buffer to the stream
      uploadStream.end(buffer);
    });

    // 4. Return the permanent HTTPS URL provided by Cloudinary
    console.log("Cloudinary Upload Success:", result.secure_url);
    return NextResponse.json({ url: result.secure_url });

  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return NextResponse.json({ 
      error: "Upload failed", 
      details: error.message 
    }, { status: 500 });
  }
}
import { mockApplications } from '@/lib/db';

export async function GET() {
  return Response.json(mockApplications);
}

export async function POST(request) {
  const data = await request.json();
  return Response.json({ message: 'Application submitted successfully', data });
}

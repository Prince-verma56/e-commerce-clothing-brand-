import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'GET Payment' });
}

export async function POST() {
  return NextResponse.json({ message: 'POST Payment' });
}

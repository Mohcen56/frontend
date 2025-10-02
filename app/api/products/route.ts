import { NextResponse } from 'next/server';

  // No products available; return an empty array
export async function GET() {
  return NextResponse.json([]);
}


import { NextResponse } from 'next/server';

  // No products available; return an empty array
export async function GET(request: Request) {
  return NextResponse.json([]);
}
// ...existing code...

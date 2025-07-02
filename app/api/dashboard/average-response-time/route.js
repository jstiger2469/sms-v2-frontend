import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${backendUrl}/dashboard/average-response-time`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Error fetching average response time:', err);
    return NextResponse.json(
      { error: 'Error retrieving average response time', details: err?.stack || err?.message || err },
      { status: 500 }
    );
  }
} 
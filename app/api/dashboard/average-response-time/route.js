import { NextResponse } from 'next/server'
import { apiService } from '@/lib/api'

export async function GET() {
  try {
    const data = await apiService.request('/dashboard/average-response-time');
    return NextResponse.json(data);
  } catch (err) {
    console.error('Error fetching average response time:', err);
    return NextResponse.json(
      { error: 'Error retrieving average response time', details: err?.stack || err?.message || err },
      { status: 500 }
    );
  }
} 
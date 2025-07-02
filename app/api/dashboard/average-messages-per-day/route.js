import { NextResponse } from 'next/server'
import { apiService } from '@/lib/api'

export async function GET() {
  try {
    const data = await apiService.request('/dashboard/average-messages-per-day');
    return NextResponse.json(data);
  } catch (err) {
    console.error('Error fetching average messages per day:', err);
    return NextResponse.json(
      { error: 'Error retrieving average messages per day', details: err?.stack || err?.message || err },
      { status: 500 }
    );
  }
} 
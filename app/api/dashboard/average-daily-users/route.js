import { NextResponse } from 'next/server'
import { apiService } from '@/lib/api'

export async function GET() {
  try {
    const data = await apiService.request('/dashboard/average-daily-users');
    return NextResponse.json(data);
  } catch (err) {
    console.error('Error fetching average daily users:', err);
    return NextResponse.json(
      { error: 'Error retrieving average daily users', details: err?.stack || err?.message || err },
      { status: 500 }
    );
  }
} 
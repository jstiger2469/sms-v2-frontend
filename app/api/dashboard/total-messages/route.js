import { NextResponse } from 'next/server'
import { apiService } from '@/lib/api'

export async function GET() {
  try {
    const data = await apiService.request('/dashboard/total-messages');
    return NextResponse.json(data);
  } catch (err) {
    console.error('Error fetching total messages:', err);
    return NextResponse.json(
      { error: 'Error retrieving total messages', details: err?.stack || err?.message || err },
      { status: 500 }
    );
  }
} 
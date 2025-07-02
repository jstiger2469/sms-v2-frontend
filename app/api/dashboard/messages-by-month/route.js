import { NextResponse } from 'next/server'
import { apiService } from '@/lib/api'

export async function GET() {
  try {
    const data = await apiService.request('/dashboard/messages-by-month');
    return NextResponse.json(data);
  } catch (err) {
    console.error('Error fetching messages by month:', err);
    return NextResponse.json(
      { error: 'Error retrieving messages by month', details: err?.stack || err?.message || err },
      { status: 500 }
    );
  }
} 
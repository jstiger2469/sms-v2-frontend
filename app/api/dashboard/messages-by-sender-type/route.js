import { NextResponse } from 'next/server'
import { apiService } from '@/lib/api'

export async function GET() {
  try {
    const data = await apiService.request('/dashboard/messages-by-sender-type');
    return NextResponse.json(data);
  } catch (err) {
    console.error('Error fetching messages by sender type:', err);
    return NextResponse.json(
      { error: 'Error retrieving messages by sender type', details: err?.stack || err?.message || err },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server'
import { apiService } from '@/lib/api'

export async function GET() {
  try {
    const data = await apiService.request('/dashboard/response-rate-by-sender-type');
    return NextResponse.json(data);
  } catch (err) {
    console.error('Error fetching response rate by sender type:', err);
    return NextResponse.json(
      { error: 'Error retrieving response rate by sender type', details: err?.stack || err?.message || err },
      { status: 500 }
    );
  }
} 
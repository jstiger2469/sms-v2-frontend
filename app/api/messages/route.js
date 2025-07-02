import { NextResponse } from 'next/server'
import { apiService } from '@/lib/api'

// GET all messages
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const data = await apiService.request(`/messages/messages?page=${page}&limit=${limit}`);
    return NextResponse.json(data);
  } catch (err) {
    console.error('Error fetching messages in API route:', err);
    return NextResponse.json(
      { error: 'Error retrieving messages', details: err?.stack || err?.message || err },
      { status: 500 }
    );
  }
}

// POST send admin SMS (if needed, use apiService or remove if not implemented)
export async function POST(request) {
  try {
    const { to, messageBody } = await request.json()
    const result = await apiService.sendAdminSMS(to, messageBody)
    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error('Error in admin SMS route:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send SMS' },
      { status: 500 }
    )
  }
} 
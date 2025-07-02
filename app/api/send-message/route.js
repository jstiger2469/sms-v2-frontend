import { NextResponse } from 'next/server'
import { apiService } from '@/lib/api'

export async function POST(req) {
  try {
    const body = await req.json()
    const data = await apiService.request('/admin/send-message', {
      method: 'POST',
      body: JSON.stringify(body),
    })
    return NextResponse.json(data)
  } catch (err) {
    console.error('Error sending message:', err)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
} 
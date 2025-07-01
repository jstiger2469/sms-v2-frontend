import { NextResponse } from 'next/server'
import { apiService } from '@/lib/api'

// POST send SMS
export async function POST(request) {
  try {
    const { to, messageBody } = await request.json()
    const result = await apiService.sendAdminSMS(to, messageBody)
    return NextResponse.json(result)
  } catch (err) {
    console.error('Error sending SMS:', err)
    return NextResponse.json(
      { error: 'Error sending SMS' },
      { status: 500 }
    )
  }
} 
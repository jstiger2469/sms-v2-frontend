import { NextResponse } from 'next/server'
import { apiService } from '@/lib/api'

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const { phone } = await request.json()
    const digits = String(phone || '').replace(/\D/g, '')
    const result = await apiService.updateMentorPhone(id, digits)
    return NextResponse.json(result)
  } catch (err) {
    console.error('Error updating mentor phone:', err)
    return NextResponse.json(
      { error: 'Failed to update mentor phone' },
      { status: 500 }
    )
  }
}



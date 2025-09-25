import { NextResponse } from 'next/server'
import { apiService } from '@/lib/api'

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const { phone } = await request.json()
    const digits = String(phone || '').replace(/\D/g, '')
    const result = await apiService.updateStudentPhone(id, digits)
    return NextResponse.json(result)
  } catch (err) {
    console.error('Error updating student phone:', err)
    return NextResponse.json(
      { error: 'Failed to update student phone' },
      { status: 500 }
    )
  }
}



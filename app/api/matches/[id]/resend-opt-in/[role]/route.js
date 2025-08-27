import { NextResponse } from 'next/server'
import { apiService } from '@/lib/api'

export async function POST(request, { params }) {
  const { id, role } = params
  try {
    await apiService.request(`/matches/resend-opt-in/${id}/${role}`, {
      method: 'POST'
    })
    return NextResponse.json({ message: 'Resend initiated' }, { status: 200 })
  } catch (err) {
    console.error('Error resending opt-in:', err)
    return NextResponse.json({ error: 'Failed to resend' }, { status: 500 })
  }
}

export async function OPTIONS() {
  // Explicitly handle preflight requests
  return NextResponse.json(null, { status: 204 })
}



import { NextResponse } from 'next/server'
import { apiService } from '@/lib/api'

export async function POST(req) {
  try {
    const { auth0id } = await req.json()
    const data = await apiService.request(`/admin/admin-by-auth0id/${auth0id}`)
    return NextResponse.json(data)
  } catch (err) {
    console.error('Error fetching admin by auth0id:', err)
    return NextResponse.json(
      { error: 'Admin not found' },
      { status: 404 }
    )
  }
} 
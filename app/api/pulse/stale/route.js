import { NextResponse } from 'next/server'
import { apiService } from '@/lib/api'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const days = searchParams.get('days') || 7

  try {
    const data = await apiService.getPulseStale(days)
    return NextResponse.json(data)
  } catch (err) {
    console.error('Error proxying pulse stale:', err)
    return NextResponse.json({ error: 'Failed to fetch pulse data' }, { status: 500 })
  }
}


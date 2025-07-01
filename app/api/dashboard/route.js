import { NextResponse } from 'next/server'
import { apiService } from '@/lib/api'

// GET dashboard statistics
export async function GET() {
  try {
    const dashboardData = await apiService.getDashboardStats()
    
    return NextResponse.json(dashboardData)
  } catch (err) {
    console.error('Error fetching dashboard data:', err)
    return NextResponse.json(
      { error: 'Error retrieving dashboard data' },
      { status: 500 }
    )
  }
} 
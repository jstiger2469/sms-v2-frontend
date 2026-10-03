import { NextResponse } from 'next/server'
import { apiService } from '@/lib/api'

// GET all matches
export async function GET() {
  try {
    const matches = await apiService.getMatches()
    return NextResponse.json(matches)
  } catch (err) {
    console.error('Error fetching matches:', err)
    return NextResponse.json(
      { error: 'Error retrieving matches' },
      { status: 500 }
    )
  }
}

// POST create a new match
export async function POST(request) {
  try {
    const { studentData, mentorData } = await request.json()
    const result = await apiService.createMatch(studentData, mentorData)
    return NextResponse.json(result, { status: 201 })
  } catch (err) {
    console.error('Error creating match:', err)
    // Pass the backend's reason through (e.g. duplicate phone) instead of a generic error
    return NextResponse.json(
      { error: err.serverMessage || 'Error creating match' },
      { status: err.status || 500 }
    )
  }
} 
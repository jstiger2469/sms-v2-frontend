import { NextResponse } from 'next/server'
import { apiService } from '@/lib/api'

export async function GET() {
  try {
    const mentors = await apiService.getMentors();
    return NextResponse.json(mentors);
  } catch (err) {
    console.error('Error fetching mentors:', err);
    return NextResponse.json(
      { error: 'Error retrieving mentors' },
      { status: 500 }
    );
  }
} 
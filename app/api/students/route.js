import { NextResponse } from 'next/server'
import { apiService } from '@/lib/api'

export async function GET() {
  try {
    const students = await apiService.getStudents();
    return NextResponse.json(students);
  } catch (err) {
    console.error('Error fetching students:', err);
    return NextResponse.json(
      { error: 'Error retrieving students' },
      { status: 500 }
    );
  }
} 
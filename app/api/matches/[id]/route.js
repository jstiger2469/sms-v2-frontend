import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Match from '@/models/Match'
import Student from '@/models/Student'
import Mentor from '@/models/Mentor'

// GET match by ID
export async function GET(request, { params }) {
  try {
    await dbConnect()
    const { id } = params
    
    const match = await Match.findById(id)
      .populate('student')
      .populate('mentor')
      .populate('messages')
    
    if (!match) {
      return NextResponse.json(
        { error: 'Match not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(match)
  } catch (err) {
    console.error('Error fetching match:', err)
    return NextResponse.json(
      { error: 'Server error retrieving match' },
      { status: 500 }
    )
  }
}

// DELETE match by ID
export async function DELETE(request, { params }) {
  try {
    await dbConnect()
    const { id } = params
    
    const match = await Match.findById(id)
    
    if (!match) {
      return NextResponse.json(
        { message: 'Match not found' },
        { status: 404 }
      )
    }
    
    // Delete the corresponding student and mentor
    await Student.findByIdAndDelete(match.student)
    await Mentor.findByIdAndDelete(match.mentor)
    
    // Delete the match
    await Match.findByIdAndDelete(id)
    
    return NextResponse.json(
      { message: 'Match, student, and mentor deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting match and related data:', error)
    return NextResponse.json(
      { message: 'Failed to delete match and related data' },
      { status: 500 }
    )
  }
} 
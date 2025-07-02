import { NextResponse } from 'next/server'
import { apiService } from '@/lib/api'

export async function POST(req) {
  try {
    const { auth0id } = await req.json()
    
    // First, try to get existing admin
    try {
      const data = await apiService.request(`/admin/admin-by-auth0id/${auth0id}`)
      return NextResponse.json(data)
    } catch (err) {
      // If admin not found, create a new one
      console.log('Admin not found, creating new admin for:', auth0id)
      
      const newAdmin = {
        auth0Id: auth0id,
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
      }
      
      const createdAdmin = await apiService.request('/admin/create-user', {
        method: 'POST',
        body: JSON.stringify(newAdmin)
      })
      
      console.log('Created new admin:', createdAdmin)
      return NextResponse.json(createdAdmin)
    }
  } catch (err) {
    console.error('Error in get-admin-id route:', err)
    return NextResponse.json(
      { error: 'Failed to get or create admin' },
      { status: 500 }
    )
  }
} 
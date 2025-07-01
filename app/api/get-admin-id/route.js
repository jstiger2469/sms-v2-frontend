import { NextResponse } from 'next/server'

export async function POST(req) {
  const { auth0id } = await req.json()
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
  const res = await fetch(`${backendUrl}/admin/admin-by-auth0id/${auth0id}`)
  const data = await res.json()
  if (!res.ok) {
    return NextResponse.json({ error: data.error || 'Not found' }, { status: res.status })
  }
  return NextResponse.json(data)
} 
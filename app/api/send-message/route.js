import { NextResponse } from 'next/server'

export async function POST(req) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
  const body = await req.json()
  const res = await fetch(`${backendUrl}/admin/send-message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) {
    return NextResponse.json({ error: data.error || 'Failed to send message' }, { status: res.status })
  }
  return NextResponse.json(data)
} 
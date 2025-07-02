import { NextResponse } from 'next/server'

export async function POST(req) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://sms-v2-backend-production.up.railway.app'
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
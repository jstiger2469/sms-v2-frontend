import { NextResponse } from 'next/server'

// GET all users
export async function GET() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${backendUrl}/admin/users`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const users = await res.json();
    return NextResponse.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    return NextResponse.json(
      { error: 'Error retrieving users', details: err?.stack || err?.message || err },
      { status: 500 }
    );
  }
}

// POST create user
export async function POST(req) {
  try {
    const body = await req.json();
    const data = await apiService.request('/admin/create-user', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return NextResponse.json(data);
  } catch (err) {
    console.error('Error creating user:', err);
    return NextResponse.json(
      { error: 'Error creating user', details: err.message },
      { status: 500 }
    );
  }
}

// DELETE user
export async function DELETE(req) {
  try {
    const { userId } = await req.json();
    if (!userId) throw new Error('userId is required');
    const data = await apiService.request(`/admin/delete-user/${userId}`, {
      method: 'DELETE',
    });
    return NextResponse.json(data);
  } catch (err) {
    console.error('Error deleting user:', err);
    return NextResponse.json(
      { error: 'Error deleting user', details: err.message },
      { status: 500 }
    );
  }
} 
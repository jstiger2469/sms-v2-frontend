'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import SendMessage from '@/components/SendMessage'
import Navigation from '@/components/Navigation'

export default function SendMessagePage() {
  const { user, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col">
        <Navigation />
        <div className="flex flex-1 items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg px-10 py-12 flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-6"></div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Loading Send Message</h2>
            <p className="text-gray-500 text-base">Please wait while we fetch your data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <>
      <Navigation />
      <SendMessage />
    </>
  )
} 
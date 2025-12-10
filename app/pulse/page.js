'use client'

import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import Link from 'next/link'

export default function PulseDashboard() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/pulse/stale?days=7')
        if (!res.ok) throw new Error('Failed to load pulse data')
        const json = await res.json()
        setData(json)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto py-12 px-4 text-center">
          <div className="animate-pulse text-xl text-gray-500">Checking vital signs...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="bg-red-50 p-4 rounded text-red-700">Error: {error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Network Pulse <span className="text-sm font-normal text-gray-500 ml-2">(AI Copilot)</span>
            </h1>
            <div className="text-sm text-gray-500">
              Threshold: {data.thresholdDays} days inactive
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">At-Risk Matches</dt>
                <dd className="mt-1 text-3xl font-semibold text-red-600">{data.count}</dd>
              </div>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Stale Matches needing intervention</h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {data.matches.map((match) => (
                <li key={match._id}>
                  <Link href={`/matches?search=${match.mentor?.firstName}`} className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {match.mentor?.firstName} & {match.student?.firstName}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            (match.healthScore || 100) < 50 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            Health: {match.healthScore || 100}%
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            Last active: {match.lastMessageAt ? new Date(match.lastMessageAt).toLocaleDateString() : 'Never'}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>
                             {(match.lastMessageAt 
                               ? Math.floor((new Date() - new Date(match.lastMessageAt)) / (1000 * 60 * 60 * 24)) 
                               : '∞')} days silent
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
              {data.matches.length === 0 && (
                <li className="px-4 py-8 text-center text-gray-500">
                  All systems nominal. No stale matches detected.
                </li>
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}


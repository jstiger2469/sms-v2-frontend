'use client'

import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Navigation from '@/components/Navigation'
import AddMatchButton from '@/components/AddMatchButton'
import MatchPair from '../components/MatchPair'

export default function Matches() {
  const [matches, setMatches] = useState([])
  const [filteredMatches, setFilteredMatches] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('/api/matches')
        if (!response.ok) {
          throw new Error('Failed to fetch matches')
        }
        const data = await response.json()
        setMatches(data)
        setFilteredMatches(data)
      } catch (err) {
        console.error('Error fetching matches:', err)
        setError('Failed to load matches')
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
    // Expose fetchMatches for refresh after delete
    Matches.fetchMatches = fetchMatches
  }, [])

  // Filter matches based on search query
  useEffect(() => {
    if (matches.length > 0) {
      const searchQueryLower = searchQuery.toLowerCase()
      const filtered = matches.filter(
        (match) =>
          match.mentor?.firstName?.toLowerCase().includes(searchQueryLower) ||
          match.student?.firstName?.toLowerCase().includes(searchQueryLower) ||
          match.mentor?.lastName?.toLowerCase().includes(searchQueryLower) ||
          match.student?.lastName?.toLowerCase().includes(searchQueryLower)
      )
      setFilteredMatches(filtered)
    }
  }, [searchQuery, matches])

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  // Add a handler for match deletion
  const handleMatchDeleted = () => {
    setLoading(true)
    Matches.fetchMatches()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col">
        <Navigation />
        <div className="flex flex-1 items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg px-10 py-12 flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-6"></div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Loading Matches</h2>
            <p className="text-gray-500 text-base">Please wait while we fetch your matches...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header with Search Bar Aligned to the Left of "Matches" */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            {/* Heading */}
            <h4 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">
              Matches
            </h4>

            {/* Flex container for Search Bar and Add Match Button */}
            <div className="flex items-center w-full sm:w-auto space-x-4">
              {/* Search Bar */}
              <div className="relative z-25 w-full sm:w-60">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search by mentor or student name"
                  className="pl-10 pr-4 py-1 text-sm w-full sm:w-60 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              </div>

              {/* Add Match Button */}
              <AddMatchButton />
            </div>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          {/* Matches List */}
          <ul>
            {filteredMatches.map((match) => (
              <li
                key={match._id}
                className="bg-gray-50 rounded-lg shadow-sm overflow-hidden mb-4"
              >
                <MatchPair match={match} onMatchDeleted={handleMatchDeleted} />
              </li>
            ))}
          </ul>

          {filteredMatches.length === 0 && !error && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No matches</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new match.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 
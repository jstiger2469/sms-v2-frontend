'use client'

import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'

const PAGE_SIZE = 20;

export default function Messages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/messages?page=${page}&limit=${PAGE_SIZE}`)
        if (!response.ok) {
          throw new Error('Failed to fetch messages')
        }
        const data = await response.json()
        setMessages(data.messages)
        setTotalCount(data.totalCount)
      } catch (err) {
        console.error('Error fetching messages:', err)
        setError('Failed to load messages')
      } finally {
        setLoading(false)
      }
    }
    fetchMessages()
  }, [page])

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col">
        <Navigation />
        <div className="flex flex-1 items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg px-10 py-12 flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-6"></div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Loading Messages</h2>
            <p className="text-gray-500 text-base">Please wait while we fetch your messages...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 w-full flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Messages</h1>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4 w-full max-w-md mx-auto">
              <div className="flex items-center">
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

          <div className="bg-white shadow overflow-hidden sm:rounded-md w-full max-w-5xl mx-auto">
            <ul className="divide-y divide-gray-200">
              {messages.map((message) => (
                <li key={message._id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      {/* Sender (left) */}
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            message.senderModel === 'Mentor' ? 'bg-blue-300' : 'bg-gray-300'
                          }`}>
                            <span className={`text-sm font-bold flex items-center justify-center w-full h-full ${
                              message.senderModel === 'Mentor' ? 'text-blue-700' : 'text-gray-700'
                            }`}>
                              {message.sender?.firstName?.[0]}{message.sender?.lastName?.[0]}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {message.sender?.firstName} {message.sender?.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{message.senderModel}</div>
                        </div>
                      </div>
                      {/* Recipient (right, avatar at edge) */}
                      <div className="flex items-center flex-row-reverse">
                        <div className="flex-shrink-0">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            message.recipientModel === 'Mentor' ? 'bg-blue-300' : 'bg-gray-300'
                          }`}>
                            <span className={`text-sm font-bold flex items-center justify-center w-full h-full ${
                              message.recipientModel === 'Mentor' ? 'text-blue-700' : 'text-gray-700'
                            }`}>
                              {message.recipient?.firstName?.[0]}{message.recipient?.lastName?.[0]}
                            </span>
                          </div>
                        </div>
                        <div className="mr-4">
                          <div className="text-sm font-medium text-gray-900">
                            {message.recipient?.firstName} {message.recipient?.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{message.recipientModel}</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-sm text-gray-900">{message.content}</p>
                    </div>
                    <div className="mt-2 flex justify-center">
                      <p className="flex items-center text-sm text-gray-500">
                        {new Date(message.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            {/* Modern compact pagination: show at most 5 page numbers, with ellipsis if needed */}
            {(() => {
              const pageButtons = [];
              const maxButtons = 5;
              let start = Math.max(1, page - 2);
              let end = Math.min(totalPages, page + 2);
              if (end - start < maxButtons - 1) {
                if (page <= 3) {
                  end = Math.min(totalPages, start + maxButtons - 1);
                } else if (page >= totalPages - 2) {
                  start = Math.max(1, end - maxButtons + 1);
                }
              }
              if (start > 1) {
                pageButtons.push(
                  <button key={1} onClick={() => setPage(1)} className={`px-3 py-1 rounded ${page === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>1</button>
                );
                if (start > 2) {
                  pageButtons.push(<span key="start-ellipsis" className="px-2 text-gray-400">...</span>);
                }
              }
              for (let p = start; p <= end; p++) {
                if (p === 1 || p === totalPages) continue; // already handled
                pageButtons.push(
                  <button key={p} onClick={() => setPage(p)} className={`px-3 py-1 rounded ${p === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>{p}</button>
                );
              }
              if (end < totalPages) {
                if (end < totalPages - 1) {
                  pageButtons.push(<span key="end-ellipsis" className="px-2 text-gray-400">...</span>);
                }
                pageButtons.push(
                  <button key={totalPages} onClick={() => setPage(totalPages)} className={`px-3 py-1 rounded ${page === totalPages ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>{totalPages}</button>
                );
              }
              return pageButtons;
            })()}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {messages.length === 0 && !error && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No messages</h3>
              <p className="mt-1 text-sm text-gray-500">Messages will appear here when conversations start.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 
'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'

const SendMessage = () => {
  const { user, isLoading } = useUser()
  const [selectedType, setSelectedType] = useState('mentor')
  const [selectedUser, setSelectedUser] = useState(null)
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState(null)
  const [filteredUsers, setFilteredUsers] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [mentors, setMentors] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [senderId, setSenderId] = useState(null)

  // Debug: Log user info
  useEffect(() => {
    if (user) {
      console.log('Current Auth0 user:', user)
      console.log('Auth0 user.sub:', user.sub)
    }
  }, [user])

  // Fetch mentors and students
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const mentorsRes = await fetch('/api/mentors')
        const mentorsData = await mentorsRes.json()
        setMentors(mentorsData)
        const studentsRes = await fetch('/api/students')
        const studentsData = await studentsRes.json()
        setStudents(studentsData)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  // Fetch senderId (admin's MongoDB ObjectId) once user is loaded
  useEffect(() => {
    const fetchSenderId = async () => {
      if (user && user.sub) {
        console.log('Auth0 user.sub being sent to /api/get-admin-id:', user.sub)
        try {
          const res = await fetch('/api/get-admin-id', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ auth0id: user.sub }),
          })
          const data = await res.json()
          console.log('Response from /api/get-admin-id:', data)
          if (res.ok && data._id) {
            setSenderId(data._id)
            console.log('Sender ID set to:', data._id)
          } else {
            console.error('Could not find admin ObjectId for this user.')
            setError('Could not find admin ObjectId for this user.')
          }
        } catch (err) {
          console.error('Error fetching admin ObjectId:', err)
          setError('Error fetching admin ObjectId.')
        }
      }
    }
    fetchSenderId()
  }, [user])

  // Update filteredUsers based on selected type
  useEffect(() => {
    if (selectedType === 'mentor') {
      setFilteredUsers(mentors)
    } else if (selectedType === 'student') {
      setFilteredUsers(students)
    }
  }, [selectedType, mentors, students])

  // Handle Send Message
  const handleSendMessage = async () => {
    console.log('handleSendMessage called with:', {
      selectedUser,
      senderId,
      message,
      selectedType
    })
    
    if (!selectedUser || !selectedUser._id || !senderId) {
      console.error('Missing required fields:', {
        selectedUser: !!selectedUser,
        selectedUserId: selectedUser?._id,
        senderId: !!senderId
      })
      return
    }

    setIsSending(true)
    setError(null)
    setSuccessMessage('')

    try {
      const requestBody = {
        userId: selectedUser._id,
        phone: selectedUser.phone,
        message,
        selectedType,
        sender: senderId,
      }
      console.log('Sending request to /api/send-message:', requestBody)
      
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      const result = await response.json()
      console.log('Response from /api/send-message:', result)

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
      }

      setSuccessMessage('Message sent successfully!')
      alert('Message sent successfully!')
      setSelectedUser(null)
      setMessage('')
    } catch (error) {
      console.error('Error sending message: ', error)
      setError('Error sending message!')
    } finally {
      setIsSending(false)
    }
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col">
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Send Message
        </h2>

        {/* Debug Info */}
        <div className="mb-4 p-3 bg-gray-100 rounded text-sm">
          <p><strong>Debug Info:</strong></p>
          <p>Auth0 User ID: {user?.sub || 'Not loaded'}</p>
          <p>Sender ID: {senderId || 'Not found'}</p>
          <p>Selected User: {selectedUser ? `${selectedUser.firstName} ${selectedUser.lastName}` : 'None'}</p>
        </div>

        {/* Dropdowns Wrapper */}
        <div className="space-y-4">
          {/* User Type Dropdown */}
          <div>
            <label
              htmlFor="userType"
              className="block text-sm font-medium text-gray-600"
            >
              Select User Type
            </label>
            <select
              id="userType"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="mt-2 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="mentor">Mentor</option>
              <option value="student">Student</option>
            </select>
          </div>

          {/* User Selection Dropdown */}
          <div>
            <label
              htmlFor="userSelection"
              className="block text-sm font-medium text-gray-600"
            >
              Select {selectedType}
            </label>
            <select
              id="userSelection"
              value={selectedUser?._id || ''}
              onChange={(e) => {
                const user = filteredUsers?.find(
                  (user) => user._id === e.target.value,
                )
                setSelectedUser(user)
              }}
              className="mt-2 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select {selectedType}</option>
              {filteredUsers?.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Checkbox to Show Selected User */}
        {selectedUser && (
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              checked={true}
              onChange={() => {}}
              className="form-checkbox text-blue-500"
            />
            <span className="ml-2 text-gray-600">
              {selectedUser.firstName} {selectedUser.lastName}
            </span>
          </div>
        )}

        {/* Message Textarea */}
        <div className="mt-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-600"
          >
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            placeholder="Write your message here"
            className="mt-2 w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendMessage}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full"
          disabled={isSending || !selectedUser || !senderId}
        >
          {isSending ? 'Sending...' : 'Send Message'}
        </button>

        {error && <div className="text-red-600 mt-2">{error}</div>}

        {/* Success Message */}
        {successMessage && (
          <div className="text-green-600 mt-2">{successMessage}</div>
        )}
      </div>
    </div>
  )
}

export default SendMessage 
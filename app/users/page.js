'use client'

import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Navigation from '@/components/Navigation'

function AddUserModal({ onClose, onUserCreated }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || data.message || 'Failed to create user')
      onUserCreated()
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg px-10 py-8 flex flex-col items-center w-full max-w-md mx-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Add New User</h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-md"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-md text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create User'}
            </button>
          </div>
        </form>
        {loading && (
          <div className="flex flex-col items-center mt-6">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-6"></div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Creating User...</h2>
            <p className="text-gray-500 text-base">Please wait while we create the user.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/users')
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      setUsers(data)
    } catch (err) {
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleAddUserClick = () => setShowModal(true)
  const handleModalClose = () => setShowModal(false)
  const handleUserCreated = () => fetchUsers()

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    try {
      const res = await fetch('/api/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || data.message || 'Failed to delete user')
      fetchUsers()
      alert('User successfully deleted!')
    } catch (err) {
      alert('Failed to delete user.')
    }
  }

  const handleSearchChange = (event) => setSearchQuery(event.target.value)

  const filteredUsers = users.filter((user) =>
    (user.name || user.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col">
        <Navigation />
        <div className="flex flex-1 items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg px-10 py-12 flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-6"></div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Loading Users</h2>
            <p className="text-gray-500 text-base">Please wait while we fetch your users...</p>
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
          {/* Header and Add User Button */}
          <div className="flex flex-col sm:flex-row justify-between items-center m-6">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">Users</h4>
            <div className="flex items-center w-full sm:w-auto space-x-4">
              <div className="relative w-full sm:w-60">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search by name"
                  className="pl-10 pr-4 py-1 text-sm w-full sm:w-60 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              </div>
              <button
                onClick={handleAddUserClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 w-full sm:w-auto mt-4 sm:mt-0"
              >
                Add New User
              </button>
            </div>
          </div>
          {/* Users Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="min-w-full table-auto text-sm text-left text-gray-500">
              <thead>
                <tr className="text-xs font-semibold text-gray-700 uppercase border-b">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3 hidden sm:table-cell">Last Login</th>
                  <th className="px-6 py-3 hidden sm:table-cell">Total Logins</th>
                  <th className="px-6 py-3 hidden sm:table-cell">Picture</th>
                  <th className="px-6 py-3 hidden sm:table-cell">Verified</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.user_id || user.email} className="hover:bg-gray-100">
                    <td className="px-6 py-4 border-b">{user.name || user.email}</td>
                    <td className="px-6 py-4 border-b">{user.email}</td>
                    <td className="px-6 py-4 border-b hidden sm:table-cell">
                      {user.last_login
                        ? new Date(user.last_login).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                            hour12: true,
                          })
                        : 'No login recorded'}
                    </td>
                    <td className="px-6 py-4 border-b hidden sm:table-cell">{user.logins_count}</td>
                    <td className="px-6 py-4 border-b hidden sm:table-cell">
                      <img src={user.picture} alt="User" className="w-10 h-10 rounded-full" />
                    </td>
                    <td className="px-6 py-4 border-b hidden sm:table-cell">
                      {user.email_verified ? (
                        <span className="text-green-600 text-lg">✔️</span>
                      ) : (
                        <span className="text-red-500 text-lg">❌</span>
                      )}
                    </td>
                    <td className="px-6 py-4 border-b">
                      <button
                        onClick={() => handleDeleteUser(user.user_id)}
                        className="text-red-600 hover:text-red-800 ml-4"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Modal for Adding a New User */}
          {showModal && (
            <AddUserModal onClose={handleModalClose} onUserCreated={handleUserCreated} />
          )}
        </div>
      </div>
    </div>
  )
} 
'use client'

import { useState } from 'react'
import { phoneDigits, isValidPhone, formatPhone } from '@/lib/phone'

function AddMatchModal({ onClose }) {
  const [studentData, setStudentData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  })
  const [mentorData, setMentorData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e, type) => {
    const { name, value } = e.target
    if (type === 'student') {
      setStudentData({ ...studentData, [name]: value })
    } else {
      setMentorData({ ...mentorData, [name]: value })
    }
  }

  const studentPhoneError = studentData.phone && !isValidPhone(studentData.phone) ? 'Enter a 10-digit US phone number.' : '';
  const mentorPhoneError = mentorData.phone && !isValidPhone(mentorData.phone) ? 'Enter a 10-digit US phone number.' : '';

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    if (!isValidPhone(studentData.phone) || !isValidPhone(mentorData.phone)) {
      setError('Both student and mentor need a valid 10-digit US phone number.')
      setLoading(false)
      return
    }
    try {
      // Normalize phone numbers to digits only
      const normalizedStudentData = {
        ...studentData,
        phone: phoneDigits(studentData.phone),
      };
      const normalizedMentorData = {
        ...mentorData,
        phone: phoneDigits(mentorData.phone),
      };
      const data = { studentData: normalizedStudentData, mentorData: normalizedMentorData };
      const response = await fetch('/api/matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create match')
      }

      alert('Match created successfully!')
      onClose()
      // Refresh the page to show the new match
      window.location.reload()
    } catch (err) {
      setError('Failed to create match. Please check the input and try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = isValidPhone(studentData.phone) && isValidPhone(mentorData.phone) && studentData.firstName && studentData.lastName && mentorData.firstName && mentorData.lastName;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" translate="no">
      <div className="bg-white rounded-lg shadow-lg p-6 w-2/3" translate="no">
        <h2 className="text-xl font-bold mb-4" translate="no">Create New Match</h2>

        <div className="grid grid-cols-2 gap-6" translate="no">
          {/* Student Form */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Student Details</h3>
            {['firstName', 'lastName', 'phone'].map((field) => (
              <div className="mb-4" key={field} translate="no">
                <label
                  htmlFor={field}
                  className="block text-sm font-medium mb-2 capitalize"
                  translate="no"
                >
                  {field}
                </label>
                <input
                  type="text"
                  name={field}
                  className="w-full p-2 border rounded-md"
                  value={field === 'phone' ? formatPhone(studentData[field]) : studentData[field]}
                  onChange={(e) => handleInputChange(e, 'student')}
                />
                {field === 'phone' && studentPhoneError && (
                  <span className="text-red-500 text-xs">{studentPhoneError}</span>
                )}
              </div>
            ))}
          </div>

          {/* Mentor Form */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Mentor Details</h3>
            {['firstName', 'lastName', 'phone'].map((field) => (
              <div className="mb-4" key={field} translate="no">
                <label
                  htmlFor={field}
                  className="block text-sm font-medium mb-2 capitalize"
                  translate="no"
                >
                  {field}
                </label>
                <input
                  type="text"
                  name={field}
                  className="w-full p-2 border rounded-md"
                  value={field === 'phone' ? formatPhone(mentorData[field]) : mentorData[field]}
                  onChange={(e) => handleInputChange(e, 'mentor')}
                />
                {field === 'phone' && mentorPhoneError && (
                  <span className="text-red-500 text-xs">{mentorPhoneError}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className={`px-4 py-2 rounded-md text-white ${
              loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={loading || !isFormValid}
          >
            {loading ? 'Creating...' : 'Create Match'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddMatchModal 
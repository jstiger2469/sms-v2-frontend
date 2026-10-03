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
        const body = await response.json().catch(() => ({}))
        throw new Error(body.error || body.message || 'Failed to create match')
      }

      alert('Match created successfully!')
      onClose()
      // Refresh the page to show the new match
      window.location.reload()
    } catch (err) {
      setError(err.message || 'Failed to create match. Please check the input and try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = isValidPhone(studentData.phone) && isValidPhone(mentorData.phone) && studentData.firstName && studentData.lastName && mentorData.firstName && mentorData.lastName;

  const sections = [
    { key: 'mentor', title: 'Mentor', data: mentorData, phoneError: mentorPhoneError },
    { key: 'student', title: 'Student', data: studentData, phoneError: studentPhoneError },
  ]
  const fields = [
    { name: 'firstName', label: 'First name', autoComplete: 'given-name' },
    { name: 'lastName', label: 'Last name', autoComplete: 'family-name' },
    { name: 'phone', label: 'Mobile phone', autoComplete: 'tel', type: 'tel', placeholder: '(555) 123-4567' },
  ]

  return (
    // Explicit colors throughout: globals.css flips text to white in OS dark mode,
    // which made every label invisible on this white panel.
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-gray-900/60 p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-match-title"
      translate="no"
      onKeyDown={(e) => e.key === 'Escape' && !loading && onClose()}
      onClick={(e) => e.target === e.currentTarget && !loading && onClose()}
    >
      <div className="w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white text-gray-900 rounded-t-2xl sm:rounded-2xl shadow-2xl [color-scheme:light]">
        <div className="px-6 pt-6 pb-4 border-b border-gray-200">
          <h2 id="add-match-title" className="text-xl font-semibold text-gray-900">Create new match</h2>
          <p className="mt-1 text-sm text-gray-600">
            Both people will get a welcome text asking them to reply START.
          </p>
        </div>

        <form
          className="px-6 py-5"
          onSubmit={(e) => { e.preventDefault(); if (isFormValid && !loading) handleSubmit() }}
          noValidate
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sections.map(({ key, title, data, phoneError }) => (
              <fieldset key={key} className="space-y-4">
                <legend className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">{title}</legend>
                {fields.map((f) => {
                  const id = `${key}-${f.name}`
                  const isPhone = f.name === 'phone'
                  const fieldError = isPhone ? phoneError : ''
                  return (
                    <div key={id}>
                      <label htmlFor={id} className="block text-sm font-medium text-gray-800 mb-1">
                        {f.label}
                      </label>
                      <input
                        id={id}
                        name={f.name}
                        type={f.type || 'text'}
                        inputMode={isPhone ? 'tel' : undefined}
                        autoComplete={f.autoComplete}
                        placeholder={f.placeholder}
                        value={isPhone ? formatPhone(data[f.name]) : data[f.name]}
                        onChange={(e) => handleInputChange(e, key)}
                        aria-invalid={!!fieldError}
                        aria-describedby={fieldError ? `${id}-error` : undefined}
                        disabled={loading}
                        className={`block w-full rounded-lg border bg-white px-3 py-2.5 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 disabled:bg-gray-50 ${
                          fieldError
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                        }`}
                      />
                      {fieldError && (
                        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">{fieldError}</p>
                      )}
                    </div>
                  )
                })}
              </fieldset>
            ))}
          </div>

          {error && (
            <div role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-full sm:w-auto rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="w-full sm:w-auto rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {loading ? 'Creating…' : 'Create match'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddMatchModal

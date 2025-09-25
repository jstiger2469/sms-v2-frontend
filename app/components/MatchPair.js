import React, { useState } from 'react';
import DeleteMatchButton from './DeleteMatchButton';
import MatchService from '../services/match.service.js';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { apiService } from '@/lib/api';

function MatchPair({ match, onMatchDeleted }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filter, setFilter] = useState('all');
  const [mentorFilter, setMentorFilter] = useState(false);
  const [studentFilter, setStudentFilter] = useState(false);
  const [isNewestFirst, setIsNewestFirst] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mentorPhone, setMentorPhone] = useState(match.mentor?.phone || '');
  const [studentPhone, setStudentPhone] = useState(match.student?.phone || '');
  const [savingMentor, setSavingMentor] = useState(false);
  const [savingStudent, setSavingStudent] = useState(false);
  const [resendingMentor, setResendingMentor] = useState(false);
  const [resendingStudent, setResendingStudent] = useState(false);
  const [mentorResendMsg, setMentorResendMsg] = useState('');
  const [studentResendMsg, setStudentResendMsg] = useState('');
  const [mentorResendStatus, setMentorResendStatus] = useState(null);
  const [studentResendStatus, setStudentResendStatus] = useState(null);

  const toggleMessages = () => setIsExpanded((prev) => !prev);

  const getFilteredMessages = () => {
    const now = new Date();
    let filteredMessages = [...(match.messages || [])];

    // Apply date-based filters
    if (filter === 'week') {
      const oneWeekAgo = new Date(now);
      oneWeekAgo.setDate(now.getDate() - 7);
      filteredMessages = filteredMessages.filter(
        (message) => new Date(message.timestamp) >= oneWeekAgo,
      );
    } else if (filter === 'month') {
      const oneMonthAgo = new Date(now);
      oneMonthAgo.setMonth(now.getMonth() - 1);
      filteredMessages = filteredMessages.filter(
        (message) => new Date(message.timestamp) >= oneMonthAgo,
      );
    } else if (filter === 'threeMonths') {
      const threeMonthsAgo = new Date(now);
      threeMonthsAgo.setMonth(now.getMonth() - 3);
      filteredMessages = filteredMessages.filter(
        (message) => new Date(message.timestamp) >= threeMonthsAgo,
      );
    }

    // Apply sender filters
    if (mentorFilter) {
      filteredMessages = filteredMessages.filter(
        (message) => message.senderModel === 'Mentor',
      );
    }
    if (studentFilter) {
      filteredMessages = filteredMessages.filter(
        (message) => message.senderModel === 'Student',
      );
    }

    // Sort messages based on the isNewestFirst state
    filteredMessages.sort(
      (a, b) =>
        isNewestFirst
          ? new Date(b.timestamp) - new Date(a.timestamp) // Newest first
          : new Date(a.timestamp) - new Date(b.timestamp), // Oldest first
    );

    return filteredMessages;
  };

  const filteredMessages = getFilteredMessages();

  const handleMentorToggle = () => {
    setMentorFilter(!mentorFilter);
    if (!mentorFilter) {
      setStudentFilter(false);
    }
  };

  const handleStudentToggle = () => {
    setStudentFilter(!studentFilter);
    if (!studentFilter) {
      setMentorFilter(false);
    }
  };

  const toggleSortOrder = () => setIsNewestFirst((prev) => !prev);

  const handleDelete = async () => {
    setLoading(true);
    setError('');
    try {
      await MatchService.deleteMatch(match._id);
      if (typeof onMatchDeleted === 'function') {
        onMatchDeleted();
      }
    } catch (err) {
      setError('Failed to delete match. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      {/* Accordion Header */}
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 gap-3"
          onClick={toggleMessages}
          aria-expanded={isExpanded}
        >
          <div className="flex flex-col md:flex-row gap-2">
            <span className="font-bold text-lg">{`${match.mentor?.firstName || 'Unknown'} & ${match.student?.firstName || 'Unknown'}`}</span>
          </div>
          <svg
            className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      {/* Collapsible Body */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-[400px] overflow-y-auto' : 'max-h-0'
        }`}
      >
        <div className="p-5 border border-b-0 border-gray-200">
          {/* Delete Button (only visible when expanded) */}
          <div className="flex justify-end mb-4">
            <DeleteMatchButton matchId={match._id} />
          </div>

          {/* Basic Match Info */}
          <div className="flex flex-col gap-2 mb-4">
            <div className="text-lg font-medium text-gray-700 flex items-center">
              <strong>Mentor: </strong>
              <span className="text-gray-600 ml-1">
                {match.mentor?.firstName} {match.mentor?.lastName}
              </span>
              {match.mentorOptIn ? (
                <FaCheckCircle className="text-green-500 ml-2" title="Mentor opted in" />
              ) : (
                <FaTimesCircle className="text-gray-400 ml-2" title="Mentor not opted in" />
              )}
              <button
                onClick={async () => {
                  try {
                    await apiService.setOptIn(match._id, 'mentor', !match.mentorOptIn);
                    match.mentorOptIn = !match.mentorOptIn;
                  } catch (err) {
                    setError('Failed to toggle mentor opt-in');
                  }
                }}
                className="ml-3 text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-50"
              >
                {match.mentorOptIn ? 'Set Not Opted-In' : 'Set Opted-In'}
              </button>
            </div>
            <div className="text-sm text-gray-700 flex items-center gap-2">
              <label className="font-medium">Phone:</label>
              <input
                type="tel"
                className="border border-gray-300 rounded px-2 py-1 text-gray-700 w-48"
                value={mentorPhone}
                onChange={(e) => setMentorPhone(e.target.value)}
              />
              <button
                onClick={async () => {
                  try {
                    setSavingMentor(true);
                    setError('');
                    await apiService.updateMentorPhone(match.mentor?._id, mentorPhone);
                  } catch (err) {
                    setError('Failed to update mentor phone');
                  } finally {
                    setSavingMentor(false);
                  }
                }}
                disabled={savingMentor || !match.mentor?._id}
                className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                {savingMentor ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={async () => {
                  try {
                    setMentorResendMsg('');
                    setMentorResendStatus(null);
                    setResendingMentor(true);
                    await fetch(`/api/matches/${match._id}/resend-opt-in/mentor`, { method: 'POST' });
                    setMentorResendMsg('Opt-in message sent to mentor.');
                    setMentorResendStatus('success');
                    setTimeout(() => {
                      setMentorResendMsg('');
                      setMentorResendStatus(null);
                    }, 3000);
                  } catch (err) {
                    setMentorResendMsg('Failed to resend to mentor.');
                    setMentorResendStatus('error');
                    setTimeout(() => {
                      setMentorResendMsg('');
                      setMentorResendStatus(null);
                    }, 4000);
                  } finally {
                    setResendingMentor(false);
                  }
                }}
                className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50"
                disabled={resendingMentor}
              >
                {resendingMentor ? 'Resending…' : 'Resend Opt-In'}
              </button>
            </div>
            {mentorResendMsg && (
              <div
                className={`mt-2 text-xs rounded px-2 py-1 border ${
                  mentorResendStatus === 'success'
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-red-50 text-red-700 border-red-200'
                }`}
              >
                {mentorResendMsg}
              </div>
            )}
            <div className="text-lg font-medium text-gray-700 flex items-center">
              <strong>Student: </strong>
              <span className="text-gray-600 ml-1">
                {match.student?.firstName} {match.student?.lastName}
              </span>
              {match.studentOptIn ? (
                <FaCheckCircle className="text-green-500 ml-2" title="Student opted in" />
              ) : (
                <FaTimesCircle className="text-gray-400 ml-2" title="Student not opted in" />
              )}
              <button
                onClick={async () => {
                  try {
                    await apiService.setOptIn(match._id, 'student', !match.studentOptIn);
                    match.studentOptIn = !match.studentOptIn;
                  } catch (err) {
                    setError('Failed to toggle student opt-in');
                  }
                }}
                className="ml-3 text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-50"
              >
                {match.studentOptIn ? 'Set Not Opted-In' : 'Set Opted-In'}
              </button>
            </div>
            <div className="text-sm text-gray-700 flex items-center gap-2">
              <label className="font-medium">Phone:</label>
              <input
                type="tel"
                className="border border-gray-300 rounded px-2 py-1 text-gray-700 w-48"
                value={studentPhone}
                onChange={(e) => setStudentPhone(e.target.value)}
              />
              <button
                onClick={async () => {
                  try {
                    setSavingStudent(true);
                    setError('');
                    await apiService.updateStudentPhone(match.student?._id, studentPhone);
                  } catch (err) {
                    setError('Failed to update student phone');
                  } finally {
                    setSavingStudent(false);
                  }
                }}
                disabled={savingStudent || !match.student?._id}
                className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                {savingStudent ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={async () => {
                  try {
                    setStudentResendMsg('');
                    setStudentResendStatus(null);
                    setResendingStudent(true);
                    const res = await fetch(`/api/matches/${match._id}/resend-opt-in/student`, { method: 'POST' });
                    if (!res.ok) {
                      let msg = 'Failed to resend to student.';
                      try {
                        const data = await res.json();
                        if (data?.error || data?.message) msg = data.error || data.message;
                      } catch {}
                      throw new Error(msg);
                    }
                    setStudentResendMsg('Opt-in message sent to student.');
                    setStudentResendStatus('success');
                    setTimeout(() => {
                      setStudentResendMsg('');
                      setStudentResendStatus(null);
                    }, 3000);
                  } catch (err) {
                    setStudentResendMsg(err?.message || 'Failed to resend to student.');
                    setStudentResendStatus('error');
                    setTimeout(() => {
                      setStudentResendMsg('');
                      setStudentResendStatus(null);
                    }, 4000);
                  } finally {
                    setResendingStudent(false);
                  }
                }}
                className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50"
                disabled={resendingStudent}
              >
                {resendingStudent ? 'Resending…' : 'Resend Opt-In'}
              </button>
            </div>
            {studentResendMsg && (
              <div
                className={`mt-2 text-xs rounded px-2 py-1 border ${
                  studentResendStatus === 'success'
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-red-50 text-red-700 border-red-200'
                }`}
              >
                {studentResendMsg}
              </div>
            )}
          </div>


          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
            <select
              className="block w-full max-w-xs bg-white border border-gray-300 text-gray-700 text-sm rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Messages</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
              <option value="threeMonths">Past 3 Months</option>
            </select>

            <div className="flex gap-4 items-center">
              <label className="flex items-center" htmlFor={`mentor-filter-${match._id}`}> 
                <input
                  id={`mentor-filter-${match._id}`}
                  type="checkbox"
                  checked={mentorFilter}
                  onChange={handleMentorToggle}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Mentor Messages
                </span>
              </label>

              <label className="flex items-center" htmlFor={`student-filter-${match._id}`}> 
                <input
                  id={`student-filter-${match._id}`}
                  type="checkbox"
                  checked={studentFilter}
                  onChange={handleStudentToggle}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Student Messages
                </span>
              </label>
            </div>

            <button
              onClick={toggleSortOrder}
              type="button"
              className="px-4 py-2 bg-gray-200 text-sm rounded-md hover:bg-gray-300"
            >
              {isNewestFirst ? 'Newest First' : 'Oldest First'}
            </button>
          </div>

          <div className="text-sm text-gray-600 mb-4">
            <strong>Total Messages:</strong> {filteredMessages.length}
          </div>

          {/* Messages Table */}
          <table className="min-w-full table-auto text-sm text-left text-gray-500">
            <thead>
              <tr className="text-xs font-semibold text-gray-700 uppercase border-b">
                <th className="px-6 py-3">Sender</th>
                <th className="px-6 py-3">Message</th>
                <th className="px-6 py-3">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <tr key={message._id} className="hover:bg-gray-100">
                    <td className="px-6 py-4">{message.sender?.firstName || 'Unknown'}</td>
                    <td className="px-6 py-4">{message.content}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(message.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    No messages found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MatchPair; 
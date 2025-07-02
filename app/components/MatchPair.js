import React, { useState } from 'react';
import DeleteMatchButton from './DeleteMatchButton';
import MatchService from '../services/match.service.js';

function MatchPair({ match, onMatchDeleted }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filter, setFilter] = useState('all');
  const [mentorFilter, setMentorFilter] = useState(false);
  const [studentFilter, setStudentFilter] = useState(false);
  const [isNewestFirst, setIsNewestFirst] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
            <div className="text-lg font-medium text-gray-700">
              <strong>Mentor: </strong>
              <span className="text-gray-600">
                {match.mentor?.firstName} {match.mentor?.lastName}
              </span>
            </div>
            <div className="text-lg font-medium text-gray-700">
              <strong>Student: </strong>
              <span className="text-gray-600">
                {match.student?.firstName} {match.student?.lastName}
              </span>
            </div>
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
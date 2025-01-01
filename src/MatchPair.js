import React, { useState } from "react";

const MatchPair = ({ match }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filter, setFilter] = useState("all");
  const [mentorFilter, setMentorFilter] = useState(false);
  const [studentFilter, setStudentFilter] = useState(false);
  const [isNewestFirst, setIsNewestFirst] = useState(true); // State to toggle sorting order

  const toggleMessages = () => setIsExpanded((prev) => !prev);

  const getFilteredMessages = () => {
    const now = new Date();
    let filteredMessages = [...match.messages];

    // Apply date-based filters
    if (filter === "week") {
      const oneWeekAgo = new Date(now);
      oneWeekAgo.setDate(now.getDate() - 7);
      filteredMessages = filteredMessages.filter(
        (message) => new Date(message.timestamp) >= oneWeekAgo
      );
    } else if (filter === "month") {
      const oneMonthAgo = new Date(now);
      oneMonthAgo.setMonth(now.getMonth() - 1);
      filteredMessages = filteredMessages.filter(
        (message) => new Date(message.timestamp) >= oneMonthAgo
      );
    } else if (filter === "threeMonths") {
      const threeMonthsAgo = new Date(now);
      threeMonthsAgo.setMonth(now.getMonth() - 3);
      filteredMessages = filteredMessages.filter(
        (message) => new Date(message.timestamp) >= threeMonthsAgo
      );
    }

    // Apply sender filters (mentor or student)
    if (mentorFilter) {
      filteredMessages = filteredMessages.filter(
        (message) => message.senderModel === "Mentor"
      );
    }
    if (studentFilter) {
      filteredMessages = filteredMessages.filter(
        (message) => message.senderModel === "Student"
      );
    }

    // Sort messages based on the isNewestFirst state
    filteredMessages = filteredMessages.sort((a, b) =>
      isNewestFirst
        ? new Date(b.timestamp) - new Date(a.timestamp) // Newest first
        : new Date(a.timestamp) - new Date(b.timestamp) // Oldest first
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

  // Toggle sorting between newest to oldest and oldest to newest
  const toggleSortOrder = () => {
    setIsNewestFirst((prev) => !prev);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      {/* Accordion Header */}
      <h2 id="accordion-collapse-heading-1">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
          onClick={toggleMessages}
          aria-expanded={isExpanded}
          aria-controls="accordion-collapse-body-1"
        >
          <span>{filteredMessages.length} Messages</span>
          <div>
            <div>
              <strong>Mentor: </strong>
              {match.mentor.firstName} {match.mentor.lastName}
            </div>
            <div>
              <strong>Student: </strong>
              {match.student.firstName} {match.student.lastName}
            </div>
          </div>
          <svg
            data-accordion-icon
            className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            aria-hidden="true"
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
        id="accordion-collapse-body-1"
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[400px] overflow-y-auto" : "max-h-0"
        }`}
        aria-labelledby="accordion-collapse-heading-1"
      >
        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
          {/* Sticky Filter Dropdown and Checkbox Filters */}
          <div className="mb-4 flex flex-col md:flex-row gap-2 items-center sticky top-0 z-10 bg-white p-4 border-b border-gray-200">
            {/* Filter Dropdown */}
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <select
              id="filter-select"
                className="block w-full max-w-xs bg-white border border-gray-300 text-gray-700 text-sm rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Messages</option>
                <option value="week">Past Week</option>
                <option value="month">Past Month</option>
                <option value="threeMonths">Past 3 Months</option>
              </select>

              <div className="flex gap-4 mt-2 md:mt-0 items-center">
                {/* Mentor Checkbox */}
                <label className="flex items-center text-sm text-gray-700">
                  <input
                    id="mentor-checkbox"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={mentorFilter}
                    onChange={handleMentorToggle}
                  />
                  <span className="ml-2">Mentor Messages</span>
                </label>

                {/* Student Checkbox */}
                <label className="flex items-center text-sm text-gray-700">
                  <input
                    id="student-checkbox"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={studentFilter}
                    onChange={handleStudentToggle}
                  />
                  <span className="ml-2">Student Messages</span>
                </label>
              </div>
            </div>

            {/* Sort Button with Arrows */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Sort by:</span>
              <button
                onClick={toggleSortOrder}
                className="flex items-center px-4 py-2 bg-gray-200 text-sm text-gray-700 rounded-md hover:bg-gray-300"
              >
                {isNewestFirst ? (
                  <>
                    Newest First{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 ml-2 transform rotate-180"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    Oldest First{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Messages */}
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message, index) => (
              <p
                key={index}
                className="mb-2 flex justify-between items-center border-b border-gray-200 pb-2"
              >
                <span className="flex-1">
                  <strong className="text-blue-600">{message.sender?.firstName}:</strong>{" "}
                  {message.content}
                </span>
                <span className="text-sm text-gray-500 ml-4">
                  {new Date(message.timestamp).toLocaleString()}
                </span>
              </p>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No messages found for the selected filter.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchPair;

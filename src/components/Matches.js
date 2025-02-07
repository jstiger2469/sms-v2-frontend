/* eslint-disable react/jsx-filename-extension */

import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FaSearch } from 'react-icons/fa'; // Moved this import above
import MatchDataService from '../services/match.service'; // Importing MatchDataService after react-icons/fa
import MatchPair from './MatchPair'; // Importing MatchPair component
import AddMatchButton from './AddMatchButton'; // Importing AddMatchButton component

function MatchList() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMatches, setFilteredMatches] = useState([]);

  // Attempt to get cached data before making the network request
  const cachedMatches = queryClient.getQueryData(['matches']);

  // If cached data is available, use it directly, else make the API request
  const { data, error, isLoading } = useQuery({
    queryKey: ['matches'],
    queryFn: MatchDataService.getAll,
    refetchOnWindowFocus: false,
    initialData: cachedMatches, // Provide the cached data as initial data
    onSuccess: (fetchedData) => {
      const fetchedMatches = fetchedData.data; // Fetched matches data
      setFilteredMatches(fetchedMatches); // Set filtered matches on first load
    },
  });

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter matches based on search query
  useEffect(() => {
    if (data?.data) {
      const matches = data.data;
      const searchQueryLower = searchQuery.toLowerCase();

      // Filter based on mentor or student name
      const filtered = matches.filter(
        (match) =>
          match.mentor.firstName.toLowerCase().includes(searchQueryLower) ||
          match.student.firstName.toLowerCase().includes(searchQueryLower),
      );
      setFilteredMatches(filtered);
    }
  }, [searchQuery, data]); // Re-run when searchQuery or data changes

  if (isLoading && !cachedMatches) {
    return <div className="text-center text-gray-700">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-600">Error: {error.message}</div>
    );
  }

  return (
    <div>
      {/* Header with Search Bar Aligned to the Left of "Matches" */}
      <div className="flex flex-col sm:flex-row justify-between items-center m-6">
        {/* Heading */}
        <h4 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">
          Matches
        </h4>

        {/* Flex container for Search Bar and Add Match Button */}
        <div className="flex items-center w-full sm:w-auto space-x-4">
          {/* Search Bar */}
          <div className="relative w-full sm:w-60">
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

      {/* Matches List */}
      <ul>
        {filteredMatches?.map((match) => (
          <li
            key={match._id}
            className="bg-gray-50 rounded-lg shadow-sm overflow-hidden"
          >
            <MatchPair match={match}>
              <div className="p-6">
                <div className="flex flex-col gap-2">
                  <div className="text-lg font-medium text-gray-700">
                    <strong>Mentor: </strong>
                    <span className="text-gray-600">
                      {match.mentor.firstName} {match.mentor.lastName}
                    </span>
                  </div>
                  <div className="text-lg font-medium text-gray-700">
                    <strong>Student: </strong>
                    <span className="text-gray-600">
                      {match.student.firstName} {match.student.lastName}
                    </span>
                  </div>
                </div>
              </div>
            </MatchPair>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MatchList;

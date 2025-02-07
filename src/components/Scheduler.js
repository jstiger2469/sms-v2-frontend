import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import MatchDataService from '../services/match.service'; // Import the class-based service
import useMatchStore from '../store/matchStore'; // Import the Zustand store

const ScheduleMeeting = () => {
  const [selectedMatch, setSelectedMatch] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  // Access Zustand store for cached matches and setter
  const [matches, setMatches] = useMatchStore((state) => [
    state.matches,
    state.setMatches,
  ]);

  // Fetch matches using React Query, but use cached data if available
  const { data, isLoading, isError } = useQuery({
    queryKey: ['matches'], // Correct queryKey format for v5
    queryFn: async () => {
      if (matches.length > 0) {
        // If matches are already cached in Zustand, return them directly
        return matches;
      } else {
        // Fetch from the backend using MatchDataService
        const fetchedMatches = await MatchDataService.getAll();
        if (fetchedMatches && fetchedMatches.length > 0) {
          // Only update Zustand if fetched data is non-empty and matches haven't been cached yet
          setMatches(fetchedMatches);
        }
        return fetchedMatches;
      }
    },
    enabled: matches.length === 0, // Prevent re-fetch if data is in Zustand
    onError: (err) => {
      setError('Error fetching matches');
    },
  });

  // Handle modal opening
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Handle modal closing
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle match selection
  const handleMatchSelection = (event) => {
    setSelectedMatch(event.target.value);
  };

  // Handle date selection
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Handle time selection
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  // Handle scheduling the meeting
  const handleSchedule = async () => {
    try {
      await MatchDataService.createMeeting({
        match: selectedMatch,
        date: selectedDate,
        time: selectedTime,
      });
      // After scheduling, close the modal and reset fields
      handleCloseModal();
      setSelectedMatch('');
      setSelectedDate('');
      setSelectedTime('');
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      setError('Error scheduling meeting');
    }
  };

  // Return early while loading or if there's an error
  if (isLoading) return <div>Loading matches...</div>;
  if (isError) return <div>{error}</div>;

  return (
    <div>
      <h1>Schedule a Meeting</h1>

      <button onClick={handleOpenModal}>Schedule New Meeting</button>

      {isModalOpen && (
        <div className="modal">
          <h2>Schedule a New Meeting</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="match">Select Match</label>
              <select
                id="match"
                value={selectedMatch}
                onChange={handleMatchSelection}
              >
                <option value="">Select a match</option>
                {data.map((match) => (
                  <option key={match.id} value={match.id}>
                    {match.mentor.firstName} vs {match.student.firstName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="date">Select Date</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>

            <div>
              <label htmlFor="time">Select Time</label>
              <input
                type="time"
                id="time"
                value={selectedTime}
                onChange={handleTimeChange}
                step="1800" // Step value for 30-minute intervals
              />
            </div>

            <div>
              <button type="button" onClick={handleSchedule}>
                Schedule
              </button>
              <button type="button" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ScheduleMeeting;

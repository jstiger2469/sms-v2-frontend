import React, { useState } from 'react';
import MatchService from '../services/match.service';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const DeleteButton = ({ matchId, onDelete }) => {
  const queryClient = useQueryClient(); // Import queryClient
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this match? This will also delete the associated student and mentor.',
    );

    if (!confirmed) return;

    setLoading(true);
    setError('');

    try {
      await MatchService.deleteMatch(matchId);
      alert('Match, student, and mentor deleted successfully!');
      queryClient.invalidateQueries(['matches']);

      if (typeof onDelete === 'function') {
        // Safeguard check
        onDelete(); // Call the callback
      }
    } catch (err) {
      setError('Failed to delete match. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button
        onClick={handleDelete}
        className={`px-4 py-2 text-white rounded-md ${
          loading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
        }`}
        disabled={loading}
      >
        {loading ? 'Deleting...' : 'Delete Match'}
      </button>
    </div>
  );
};

export default DeleteButton;

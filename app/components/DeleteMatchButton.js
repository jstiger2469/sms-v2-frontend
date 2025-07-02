import React, { useState } from 'react';
import MatchService from '../services/match.service';
import { useQueryClient } from '@tanstack/react-query';

const DeleteButton = ({ matchId, onDelete }) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    setError('');
    try {
      await MatchService.deleteMatch(matchId);
      queryClient.invalidateQueries(['matches']);
      setShowModal(false);
      if (typeof onDelete === 'function') {
        onDelete();
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
        onClick={() => setShowModal(true)}
        className="p-2 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-400"
        title="Delete Match"
      >
        <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
        </svg>
      </button>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 flex flex-col items-center w-full max-w-md mx-4">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Delete Match?</h3>
            <p className="text-gray-600 text-center mb-8">Are you sure you want to delete this match? This will also delete the associated student and mentor. This action cannot be undone.</p>
            <div className="flex flex-col gap-3 w-full md:flex-row md:gap-6 md:justify-center mt-4">
              <button
                onClick={handleDelete}
                className="px-6 py-3 rounded-lg text-white bg-red-600 hover:bg-red-700 font-semibold text-base transition md:w-32 w-full"
                disabled={loading}
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold text-base transition md:w-32 w-full"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
            {loading && (
              <div className="flex flex-col items-center mt-6">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-6"></div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Deleting Match...</h2>
                <p className="text-gray-500 text-base">Please wait while we delete this match.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteButton; 
import React, { useState, useCallback } from 'react';
import AddMatchModal from './AddMatchModal';

const AddMatchButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
      >
        Add New Match
      </button>

      {isModalOpen && <AddMatchModal onClose={handleClose} />}
    </>
  );
};

export default AddMatchButton;

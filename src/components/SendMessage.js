import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import SendMessageService from '../services/sendmessage.service';

const SendMessage = () => {
  const [selectedType, setSelectedType] = useState('mentor'); // Default to mentor
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  // Fetch mentors and students using React Query
  const { data: mentors, isLoading: mentorsLoading } = useQuery({
    queryKey: ['mentors'],
    queryFn: SendMessageService.getMentors,
    refetchOnWindowFocus: false,
  });

  const { data: students, isLoading: studentsLoading } = useQuery({
    queryKey: ['students'],
    queryFn: SendMessageService.getStudents,
    refetchOnWindowFocus: false,
  });

  // Log mentors and students data
  useEffect(() => {
    if (mentors) console.log('Mentors Data:', mentors);
    if (students) console.log('Students Data:', students);
  }, [mentors, students]);

  // Update filteredUsers based on selected type
  useEffect(() => {
    if (selectedType === 'mentor' && mentors) {
      setFilteredUsers(mentors);
    } else if (selectedType === 'student' && students) {
      setFilteredUsers(students);
    }
  }, [selectedType, mentors, students]);

  // Handle Send Message
  const handleSendMessage = async () => {
    if (!selectedUser || !selectedUser._id) return;

    setIsSending(true);
    setError(null);
    setSuccessMessage('');

    try {
      console.log('selectedType', selectedType)
      await SendMessageService.sendMessage(selectedUser._id, selectedUser.phone, message, selectedType);
      setSuccessMessage('Message sent successfully!');
      alert('Message sent successfully!');
      setSelectedUser(null);
      setMessage('');
    } catch (error) {
      console.error('Error sending message: ', error);
      setError('Error sending message!');
    } finally {
      setIsSending(false);
    }
  };

  if (mentorsLoading || studentsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Send Message
        </h2>

        {/* Dropdowns Wrapper */}
        <div className="space-y-4">
          {/* User Type Dropdown */}
          <div>
            <label
              htmlFor="userType"
              className="block text-sm font-medium text-gray-600"
            >
              Select User Type
            </label>
            <select
              id="userType"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="mt-2 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="mentor">Mentor</option>
              <option value="student">Student</option>
            </select>
          </div>

          {/* User Selection Dropdown */}
          <div>
            <label
              htmlFor="userSelection"
              className="block text-sm font-medium text-gray-600"
            >
              Select {selectedType}
            </label>
            <select
              id="userSelection"
              value={selectedUser?._id || ''}
              onChange={(e) => {
                const user = filteredUsers?.find(
                  (user) => user._id === e.target.value,
                );
                setSelectedUser(user);
              }}
              className="mt-2 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select {selectedType}</option>
              {filteredUsers?.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Checkbox to Show Selected User */}
        {selectedUser && (
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              checked={true}
              onChange={() => {}}
              className="form-checkbox text-blue-500"
            />
            <span className="ml-2 text-gray-600">
              {selectedUser.firstName} {selectedUser.lastName}
            </span>
          </div>
        )}

        {/* Message Textarea */}
        <div className="mt-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-600"
          >
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            placeholder="Write your message here"
            className="mt-2 w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendMessage}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full"
          disabled={isSending || !selectedUser}
        >
          {isSending ? 'Sending...' : 'Send Message'}
        </button>

        {error && <div className="text-red-600 mt-2">{error}</div>}

        {/* Success Message */}
        {successMessage && (
          <div className="text-green-600 mt-2">{successMessage}</div>
        )}
      </div>
    </div>
  );
};

export default SendMessage;

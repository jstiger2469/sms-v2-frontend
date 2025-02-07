import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Auth0Service from '../services/auth.service'; // Replace with actual Auth0 API Service

const Modal = ({ onClose, onUserCreated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validatePasswordStrength = (password) => {
    // Example password strength validation
    const passwordStrengthRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordStrengthRegex.test(password);
  };

  const handleCreateUser = async () => {
    setLoading(true);
    setError(null);

    // Validate password strength
    if (!validatePasswordStrength(password)) {
      setError(
        'Password must be at least 8 characters long and include a letter, a number, and a special character.',
      );
      setLoading(false);
      return;
    }

    // Check if passwords match
    if (password !== retypePassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const newUser = await Auth0Service.createUser({ email, password });
      onUserCreated(newUser);
    } catch (err) {
      if (err.message.includes('PasswordStrengthError')) {
        setError('Password is too weak. Please provide a stronger password.');
      } else {
        setError('Error creating user.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create New User</h2>

        {error && <div className="text-red-500">{error}</div>}

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="retypePassword"
          >
            Retype Password
          </label>
          <input
            type="password"
            id="retypePassword"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 text-gray-600">
            Cancel
          </button>
          <button
            onClick={handleCreateUser}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create User'}
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUserCreated: PropTypes.func.isRequired,
};

export default Modal;

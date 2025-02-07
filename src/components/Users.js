import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import DashboardDataService from '../services/dashboard.service'; // Adjust the import path if needed
import Modal from './Modal'; // Assuming you will create a Modal component
import Auth0Service from '../services/auth.service'; // Replace with actual Auth0 API Service

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await DashboardDataService.getUsers();
        setUsers(users.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUserClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleUserCreated = (newUser) => {
    console.log(newUser.data.user.data);
    const finalUser = newUser.data.user.data;
    setUsers((prevUsers) => [...prevUsers, finalUser]);
    setShowModal(false);
    alert('User successfully created!'); // Show success message (optional)
  };

  const handleDeleteUser = async (userId) => {
    try {
      const result = await Auth0Service.deleteUser(userId); // Call the delete service
      alert('User successfully deleted!'); // Show success message (optional)
      setUsers(users.filter((user) => user.user_id !== userId)); // Update state to remove the deleted user
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user.');
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Header and Add User Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center m-6">
        {/* Heading */}
        <h4 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">
          Users
        </h4>

        <div className="flex items-center w-full sm:w-auto space-x-4">
          {/* Search Bar */}
          <div className="relative w-full sm:w-60">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by name"
              className="pl-10 pr-4 py-1 text-sm w-full sm:w-60 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          </div>

          {/* Add New User Button */}
          <button
            onClick={handleAddUserClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 w-full sm:w-auto mt-4 sm:mt-0"
          >
            Add New User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full table-auto text-sm text-left text-gray-500">
          <thead>
            <tr className="text-xs font-semibold text-gray-700 uppercase border-b">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3 hidden sm:table-cell">Last Login</th>
              <th className="px-6 py-3 hidden sm:table-cell">Total Logins</th>
              <th className="px-6 py-3 hidden sm:table-cell">Picture</th>
              <th className="px-6 py-3 hidden sm:table-cell">Verified</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id || user.email} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b">
                  {user.name || user.email}
                </td>
                <td className="px-6 py-4 border-b">{user.email}</td>
                <td className="px-6 py-4 border-b hidden sm:table-cell">
                  {user.last_login
                    ? new Date(user.last_login).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true,
                      })
                    : 'No login recorded'}
                </td>
                <td className="px-6 py-4 border-b hidden sm:table-cell">
                  {user.logins_count}
                </td>
                <td className="px-6 py-4 border-b hidden sm:table-cell">
                  <img
                    src={user.picture}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 border-b hidden sm:table-cell">
                  {user.email_verified ? (
                    <span className="text-green-600 text-lg">✔️</span>
                  ) : (
                    <span className="text-red-500 text-lg">❌</span>
                  )}
                </td>
                <td className="px-6 py-4 border-b">
                  <button
                    onClick={() => handleDeleteUser(user.user_id)}
                    className="text-red-600 hover:text-red-800 ml-4"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding a New User */}
      {showModal && (
        <Modal onClose={handleModalClose} onUserCreated={handleUserCreated} />
      )}
    </div>
  );
};

export default Users;

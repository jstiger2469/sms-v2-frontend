import React, { useState, useEffect } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { io } from 'socket.io-client';
import DashboardDataService from '../services/dashboard.service';
import useNotificationStore from '../store/notificationStore';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    notifications,
    newNotificationCount,
    setNotifications,
    addNotification,
    resetNewNotificationCount,
  } = useNotificationStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Fetch notifications from the API
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await DashboardDataService.getNotifications();
        if (response.status !== 200)
          throw new Error('Failed to fetch notifications');
        const data = response.data;
        setNotifications(data.notifications); // Assuming the API returns an object with a `notifications` array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [setNotifications]);

  // Set up socket connection and listen for new notifications
  useEffect(() => {
    const socket = io('http://localhost:4000'); // Adjust the URL as needed

    socket.on('new-notification', (notification) => {
      // Add the new notification to the store
      addNotification(notification);
    });

    // Cleanup socket listener when component unmounts
    return () => {
      socket.off('new-notification');
    };
  }, [addNotification]);

  // Reset new notification count when the dropdown is opened
  useEffect(() => {
    if (isOpen) {
      resetNewNotificationCount(); // Reset count when dropdown is opened
    }
  }, [isOpen, resetNewNotificationCount]);

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 z-50"      >
        <span className="sr-only">View notifications</span>
        <BellIcon aria-hidden="true" className="h-6 w-6" />
        {(newNotificationCount > 0 || notifications.length > 0) && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
            {newNotificationCount > 0
              ? newNotificationCount
              : notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-2">
            <h3 className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">
              Notifications
            </h3>
            {loading && (
              <div className="px-4 py-2 text-sm text-gray-500">
                Loading notifications...
              </div>
            )}
            {error && (
              <div className="px-4 py-2 text-sm text-red-500">
                Error: {error}
              </div>
            )}
            {!loading && !error && notifications.length > 0 ? (
              <ul className="max-h-64 overflow-y-auto">
                {notifications.map((notification, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
                  >
                    {/* Unread indicator */}
                    {!notification.read && (
                      <span className="w-2.5 h-2.5 mr-3 rounded-full bg-red-500 self-center"></span> // Perfect Circle
                    )}

                    {/* Notification content container */}
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between items-center">
                        <div className="text-xs font-medium">
                          <span className="font-bold">
                            {notification.senderName}
                          </span>{' '}
                          sent a message to
                          <span className="font-bold">
                            {' '}
                            {notification.recipientName}
                          </span>
                        </div>
                      </div>

                      {/* Message content */}
                      <div className="text-xs text-gray-600 overflow-hidden overflow-ellipsis line-clamp-2">
                        <strong>"{notification.messageContent}"</strong>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              !loading &&
              !error && (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No notifications
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;

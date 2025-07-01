import React from 'react';
import { useQuery } from '@tanstack/react-query';
import DashboardDataService from '../services/dashboard.service';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopUsers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['topUsers'],
    queryFn: DashboardDataService.getTopUsers,
  });

  if (isLoading) return (
    <div className="flex items-center justify-center h-[200px]">
      <div className="bg-white rounded-xl shadow-lg px-8 py-8 flex flex-col items-center w-full max-w-xs mx-auto">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Loading Chart</h2>
        <p className="text-gray-500 text-sm">Please wait while we load the data...</p>
      </div>
    </div>
  );
  if (error) return <div>Error loading top users</div>;

  console.log('Fetched topUsers data:', data);

  const users = data?.data?.data?.users || [];

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6">
      <h3 className="font-medium text-lg mb-2 text-indigo-700">Top Users</h3>
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={user.userId} className="py-2 flex items-center justify-between">
            <span className="font-semibold text-gray-800">
              {user.firstName} {user.lastName} <span className="text-xs text-gray-500">({user.senderType})</span>
            </span>
            <span className="text-indigo-600 font-bold">{user.messageCount} messages</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsers; 
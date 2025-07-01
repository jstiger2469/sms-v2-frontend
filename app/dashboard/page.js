'use client'

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useDashboardStore from '../store/useDashboardStore';
import DashboardDataService from '../services/dashboard.service';
import AverageDailyUsersChart from '../components/AverageDailyUsersChart';
import AverageMessagesPerDayChart from '../components/AverageMessagesPerDayChart';
import MessagesBySenderTypeChart from '../components/MessagesBySenderTypeChart';
import MessagesLineChart from '../components/MessagesByMonth';
import ResponseRateBySenderTypeChart from '../components/ResponseRateBySenderTypeChart';
import TopUsers from '../components/TopUsers';
import Navigation from '../../components/Navigation';

const Dashboard = () => {
  const {
    totalMessages,
    setTotalMessages,
    averageResponseTime,
    setAverageResponseTime,
  } = useDashboardStore();

  const {
    isLoading,
    error,
    data: totalMessagesData,
  } = useQuery({
    queryKey: ['totalMessages'],
    queryFn: DashboardDataService.getTotalMessages,
    onError: (err) => console.error('Error fetching totalMessages:', err),
  });

  const { data: responseTimeData } = useQuery({
    queryKey: ['averageResponseTime'],
    queryFn: DashboardDataService.getAverageResponseTime,
    onError: (err) => console.error('Error fetching averageResponseTime:', err),
  });

  useEffect(() => {
    if (totalMessagesData) {
      console.log('Fetched totalMessagesData:', totalMessagesData);
      console.log('Setting totalMessages:', totalMessagesData.data.data.totalMessages);
      setTotalMessages(totalMessagesData.data.data.totalMessages);
    }
    if (responseTimeData) {
      console.log('Fetched responseTimeData:', responseTimeData);
      setAverageResponseTime(responseTimeData.data.data.humanReadable);
    }
  }, [
    totalMessagesData,
    responseTimeData,
    setTotalMessages,
    setAverageResponseTime,
  ]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col">
        <Navigation />
        <div className="flex flex-1 items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg px-10 py-12 flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-6"></div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Loading Dashboard</h2>
            <p className="text-gray-500 text-base">Please wait while we fetch your dashboard data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return <div>Error loading dashboard data</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-gray-100">
        <h2 className="text-xl font-bold mb-4">Dashboard Metrics</h2>

        <div className="mb-6">
          <div className="p-4 border rounded shadow-sm mb-4 bg-white">
            <h3 className="font-medium text-lg">Total Messages</h3>
            <p className="text-2xl font-bold">{totalMessages}</p>
          </div>

          <div className="p-4 border rounded shadow-sm mb-4 bg-white">
            <h3 className="font-medium text-lg">Average Response Time</h3>
            <p className="text-2xl font-bold">{averageResponseTime}</p>
          </div>
        </div>

        <div className="grid mb-6 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-sm border bg-white shadow-default">
            <AverageDailyUsersChart />
          </div>
          <div className="rounded-sm border bg-white shadow-default">
            <ResponseRateBySenderTypeChart />
          </div>
          <div className="rounded-sm border bg-white shadow-default">
            <AverageMessagesPerDayChart />
          </div>
          <div className="rounded-sm border bg-white shadow-default">
            <MessagesBySenderTypeChart />
          </div>
        </div>

        <div className="chart-container">
          <MessagesLineChart />
        </div>
        <div className="chart-container">
          <TopUsers />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
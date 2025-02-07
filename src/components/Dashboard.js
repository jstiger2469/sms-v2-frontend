import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useDashboardStore from '../store/useDashboardStore';
import DashboardDataService from '../services/dashboard.service';
import AverageDailyUsersChart from './AverageDailyUsersChart';
import AverageMessagesPerDayChart from './AverageMessagesPerDayChart';
import MessagesBySenderTypeChart from './MessagesBySenderTypeChart';
import MessagesLineChart from './MessagesByMonth';
import ResponseRateBySenderTypeChart from './ResponseRateBySenderTypeChart';
import TopUsers from './TopUsers';

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
      console.log(
        'Setting totalMessages:',
        totalMessagesData.data.totalMessages,
      );
      setTotalMessages(totalMessagesData.data.totalMessages);
    } else {
      console.error('TotalMessages data is not available');
    }
    if (responseTimeData) {
      console.log(
        'Setting averageResponseTime:',
        responseTimeData.data.humanReadable,
      );
      setAverageResponseTime(responseTimeData.data.humanReadable);
    }
  }, [
    totalMessagesData,
    responseTimeData,
    setTotalMessages,
    setAverageResponseTime,
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading dashboard data</div>;
  }

  return (
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
  );
};

export default Dashboard;

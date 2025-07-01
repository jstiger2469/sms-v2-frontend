import React from 'react';
import { useQuery } from '@tanstack/react-query';
import DashboardDataService from '../services/dashboard.service';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MessagesLineChart = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['messagesByMonth'],
    queryFn: DashboardDataService.getMessagesByMonth,
  });

  if (isLoading) return (
    <div className="flex items-center justify-center h-[300px]">
      <div className="bg-white rounded-xl shadow-lg px-8 py-8 flex flex-col items-center w-full max-w-xs mx-auto">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Loading Chart</h2>
        <p className="text-gray-500 text-sm">Please wait while we load the data...</p>
      </div>
    </div>
  );
  if (error) return <div>Error loading chart</div>;

  console.log('Fetched messagesByMonth data:', data);

  const chartData = {
    labels: data?.data?.data?.labels || [],
    datasets: [
      {
        label: 'Messages By Month',
        data: data?.data?.data?.values || [],
        fill: true,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.3,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Messages By Month',
        font: { size: 18 },
        color: '#1e293b',
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#fff',
        titleColor: '#1e293b',
        bodyColor: '#1e293b',
        borderColor: '#1e293b',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748b', font: { size: 14 } },
      },
      y: {
        grid: { color: '#e5e7eb' },
        ticks: { color: '#64748b', font: { size: 14 } },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} className="bg-white rounded-lg shadow p-4" />;
};

export default MessagesLineChart; 
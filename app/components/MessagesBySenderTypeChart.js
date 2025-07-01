import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import DashboardDataService from '../services/dashboard.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

const MessagesBySenderTypeChart = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessagesData = async () => {
      try {
        const senderData = await DashboardDataService.getMessagesBySenderType();
        // Only keep Mentor and Student, and order Mentor first, Student second
        const filtered = senderData.data.filter(item => item._id === 'Mentor' || item._id === 'Student');
        const sorted = filtered.sort((a, b) => (a._id === 'Mentor' ? -1 : 1));
        const labels = sorted.map((item) => item._id);
        const counts = sorted.map((item) => item.count);
        setChartData({
          labels: labels.map(l => l === 'Mentor' ? 'Mentors' : 'Students'),
          datasets: [
            {
              label: 'Delivered Messages by Sender Type',
              data: counts,
              backgroundColor: ['#FF6384', '#36A2EB'],
              borderWidth: 0,
            },
          ],
        });
      } catch (err) {
        setError('Failed to fetch data');
      }
    };
    fetchMessagesData();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!chartData) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div className="bg-white rounded-xl shadow-lg px-8 py-8 flex flex-col items-center w-full max-w-xs mx-auto">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Loading Chart</h2>
          <p className="text-gray-500 text-sm">Please wait while we load the data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-auto bg-white p-6 rounded-md">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
        Delivered Messages
      </h2>
      <div className="w-full h-[300px]">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false, // Hide legend for simplicity
              },
              datalabels: {
                color: 'white',
                font: {
                  weight: 'bold',
                  size: 14,
                },
                formatter: (value) => value.toLocaleString(),
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  display: false,
                },
                ticks: {
                  display: false,
                },
                border: {
                  display: false,
                },
              },
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  display: true,
                  color: '#333',
                },
                border: {
                  display: false,
                },
              },
            },
            elements: {
              bar: {
                borderRadius: 8,
                borderWidth: 1,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default MessagesBySenderTypeChart; 
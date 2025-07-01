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

const AverageDailyUsersChart = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAverageDailyUsersData = async () => {
      try {
        const response = await DashboardDataService.getAverageDailyUsers();
        console.log('AverageDailyUsersChart response:', response.data);
        // Expecting { mentor: { values: [...] }, student: { values: [...] } }
        const mentorValues = response.data.mentor?.values || [];
        const studentValues = response.data.student?.values || [];
        const mentorAvg = mentorValues.length ? mentorValues.reduce((a, b) => a + b, 0) / mentorValues.length : 0;
        const studentAvg = studentValues.length ? studentValues.reduce((a, b) => a + b, 0) / studentValues.length : 0;
        setChartData({
          labels: ['Mentors', 'Students'],
          datasets: [
            {
              label: 'Average Daily Active Users',
              data: [mentorAvg, studentAvg],
              backgroundColor: ['#FF6384', '#36A2EB'],
              borderWidth: 1,
              borderRadius: 8,
            },
          ],
        });
      } catch (err) {
        setError('Failed to fetch average daily users data');
      }
    };
    fetchAverageDailyUsersData();
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
    <div className="w-full h-auto bg-white p-6 rounded-md mb-4">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
        Average Daily Active Users
      </h2>
      <div className="w-full h-[300px]">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              datalabels: {
                color: 'white',
                font: { weight: 'bold', size: 14 },
                formatter: (value) => Number(value).toFixed(2),
              },
              title: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: { display: false },
                ticks: { display: false },
                border: { display: false },
              },
              x: {
                grid: { display: false },
                ticks: { display: true, color: '#333' },
                border: { display: false },
              },
            },
            elements: {
              bar: { borderRadius: 8, borderWidth: 1 },
            },
          }}
        />
      </div>
    </div>
  );
};

export default AverageDailyUsersChart; 
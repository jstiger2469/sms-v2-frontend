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
        const data = response.data;
        console.log(data);
        setChartData({
          labels: ['Mentors', 'Students'],
          datasets: [
            {
              label: 'Average Daily Active Users',
              data: [data.averageMentorUsers, data.averageStudentUsers],
              backgroundColor: ['#FF6384', '#36A2EB'], // Red for Mentor, Blue for Student
              borderWidth: 1,
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
    return <p>Loading...</p>;
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
              legend: {
                display: false,
              },
              datalabels: {
                color: 'white',
                font: {
                  weight: 'bold',
                  size: 14,
                },
                formatter: (value) => `${value}`,
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

export default AverageDailyUsersChart;

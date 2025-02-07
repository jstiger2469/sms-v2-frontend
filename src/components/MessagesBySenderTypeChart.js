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

        const labels = senderData.data.map((item) => item._id); // Student, Mentor
        const counts = senderData.data.map((item) => item.count);

        setChartData({
          labels,
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
    return <p>Loading...</p>;
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

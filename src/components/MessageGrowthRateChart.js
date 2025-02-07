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

const MessageGrowthRateChart = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessageGrowthData = async () => {
      try {
        const response = await DashboardDataService.getMessageGrowthRate();
        const data = response.data;

        const labels = [];
        const studentGrowth = [];
        const mentorGrowth = [];

        data.forEach((item) => {
          const label = `${item.year} - ${item.month}`;
          labels.push(label);
          studentGrowth.push(item.studentGrowth);
          mentorGrowth.push(item.mentorGrowth);
        });

        setChartData({
          labels,
          datasets: [
            {
              label: 'Student Growth (%)',
              data: studentGrowth,
              backgroundColor: '#36A2EB',
              borderWidth: 1,
            },
            {
              label: 'Mentor Growth (%)',
              data: mentorGrowth,
              backgroundColor: '#FF6384',
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        setError('Failed to fetch message growth data');
      }
    };

    fetchMessageGrowthData();
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
        Message Growth Rate Over the Past Two Years
      </h2>
      <div className="w-full h-[300px]">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
              },
              datalabels: {
                color: 'white',
                font: {
                  weight: 'bold',
                  size: 14,
                },
                formatter: (value) => `${Math.round(value)}%`,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  display: false,
                },
                ticks: {
                  display: true,
                },
              },
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  display: true,
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

export default MessageGrowthRateChart;

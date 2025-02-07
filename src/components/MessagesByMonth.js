import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import DashboardDataService from '../services/dashboard.service';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function MessagesLineChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DashboardDataService.getMessagesByMonth();
        const data = response.data;

        // Prepare labels and datasets
        const labels = Object.keys(data); // Months (e.g., "2024-01")
        const studentData = labels.map((label) => data[label].Student || 0);
        const mentorData = labels.map((label) => data[label].Mentor || 0);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Student Messages',
              data: studentData,
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              tension: 0.3,
            },
            {
              label: 'Mentor Messages',
              data: mentorData,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              tension: 0.3,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-md p-6 shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Messages by Month
      </h2>
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              title: {
                display: true,
                text: 'Messages by Sender Type Over Time',
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Months',
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Message Count',
                },
              },
            },
          }}
        />
      ) : (
        <p className="text-gray-600">Loading chart...</p>
      )}
    </div>
  );
}

export default MessagesLineChart;

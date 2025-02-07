import React, { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import DashboardDataService from '../services/dashboard.service';

const UserInteractionGraph = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await DashboardDataService.getInteractions();

      // Format data for Radar Chart
      const labels = [...new Set(data.map((item) => item.senderName))];
      const datasets = labels.map((sender) => ({
        label: sender,
        data: labels.map((receiver) => {
          const interaction = data.find(
            (item) =>
              item.senderName === sender && item.receiverName === receiver,
          );
          return interaction ? interaction.messageCount : 0;
        }),
      }));

      setChartData({
        labels,
        datasets: datasets.map((dataset, idx) => ({
          ...dataset,
          backgroundColor: `rgba(${(idx + 1) * 30}, 99, 132, 0.2)`,
          borderColor: `rgba(${(idx + 1) * 30}, 99, 132, 1)`,
        })),
      });
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-center mb-6">
        User Interaction Graph
      </h2>
      {chartData ? (
        <Radar
          data={chartData}
          options={{
            scales: {
              r: {
                angleLines: { display: true },
                suggestedMin: 0,
                suggestedMax: 10,
              },
            },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserInteractionGraph;

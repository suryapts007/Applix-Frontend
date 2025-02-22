import React from "react";
import { Line, Bar, Scatter } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, BarElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale, TimeScale } from "chart.js";
import "chartjs-adapter-date-fns"; // Required for time-based charts

ChartJS.register(LineElement, BarElement, PointElement, LinearScale, CategoryScale, TimeScale, Title, Tooltip, Legend);

const DataChart = ({ records }) => {
  if (!records || records.length === 0) return <p>No data available for visualization.</p>;

  // Prepare data for the charts
  const timestamps = records.map(record => record.timestamp);
  const temperatures = records.map(record => record.temperature);

  // Line Chart Data
  const lineChartData = {
    labels: timestamps,
    datasets: [
      {
        label: "Temperature Over Time",
        data: temperatures,
        borderColor: "#8a2be2",
        backgroundColor: "rgba(138, 43, 226, 0.3)",
        borderWidth: 2,
        pointRadius: 3,
      },
    ],
  };

  // Bar Chart Data
  const barChartData = {
    labels: timestamps,
    datasets: [
      {
        label: "Temperature Readings",
        data: temperatures,
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  // Scatter Plot Data
  const scatterChartData = {
    datasets: [
      {
        label: "Temperature Distribution",
        data: records.map(record => ({
          x: new Date(record.timestamp).getTime(),
          y: record.temperature,
        })),
        backgroundColor: "rgba(255,99,132,1)",
        pointRadius: 4,
      },
    ],
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>📊 Data Visualizations</h3>

      <div style={{ width: "100%", height: "300px", marginBottom: "20px" }}>
        <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>

      <div style={{ width: "100%", height: "300px", marginBottom: "20px" }}>
        <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>

      <div style={{ width: "100%", height: "300px" }}>
        <Scatter data={scatterChartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default DataChart;
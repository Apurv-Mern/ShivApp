import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  Title,
  Tooltip,
  PointElement,
  Legend,
  ArcElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  datasets: [
    {
      data: [10, 20, 30, 40],
      backgroundColor: ["red", "yellow", "blue", "green"],
    },
  ],

  labels: ["red", "yellow", "blue", "green"],
};
const Charts = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <Pie data={data} />
      </div>
      <div>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default Charts;

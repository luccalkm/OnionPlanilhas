import { Pie } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  Title as ChartTitle,
} from "chart.js";
import React from "react";

Chart.register(ArcElement, Tooltip, Legend, ChartTitle);

export const VendasPorItem = ({ vendasPorItem, titulo }) => {
  const data = {
    labels: Object.keys(vendasPorItem),
    datasets: [
      {
        data: Object.values(vendasPorItem),
        backgroundColor: [
          "#3d348b",
          "#7678ed",
          "#f7b801",
          "#f18701",
          "#f35b04",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        enabled: true,
        position: "nearest",
      },
      title: {
        display: true,
        text: titulo,
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

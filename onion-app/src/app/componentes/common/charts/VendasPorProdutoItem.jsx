import { Pie } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  Title as ChartTitle,
} from "chart.js";
import Lottie from "lottie-react";
import error from "../../../../assets/error/dataError.json";

Chart.register(ArcElement, Tooltip, Legend, ChartTitle);

export const VendasPorItem = ({ vendasPorItem, titulo }) => {
  if (Object.values(vendasPorItem).length === 0) 
  return (
    <Lottie 
    loop={false}
    delay={5000}
    style={{width: '50%', display: 'flex', margin: '0 auto'}}
    animationData={error} />
    );


  const data = {
    labels: Object.keys(vendasPorItem),
    datasets: [
      {
        data: Object.values(vendasPorItem),
        backgroundColor: [
          "#3d348b",
          "#7678ed",
          '#e04f58',
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

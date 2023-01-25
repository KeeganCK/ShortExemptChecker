import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
import { Data } from "./Data";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

type Props = {
  data: Array<Data>;
};

// const options = {
//   responsive: true,
//   interaction: {
//     mode: 'index' as const,
//     intersect: false,
//   },
//   stacked: false,
//   plugins: {
//     title: {
//       display: true,
//       text: 'Chart.js Line Chart - Multi Axis',
//     },
//   },
//   scales: {
//     y: {
//       type: 'linear' as const,
//       display: true,
//       position: 'left' as const,
//     },
//     y1: {
//       type: 'linear' as const,
//       display: true,
//       position: 'right' as const,
//       grid: {
//         drawOnChartArea: false,
//       },
//     },
//   },
// };

const Charts = ({ data }: Props) => {
  // const [filteredData, setFilteredData] = useState<any>();
  // const [labels, setLabels] = useState<Array<string>>([]);


  // useEffect(() => {
  //   const labels = ['1', '2', '3', '4']
  //   const dataOne = [1, 24, 22, 23]
  //   const dataTwo = [11, 56, 26, 17]
  //   const data = {
  //     labels: labels,
  //     datasets: [
  //       {
  //         label: 'Dataset 1',
  //         data: dataOne,
  //         borderColor: 'rgb(255, 99, 132)',
  //         backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //         yAxisID: 'y',
  //       },
  //       {
  //         label: 'Dataset 2',
  //         data: dataTwo,
  //         borderColor: 'rgb(53, 162, 235)',
  //         backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //         yAxisID: 'y1',
  //       },
  //     ],
  //   };
  //   setFilteredData(data)
  // }, [filteredData])
  
  // @ts-ignore
  // return <Line options={options} filteredData={data} />;
  return <div></div>
};

export default Charts;

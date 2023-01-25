import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Data } from "./Data";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Button, Form } from "antd";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  data: Array<Data>;
};

interface CreateDataProps {
  a1: Array<string>;
  d1: Array<number>;
  d2: Array<number>;
  s1: string;
  s2: string;
  d3?: Array<number>;
  s3?: string;
  leftOverA?: Array<string>;
  leftOverD?: Array<number>;
  leftOverS?: string;
  allDifferent?: boolean;
  a2?: Array<string>;
  a3?: Array<string>;
}

const Charts = ({ data }: Props) => {
  const [labelsOne, setLabelsOne] = useState<Array<string>>([]);
  const [labelsTwo, setLabelsTwo] = useState<Array<string>>([]);
  const [labelsThree, setLabelsThree] = useState<Array<string>>([]);
  const [dataOne, setDataOne] = useState<any>();
  const [dataTwo, setDataTwo] = useState<any>();
  const [dataThree, setDataThree] = useState<any>();
  const [max, setMax] = useState<number>(0);
  const [options, setOptions] = useState<any>({
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        display: true,
        position: "left" as const,
      },
    },
  });
  const [fixed, setFixed] = useState(false);

  const checkIfSame = (a1: Array<string>, a2: Array<string>) => {
    if (a1.length === a2.length) {
      for (let i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i]) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  };

  const createData = (props: CreateDataProps) => {
    if (props.allDifferent === true) {
      setDataOne({
        labels: props.a1,
        datasets: [
          {
            label: props.s1,
            data: props.d1,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            yAxisID: "y",
          },
        ],
      });
      if (props.a2 && props.a2.length > 0) {
        setDataTwo({
          labels: props.a2,
          datasets: [
            {
              label: props.s2,
              data: props.d2,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              yAxisID: "y",
            },
          ],
        });
      } else {
        setDataTwo(null);
      }
      if (props.a3 && props.a3.length > 0) {
        setDataThree({
          labels: props.a3,
          datasets: [
            {
              label: props.s3,
              data: props.d3,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              yAxisID: "y",
            },
          ],
        });
      } else {
        setDataThree(null);
      }
    } else {
      if (!props.d3) {
        setDataOne({
          labels: props.a1,
          datasets: [
            {
              label: props.s1,
              data: props.d1,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              yAxisID: "y",
            },
            {
              label: props.s2,
              data: props.d2,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
              yAxisID: "y",
            },
          ],
        });
        if (props.leftOverA && props.leftOverA.length > 0) {
          setDataTwo({
            labels: props.leftOverA,
            datasets: [
              {
                label: props.leftOverS,
                data: props.leftOverD,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                yAxisID: "y",
              },
            ],
          });
        } else {
          setDataTwo(null);
        }
        setDataThree(null);
      } else {
        setDataOne({
          labels: props.a1,
          datasets: [
            {
              label: props.s1,
              data: props.d1,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              yAxisID: "y",
            },
            {
              label: props.s2,
              data: props.d2,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
              yAxisID: "y",
            },
            {
              label: props.s3,
              data: props.d3,
              borderColor: "rgb(47, 205, 47)",
              backgroundColor: "rgba(47, 205, 47, 0.5)",
              yAxisID: "y",
            },
          ],
        });
      }
    }
  };

  useEffect(() => {
    let tempMax = 0;
    let tempLabelsOne: Array<string> = [];
    let tempLabelsTwo: Array<string> = [];
    let tempLabelsThree: Array<string> = [];
    let tempPercentsOne: Array<number> = [];
    let tempPercentsTwo: Array<number> = [];
    let tempPercentsThree: Array<number> = [];
    let symbolOne: string = "";
    let symbolTwo: string = "";
    let symbolThree: string = "";
    for (let i = 0; i < data.length; i++) {
      const tempLabels: Array<string> = [];
      const tempPercents: Array<number> = [];
      if (i === 0) {
        symbolOne = data[i].symbol;
        for (let j = 0; j < data[i].data.length; j++) {
          let tempLabel = data[i].data[j].date;
          let tempPercent = parseFloat(data[i].data[j].percentage.slice(0, -1));
          if(tempPercent > tempMax) {
            tempMax = tempPercent;
          }
          tempLabels.push(tempLabel);
          tempPercents.push(tempPercent);
        }
        setLabelsOne(tempLabels);
        setDataOne(tempPercents);
        tempLabelsOne = tempLabels;
        tempPercentsOne = tempPercents;
      } else if (i === 1) {
        symbolTwo = data[i].symbol;
        for (let j = 0; j < data[i].data.length; j++) {
          let tempLabel = data[i].data[j].date;
          let tempPercent = parseFloat(data[i].data[j].percentage.slice(0, -1));
          if(tempPercent > tempMax) {
            tempMax = tempPercent;
          }
          tempLabels.push(tempLabel);
          tempPercents.push(tempPercent);
        }
        setLabelsTwo(tempLabels);
        setDataTwo(tempPercents);
        tempLabelsTwo = tempLabels;
        tempPercentsTwo = tempPercents;
      } else {
        symbolThree = data[i].symbol;
        for (let j = 0; j < data[i].data.length; j++) {
          let tempLabel = data[i].data[j].date;
          let tempPercent = parseFloat(data[i].data[j].percentage.slice(0, -1));
          if(tempPercent > tempMax) {
            tempMax = tempPercent;
          }
          tempLabels.push(tempLabel);
          tempPercents.push(tempPercent);
        }
        setLabelsThree(tempLabels);
        setDataThree(tempPercents);
        tempLabelsThree = tempLabels;
        tempPercentsThree = tempPercents;
      }
    }
    setMax(tempMax)

    const oneTwo: boolean =
      tempLabelsOne.length > 0 && tempLabelsTwo.length > 0
        ? checkIfSame(tempLabelsOne, tempLabelsTwo)
        : false;
    const oneThree: boolean =
      tempLabelsOne.length > 0 && tempLabelsThree.length > 0
        ? checkIfSame(tempLabelsOne, tempLabelsThree)
        : false;
    const twoThree: boolean =
      tempLabelsTwo.length > 0 && tempLabelsThree.length > 0
        ? checkIfSame(tempLabelsTwo, tempLabelsThree)
        : false;
    if (oneTwo) {
      createData({
        a1: tempLabelsOne,
        d1: tempPercentsOne,
        d2: tempPercentsTwo,
        s1: symbolOne,
        s2: symbolTwo,
        leftOverA: tempLabelsThree,
        leftOverD: tempPercentsThree,
        leftOverS: symbolThree,
      });
    }
    if (oneThree) {
      createData({
        a1: tempLabelsOne,
        d1: tempPercentsOne,
        d2: tempPercentsThree,
        s1: symbolOne,
        s2: symbolThree,
        leftOverA: tempLabelsTwo,
        leftOverD: tempPercentsTwo,
        leftOverS: symbolTwo,
      });
    } else if (twoThree) {
      createData({
        a1: tempLabelsTwo,
        d1: tempPercentsTwo,
        d2: tempPercentsThree,
        s1: symbolTwo,
        s2: symbolThree,
        leftOverA: tempLabelsThree,
        leftOverD: tempPercentsThree,
        leftOverS: symbolThree,
      });
    } else if (oneTwo && twoThree) {
      createData({
        a1: tempLabelsOne,
        d1: tempPercentsOne,
        d2: tempPercentsTwo,
        s1: symbolOne,
        s2: symbolTwo,
        d3: tempPercentsThree,
        s3: symbolThree,
      });
    } else if (!oneTwo && !twoThree && !oneThree) {
      createData({
        a1: tempLabelsOne,
        d1: tempPercentsOne,
        d2: tempPercentsTwo,
        s1: symbolOne,
        s2: symbolTwo,
        d3: tempPercentsThree,
        s3: symbolThree,
        allDifferent: true,
        a2: tempLabelsTwo,
        a3: tempLabelsThree,
      });
    }
  }, [data]);

  const fixScale = () => {
    if(!fixed) {
      setOptions({
        responsive: true,
        interaction: {
          mode: "index" as const,
          intersect: false,
        },
        stacked: false,
        scales: {
          y: {
            display: true,
            min: 0,
            max: Math.ceil(max + 1),
            position: "left" as const,
          },
        },
      });
      setFixed(true);
    } else {
      setOptions({
        responsive: true,
        interaction: {
          mode: "index" as const,
          intersect: false,
        },
        stacked: false,
        scales: {
          y: {
            display: true,
            position: "left" as const,
          },
        },
      });
      setFixed(false);
    }
  };

  return (
    <>
      <br />
      {labelsOne.length > 0 && dataOne && 
        <Button onClick={fixScale}>{fixed ? 'Natural Scale': 'Fix Scale'}</Button>
      }
      <br />
      {labelsOne.length > 0 && dataOne && (
        <Line options={options} data={dataOne} />
      )}
      <br />
      {labelsTwo.length > 0 && dataTwo && (
        <Line options={options} data={dataTwo} />
      )}
      <br />
      {labelsThree.length > 0 && dataThree && (
        <Line options={options} data={dataThree} />
      )}
      <br />
    </>
  );
};

export default Charts;

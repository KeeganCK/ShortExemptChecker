import React from "react";
import { Data } from "./Data";

type Props = {
  data: Array<Data>;
  setData: React.Dispatch<React.SetStateAction<Data[]>>;
};

const Charts = ({ data, setData }: Props) => {
  return <div>Charts</div>;
};

export default Charts;

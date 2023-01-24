import { Button } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import Charts from "./Charts";
import Information from "./Information";
import StockPicker from "./StockPicker";

const CustomButton = styled(Button)`
	margin: 0.75em 0;
`

export type Data = {
  percentage: string;
  data: string;
  price: string;
};

export type Stocks = {
  symbol: string;
  year: string;
  month: string;
  days: Array<string>;
}

const Data = () => {
  const [data, setData] = useState<Array<Data>>([]);
  const [stocks, setStocks] = useState<Array<Stocks>>([]);
  let url = "https://cdn.finra.org/equity/regsho/daily/CNMSshvol20230123.txt";

  return (
    <>
      <StockPicker stocks={stocks} setStocks={setStocks} />
      <Information stocks={stocks} />
			{stocks.length > 0 && <CustomButton>Get Data</CustomButton>}
      <Charts data={data} setData={setData} />
    </>
  );
};

export default Data;

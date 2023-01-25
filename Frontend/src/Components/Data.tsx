import { Button } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import Information from "./Information";
import StockPicker, { CenterDiv } from "./StockPicker";
import StocksPicked from "./StocksPicked";

const CustomButton = styled(Button)`
  margin-top: 0.5em;
  margin-bottom: 0;
`;

const FormInfoContainer = styled.div`
  width: 47.5%;
  display: grid;
  grid-template-columns: 7fr 3fr;
  column-gap: 30px;
  @media (max-width: 1900px) {
    width: 100%;
  }
  @media (max-width: 1200px) {
    width: 100%;
    grid-template-columns: 6fr 4fr;
    column-gap: 20px;
  }
  @media (max-width: 1100px) {
    width: 100%;
    grid-template-columns: 1fr;
    column-gap: 20px;
  }
`;

export type Stocks = {
  symbol: string;
  year: string;
  month: string;
  days: Array<string>;
};

export type StocksArrayEntry = {
  date: string;
  percentage: string;
};

export type Data = {
  symbol: string;
  data: Array<StocksArrayEntry>;
};


const Data = () => {
  const [stocks, setStocks] = useState<Array<Stocks>>([]);
  const [changed, setChanged] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<Array<Data>>([]);

  const onGetData = async () => {
    let tempArray: Array<Data> = []
    setLoading(true);
    for (let stock of stocks) {
      const tempStocksArray: Array<StocksArrayEntry> = [];
      const year = stock.year;
      const month = stock.month;
      const days = stock.days;
      for (let day of days) {
        const url = `https://cdn.finra.org/equity/regsho/daily/CNMSshvol${year}${month}${day}.txt`;
        try {
          const response = await fetch(url);
          const responseData = await response.text();
          if (!response.ok) {
            continue;
          }
          const splitArray = responseData.split("\n");
          splitArray.forEach((line) => {
            const newLine = line.split("|");
            if (newLine[1] === stock.symbol) {
              const tempStocksObject: StocksArrayEntry = {
                date: `${year}-${month}-${day}`,
                percentage:
                  (
                    (parseFloat(newLine[3]) / parseFloat(newLine[2])) *
                    100
                  ).toFixed(2).toString() + "%",
              };
              tempStocksArray.push(tempStocksObject);
              return;
            }
          });
        } catch (err: any) {
          console.log("error");
        }
      }
      const tempDataObject: Data = {
        // symbol: stocks[i].symbol,
        symbol: stock.symbol,
        data: tempStocksArray,
      };
      tempArray.push(tempDataObject);
      setFilteredData(tempArray);
    }
    setChanged(changed === 0 ? 1 : 0)
    setLoading(false)
  };

  return (
    <>
    <FormInfoContainer>
      <StockPicker stocks={stocks} setStocks={setStocks} />
      {stocks.length > 0 && <StocksPicked stocks={stocks}/>}
    </FormInfoContainer>
      {stocks.length > 0 && (
        <CenterDiv>
          <CustomButton onClick={onGetData} type="primary" danger  loading={loading}>Get Data</CustomButton>
        </CenterDiv>
      )}
      <Information filteredData={filteredData} changed={changed} loading={loading}/>
    </>
  );
};

export default Data;

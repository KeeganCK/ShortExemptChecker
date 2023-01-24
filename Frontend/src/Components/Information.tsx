import { Table } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Stocks } from "./Data";

const { Column, ColumnGroup } = Table;

const StockListDiv = styled.div``;

const CustomTable = styled(Table)`
  margin: 0.75em 0;
`;

type Props = {
  stocks: Array<Stocks>;
};

interface DataType {
  key: React.Key;
  symbol: string;
  dates: string;
}

const Information = (props: Props) => {
  const [data, setData] = useState<DataType[]>([]);
  useEffect(() => {
    const tempData = [];
    for (let i = 0; i < props.stocks.length; i++) {
      const tempObject: DataType = {
        key: i + 1,
        symbol: props.stocks[i].symbol,
        dates: `${props.stocks[i].year}-${props.stocks[i].month}-${
          props.stocks[i].days[0]
        } to ${props.stocks[i].year}-${props.stocks[i].month}-${
          props.stocks[i].days[props.stocks[i].days.length - 1]
        }`,
      };
      tempData.push(tempObject);
    }
    setData(tempData);
  }, [props.stocks]);

  return (
    <StockListDiv>
      {props.stocks.length > 0 && (
        <CustomTable dataSource={data} pagination={false}>
          <Column title="key" dataIndex="key" key="key" />
          <Column title="symbol" dataIndex="symbol" key="symbol" />
          <Column title="dates" dataIndex="dates" key="dates" />
        </CustomTable>
      )}
    </StockListDiv>
  );
};

export default Information;

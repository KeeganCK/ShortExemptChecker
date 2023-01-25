import { Table } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Stocks } from "./Data";
import { CenterDiv } from "./StockPicker";
import { Typography } from 'antd';
const { Title, Text } = Typography;
const { Column } = Table;

type StocksPickedProps = {
  stocks: Array<Stocks>;
};

type PickedStock = {
  key: number;
  symbol: string;
  dates: string;
};

const CustomTable = styled(Table)`
  margin-top: 2em;
`;

const StocksPicked = (props: StocksPickedProps) => {
  const [stocksPicked, setStocksPicked] = useState<Array<PickedStock>>();
  useEffect(() => {
    const tempData = [];
    for (let i = 0; i < props.stocks.length; i++) {
      const tempObject: PickedStock = {
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
    setStocksPicked(tempData);
  }, [props.stocks]);

  return (
    <CenterDiv>
      <Title level={3}>Add Symbol With Dates</Title>
			<Text type="success">The information you entered</Text>
      <CustomTable dataSource={stocksPicked} pagination={false} size="small">
        <Column title="Symbol" dataIndex="symbol" key="symbol" />
        <Column title="Dates" dataIndex="dates" key="dates" />
      </CustomTable>
    </CenterDiv>
  );
};

export default StocksPicked;

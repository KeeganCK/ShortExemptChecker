import { Skeleton, Table } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Data, Stocks } from "./Data";
import { CenterDiv } from "./StockPicker";
import { Typography } from "antd";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
const { Title } = Typography;

const { Column } = Table;

type TablesContainerProps = {
  columns: number;
};

const StockListDiv = styled.div`
  width: 47.5%;
  @media (max-width: 1900px) {
    width: 100%;
  }
`;

const CustomTable = styled(Table)`
  margin: 0.75em 0.75em;
`;

const TablesContainer = styled.div<TablesContainerProps>`
  display: grid;
  ${(p) => (p.columns === 1 ? "grid-template-columns: 1fr" : "")};
  ${(p) => (p.columns === 2 ? "grid-template-columns: 1fr 1fr" : "")};
  ${(p) => (p.columns === 3 ? "grid-template-columns: 1fr 1fr 1fr" : "")};
  @media(max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

type Props = {
  filteredData: Array<Data>;
  changed: number;
  loading: boolean;
};

interface DataType {
  key: React.Key;
  symbol: string;
  date: string;
  percentage: string;
}

const Information = (props: Props) => {
  const [dataOne, setDataOne] = useState<DataType[]>([]);
  const [dataTwo, setDataTwo] = useState<DataType[]>([]);
  const [dataThree, setDataThree] = useState<DataType[]>([]);
  const [chart, setChart] = useState<boolean>(false);

  useEffect(() => {
    for (let i = 0; i < props.filteredData.length; i++) {
      const tempData = [];
      for (let j = 0; j < props.filteredData[i].data.length; j++) {
        const tempObject: DataType = {
          key: j + 1,
          symbol: props.filteredData[i].symbol,
          date: props.filteredData[i].data[j].date,
          percentage: props.filteredData[i].data[j].percentage,
        };
        tempData.push(tempObject);
      }
      if (i === 0) setDataOne(tempData.reverse());
      else if (i === 1) setDataTwo(tempData.reverse());
      else setDataThree(tempData.reverse());
    }
  }, [props.changed]);

  const changeView = ({ target: { value } }: RadioChangeEvent) => {
    setChart(value === "charts" ? true : false);
  };

  return (
    <>
      <CenterDiv>
        <Title level={3}>Results</Title>
        <Radio.Group onChange={changeView}>
          <Radio.Button value="tables">Tables</Radio.Button>
          <Radio.Button value="charts">Charts</Radio.Button>
        </Radio.Group>
      </CenterDiv>
      {chart ? (
        <StockListDiv></StockListDiv>
      ) : (
        <StockListDiv>
          {props.loading ? (
            <TablesContainer columns={1}>
              <Skeleton />
            </TablesContainer>
          ) : (
            <TablesContainer columns={props.filteredData.length}>
              {props.filteredData.length > 0 && dataOne.length > 0 && (
                <CustomTable
                  dataSource={dataOne}
                  pagination={false}
                  size="small"
                >
                  <Column title="Date" dataIndex="date" key="date" />
                  <Column
                    title={dataOne[0].symbol}
                    dataIndex="percentage"
                    key="percentage"
                  />
                </CustomTable>
              )}
              {props.filteredData.length > 0 && dataTwo.length > 0 && (
                <CustomTable
                  dataSource={dataTwo}
                  pagination={false}
                  size="small"
                >
                  <Column title="Date" dataIndex="date" key="date" />
                  <Column
                    title={dataTwo[0].symbol}
                    dataIndex="percentage"
                    key="percentage"
                  />
                </CustomTable>
              )}
              {props.filteredData.length > 0 && dataThree.length > 0 && (
                <CustomTable
                  dataSource={dataThree}
                  pagination={false}
                  size="small"
                >
                  <Column title="Date" dataIndex="date" key="date" />
                  <Column
                    title={dataThree[0].symbol}
                    dataIndex="percentage"
                    key="percentage"
                  />
                </CustomTable>
              )}
            </TablesContainer>
          )}
        </StockListDiv>
      )}
    </>
  );
};

export default Information;

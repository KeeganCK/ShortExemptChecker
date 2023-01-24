import { Table } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const { Column, ColumnGroup } = Table;

const StockListDiv = styled.div``;

const CustomTable = styled(Table)`
	margin: 0.75em 0;
`

type Props = {
  stocks: Array<string>;
};

interface DataType {
  key: React.Key;
  symbol: string;
}

const Information = (props: Props) => {
  const [data, setData] = useState<DataType[]>([]);
	useEffect(() => {
		const tempData = []
		for (let i = 0; i < props.stocks.length; i++) {
			const tempObject: DataType = {
				key: i+1,
				symbol: props.stocks[i],
			};
			tempData.push(tempObject)
		}
		setData(tempData)
	}, [props.stocks])
  

  return (
    <StockListDiv>
      {props.stocks.length > 0 && (
        <CustomTable dataSource={data} pagination={false}>
					<Column title="key" dataIndex="key" key="key" />
          <Column title="symbol" dataIndex="symbol" key="symbol" />
        </CustomTable>
      )}
    </StockListDiv>
  );
};

export default Information;

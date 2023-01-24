import { Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const { Search } = Input;

type Props = {
  stocks: Array<string>;
  setStocks: React.Dispatch<React.SetStateAction<string[]>>;
};

const StockPicker = (props: Props) => {
	const stockAdder = useRef<any>(null);
	const [value, setValue] = useState<string>('')

	useEffect(() => {
    stockAdder.current.focus();
  });

	const onAddStockClick = (value: string) => {
		console.log('symbol: ', value)
    const tempStocks: Array<string> = [...props.stocks];
		if(!tempStocks.includes(value.toUpperCase()) && value !== '') {
			tempStocks.push(value.toUpperCase());
		}
    props.setStocks(tempStocks);
		setValue('')
  };
	

  return (
		<Search
			placeholder="input stock symbol"
			allowClear
			enterButton="Add"
			size="large"
			ref={stockAdder}
			onChange={(e: any) => setValue(e.target.value)}
			value={value}
			onSearch={onAddStockClick}
		/>
  );
};

export default StockPicker;

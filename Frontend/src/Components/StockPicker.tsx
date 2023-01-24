import { Button, Form, Input, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Stocks } from "./Data";

const { Search } = Input;

const CustomForm = styled(Form)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

type Props = {
  stocks: Array<Stocks>;
  setStocks: React.Dispatch<React.SetStateAction<Stocks[]>>;
};

type NotificationType = "success" | "info" | "warning" | "error";

const StockPicker = (props: Props) => {
  const [api, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();
  const stockAdder = useRef<any>(null);

  useEffect(() => {
    stockAdder.current.focus();
  });

  const openNotificationWithIcon = (
    type: NotificationType,
    description: string
  ) => {
    api[type]({
      message: "Error Occured",
      description: description,
    });
  };

  const onAddStock = (values: any) => {
    console.log("values: ", values);
    const tempStocks: Array<Stocks> = [...props.stocks];

    const length = parseInt(values.end) - parseInt(values.start);
    const days = [];
    for (let i = 0; i < length; i++) {
      let day = (i + parseInt(values.start)).toString();
      if (i + parseInt(values.start) < 10) {
        day = "0" + (i + parseInt(values.start)).toString();
      }
      days.push(day);
    }
    const tempStockObject: Stocks = {
      symbol: values.symbol.toUpperCase(),
      year: values.year,
      month: values.month,
      days: days,
    };

    const tempSymbols: Array<string> = [];
    for (let i = 0; i < tempStocks.length; i++) {
      tempSymbols.push(tempStocks[i].symbol);
    }
    if (!(tempStocks.length > 9)) {
      tempStocks.push(tempStockObject);
    } else {
      openNotificationWithIcon("error", "no more than ten entries allowed");
    }
    props.setStocks(tempStocks);
    form.resetFields();
  };

  return (
    <>
      {contextHolder}
      <Form
        onFinish={onAddStock}
        form={form}
        layout="horizontal"
        labelCol={{
          span: 5,
        }}
        labelAlign="left"
      >
        <Form.Item name="symbol" label="Symbol" rules={[{ required: true }]}>
          <Input
            placeholder="input stock symbol"
            allowClear
            size="large"
            ref={stockAdder}
          />
        </Form.Item>
        <Form.Item name="year" label="Year" rules={[{ required: true }]}>
          <Input placeholder="input year" allowClear size="large" />
        </Form.Item>
        <Form.Item name="month" label="Month" rules={[{ required: true }]}>
          <Input
            placeholder="input month (2 digits => ex: 01, ex: 10)"
            allowClear
            size="large"
          />
        </Form.Item>
        <Form.Item name="start" label="Start Date" rules={[{ required: true }]}>
          <Input
            placeholder="Must be 1 at the lowest"
            allowClear
            size="large"
          />
        </Form.Item>
        <Form.Item name="end" label="End Date" rules={[{ required: true }]}>
          <Input
            placeholder="Must be 31 at the highest"
            allowClear
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default StockPicker;

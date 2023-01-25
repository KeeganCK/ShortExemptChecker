import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Stocks } from "./Data";
import { Typography } from 'antd';
const { Title, Text } = Typography;

const StockPickerContainer = styled.div`
  @media (max-width: 1300px) {
    width: 100%;
  }
`;

export const CenterDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MultiInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

`;

const RowContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const RowContainerDates = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
`;

const CustomFormItem = styled(Form.Item)`
  :not(last-child) {
    margin-left: 10px;
  }
`

type MultiFormInputProps = {
  amount: number;
};

const MultiFormInput = styled(Form.Item)<MultiFormInputProps>`
  width: 170px;
  :not(:last-child) {
    margin-right: ${(props) => (props.amount > 2 ? "auto" : "20px")};
  }
`;

type Props = {
  stocks: Array<Stocks>;
  setStocks: React.Dispatch<React.SetStateAction<Stocks[]>>;
};

const StockPicker = (props: Props) => {
  const [numberofStocks, setNumberofStocks] = useState<Array<number>>([1]);

  const [form] = Form.useForm();

  const calculateDate = (end: string, start: string) => {
    const length = parseInt(end) - parseInt(start);
      const days = [];
      for (let j = 0; j <= length; j++) {
        let day = (j + parseInt(start)).toString();
        if (j + parseInt(start) < 10) {
          day = "0" + (j + parseInt(start)).toString();
        }
        days.push(day);
      }
      return days
  }

  const onAddStocks = (values: any) => {
    const tempStocks: Array<Stocks> = [];
    numberofStocks.forEach(entry => {
      let days: Array<string> = []
      if(entry === 1) {
        days = calculateDate(values.end1, values.start1)
        if(parseInt(values.month1) < 10) {
          values.month1 = '0' + values.month1
        }
        const tempStockObject: Stocks = {
          symbol: values.symbol1.toUpperCase(),
          year: values.year1,
          month: values.month1,
          days: days,
        };
        tempStocks.push(tempStockObject);
      } else if (entry === 2) {
        days = calculateDate(values.end2, values.start2)
        if(parseInt(values.month2) < 10) {
          values.month2 = '0' + values.month2
        }
        const tempStockObject: Stocks = {
          symbol: values.symbol2.toUpperCase(),
          year: values.year2,
          month: values.month2,
          days: days,
        };
        tempStocks.push(tempStockObject);
      } else {
        days = calculateDate(values.end3, values.start3)
        if(parseInt(values.month3) < 10) {
          values.month3 = '0' + values.month3
        }
        const tempStockObject: Stocks = {
          symbol: values.symbol3.toUpperCase(),
          year: values.year3,
          month: values.month3,
          days: days,
        };
        tempStocks.push(tempStockObject);
      }
      props.setStocks(tempStocks);
    })
   
    form.resetFields();
  };

  const handleChange = (value: string) => {
    const tempArray = [];
    for (let i = 0; i < parseInt(value); i++) {
      tempArray.push(i + 1);
    }
    setNumberofStocks(tempArray);
  };

  return (
    <StockPickerContainer>
      <CenterDiv>
        <Title level={3}>Add Symbol With Dates</Title>
      </CenterDiv>
      <Form
        onFinish={onAddStocks}
        size="small"
        form={form}
        layout="horizontal"
        labelCol={{
          span: 8,
        }}
        labelAlign="left"
      >
        <Form.Item>
          <RowContainer>
            <Text type="success" style={{ marginRight: "15px" }}>Number of stocks to check:</Text>
            <Select
              defaultValue="1"
              style={{ width: 60 }}
              onChange={handleChange}
              options={[
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
              ]}
            />
          </RowContainer>
        </Form.Item>
        <MultiInputContainer>
          {numberofStocks &&
            numberofStocks.map((value) => (
              <MultiFormInput
                name={`symbol${value}`}
                rules={[{ required: true }]}
                amount={value}
              >
                <Input
                  placeholder={`input stock symbol ${value}`}
                  allowClear
                />
              </MultiFormInput>
            ))}
        </MultiInputContainer>
        {numberofStocks &&
          numberofStocks.map((value) => (
            <>
              <RowContainerDates>
                <Form.Item
                  name={`year${value}`}
                  label={`Year ${value}`}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="ex: 2023" allowClear />
                </Form.Item>
                <CustomFormItem
                  name={`month${value}`}
                  label={`Month ${value}`}
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder="ex: 1"
                    allowClear
                  />
                </CustomFormItem>
              </RowContainerDates>
              <RowContainerDates>
                <Form.Item
                  name={`start${value}`}
                  label={`Start Date ${value}`}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="ex: 1" allowClear />
                </Form.Item>
                <CustomFormItem
                  name={`end${value}`}
                  label={`End Date ${value}`}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="ex: 31" allowClear />
                </CustomFormItem>
              </RowContainerDates>
            </>
          ))}
        <CenterDiv>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </CenterDiv>
      </Form>
    </StockPickerContainer>
  );
};

export default StockPicker;

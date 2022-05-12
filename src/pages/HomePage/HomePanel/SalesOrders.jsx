import React from "react";
import { Tooltip, Space, Dropdown, Menu, Button, Select } from "antd";
import {
  QuestionOutlined,
  ShoppingOutlined,
  ArrowUpOutlined
} from "@ant-design/icons";
import { SaleChart } from "../components/HomeCharts/SaleChart";

export function SalesOrders(props) {
  const menu = (
    <Menu>
      <Menu.Item key="1">Tải xuống</Menu.Item>
    </Menu>
  );
  const { data } = props;
  const [ total, setTotal ] = React.useState(0);
  const [ dataList, setDataList ] = React.useState([]);
  const convertData = (data) => {
    let newDataArray=[];
    let total = 0;
    Object.keys(data).map(function (key, index) {
      let newData = {
        type:  `Tháng ${key}`,
        sales: Number.parseFloat(data[key]).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
      }
      total+=Number.parseFloat(data[key]);
      newDataArray.push(newData);
    });
    setTotal(total);
    setDataList(newDataArray);
  }

  React.useEffect(() => {
    convertData(data);
  },[])

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-medium inline">Biểu đồ bán hàng</h2>
          <Tooltip title="Đơn đặt hàng hàng ngày và doanh số bán hàng ">
            <Button className="ml-2" size="small" shape="circle" icon={<QuestionOutlined />} />
          </Tooltip>
        </div>
      </div>
      <div style={{ width: "100%", height: "auto", borderRadius: "0.5rem", marginTop: "0.5rem", backgroundColor: "#FFFFFF" }}>
        <div className="mx-6 flex justify-between">
          <div className="flex justify-around">
            <ShoppingOutlined style={{ fontSize: "40px", color: "#05B171" }} className="mt-6" />
            <p className="text-3xl font-medium mt-7">{total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
          </div>
        </div>
        <div className="p-6">
          {dataList && <SaleChart data={dataList}/> }
        </div>
      </div>
    </div>
  );
}
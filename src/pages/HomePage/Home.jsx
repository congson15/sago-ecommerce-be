import React from "react";
import { SalesOrders } from "./HomePanel/SalesOrders";
import { PieStatistic } from "./HomePanel/PieStatistic";
import { RecentComment } from "./HomePanel/RecentComment";
import { BestSeller } from "./HomePanel/BestSeller";
import { TopPlace } from "./HomePanel/TopPlace";
import { ActivityOverview } from "./HomePanel/ActivityOverview";
import axiosClient from '../../api/axiosClient';
import { message, Spin } from 'antd';

export function Home(props) {


  const [isLoading, setLoading] = React.useState(true);
  const [brandData, setBrandData] = React.useState([]);
  const [countedOrders, setCountedOrders] = React.useState([]);
  const [sellingCities, setSellingCities] = React.useState([]);
  const [bestSeller, setBestSeller] = React.useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = React.useState([]);

  const convertData = (data) => {
    let newDataArray = [];
    if (Array.isArray(data)) {
      data.map(function (key, index) {
        let newData = {
          type: key,
          value: Number.parseInt(data[key])
        }
        newDataArray.push(newData);
      });
      return newDataArray;
    }
    Object.keys(data).map(function (key, index) {
      let newData = {
        type: key,
        value: Number.parseInt(data[key])
      }
      newDataArray.push(newData);
    });
    return newDataArray;
  }

  const fetchData = async (path) => {
    try {
      let result = await axiosClient.get(path);
      if (result) {
        let newBrandStatistic = convertData(result.sellingBrands);
        let newCountedOrders = convertData(result.countedOrders);
        let newSellingCities = convertData(result.sellingCities);
        let newArray = [];
        var object = new Object();
        newCountedOrders.forEach((item, index) => {
          switch (item.type) {
            case "Cancelled":
              object = {
                type: 'Đã hủy đơn',
                value: Number.parseInt(item.value),
                priority:6
              }
              newArray.push(object);
              break;
            case "Shipping":
              object = {
                type: 'Đang giao',
                value: Number.parseInt(item.value),
                priority:3
              }
              newArray.push(object);
              break;
            case "Awaiting Shipment":
              object = {
                type: 'Chuẩn bị hàng',
                value: Number.parseInt(item.value),
                priority: 2
              }
              newArray.push(object);
              break;
            case "Pending":
              object = {
                type: 'Chờ xác nhận',
                value: Number.parseInt(item.value),
                priority:1
              }
              newArray.push(object);
              break;
            case "Completed":
              object = {
                type: 'Hoàn thành',
                value: Number.parseInt(item.value),
                priority:5
              }
              newArray.push(object);
              break;
          }
        });
        newArray = newArray.sort((a,b) => a.priority-b.priority);
        setSellingCities(result.sellingCities);
        setBestSeller(result.bestSeller);
        setBrandData(newBrandStatistic);
        setCountedOrders(newArray);
        setMonthlyRevenue(result.monthlyRevenue)
        setSellingCities(newSellingCities);
        setLoading(false);
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
  }
  React.useEffect(() => {
    fetchData('/orders/statistic');
  }, [])

  return (
    <>
      {isLoading ?
        <div className="flex h-screen justify-center items-center">
          <Spin size="large" />
        </div>
        :
        <>
          <div className="my-8 w-full">
            <ActivityOverview dataList={countedOrders} />
          </div>
          <div className="grid grid-cols-2 gap-x-5">
            <PieStatistic dataList={countedOrders} title='Tổng số đơn hàng' />
            <PieStatistic dataList={brandData} title='Thương hiệu bán chạy' />
          </div>

          <div className="h-auto my-8">
            <SalesOrders data={monthlyRevenue} />
          </div>

          <div className="grid grid-cols-4 grid-rows-1 gap-x-5 mb-8">
            <RecentComment />
            <TopPlace dataList={sellingCities} />
            <BestSeller dataList={bestSeller} />
            <div className="col-span-2">
              <PieStatistic dataList={countedOrders} title='Tổng số đơn hàng' />
            </div>
          </div>
        </>
      }
    </>
  );
}

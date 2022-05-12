import React from "react";
import PropTypes from 'prop-types';
import { GoodReceiptTable } from "./components/GoodReceiptTable/GoodReceiptTable";
import NewGoodReceipt from './components/NewGoodReceipt/NewGoodReceipt';
import { message, Spin } from 'antd';
import axiosClient from "../../api/axiosClient";
import { AccessDenied } from "../../components/Common/AccessDenied";

PropTypes.PropTypes = {

};

export function GoodReceipt(props) {
  const [supplyList, setSupplyList] = React.useState([]);
  const [accessDenied, setAccessDenied] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const fetchData = async () => {
    try {
      let result = await axiosClient.get('/supply-orders?limit=10000');
      if (result) {
        let newSupplyList = result.map((item) => {
          let newItem = {
            idSupply: item.id,
            staff: item.username,
            supplier: item.supplier,
            createdAt: item.createdAt.match(/(\d{2,4}\-\d{1,2}\-\d{1,2}T(\d{2})\:(\d{2}))/)[1].replace(/(\d{4})\-(\d{2})\-(\d{2})T/, '$3/$2/$1 '),
            total: item.total
          }
          return newItem;
        })
        setSupplyList(newSupplyList);
        setLoading(false);
      }
    } catch (error) {
      message.error("Access Denied !!!");
      setAccessDenied(true);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      {
        accessDenied ? <AccessDenied /> :
          isLoading ?
            <div className="flex h-screen justify-center items-center">
              <Spin size="large" />
            </div>
            :
            <>
              <div className="flex justify-between py-5">
                <h2 className="text-xl font-medium">Phiếu nhập</h2>
                <NewGoodReceipt supplyList={supplyList} setSupplyList={setSupplyList} />
              </div>
              <GoodReceiptTable data={supplyList} />
            </>
      }
    </>
  );
}

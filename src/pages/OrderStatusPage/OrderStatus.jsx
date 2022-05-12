import React from 'react';
import PropTypes from 'prop-types';
import { OrderStatusTable } from './components/OrderStatusTable/OrderStatusTable';
import axiosClient from '../../api/axiosClient';
PropTypes.propTypes = {

};

export function OrderStatus(props) {
  const [orderStatusList, setOrderStatusList] = React.useState();

  const columns = [
    {
      title: 'Mã',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      width: '10%',
      align: 'center'
    },
    {
      title: 'Tên trạng thái',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: '20%',
      align: 'center'
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => a.description.localeCompare(b.description),
      width: '30%',
      align: 'center'
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '15%',
      align: 'center'
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '15%',
      align: 'center'
    },
  ];
  const fetchData = async (path) => {
    try {
        const response = await axiosClient.get(path);
        let newData = [];
        if (response) {
          response.forEach((item, index) => {
            let newItem = {
              id: item.id,
              name: item.name,
              description: item.description,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
            }
            newData.push(newItem);
          });
          setOrderStatusList(newData);
        }
    } catch (error) {
        console.log(error);
    }
  }
  React.useEffect(()=>{
    fetchData("/order-statuses");
  },[])
  return (
    <div>
        <div className="flex justify-between py-5">
            <h2 className="text-xl font-medium">Trạng thái đơn hàng</h2>
        </div>

        <OrderStatusTable data={orderStatusList} columns={columns}/>
    </div>
);
}

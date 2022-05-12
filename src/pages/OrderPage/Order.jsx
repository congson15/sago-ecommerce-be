import React from "react";
import PropTypes from 'prop-types';
import { OrderTable } from "./components/OrderTable/OrderTable";
import NewOrder from './components/NewOrder/NewOrder';
import { OrderFilters } from './components/OrderFilters';
import axiosClient from "../../api/axiosClient";
import { OrderButton } from './components/OrderButton';
import {

  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  CodeSandboxOutlined,
  CarOutlined,

} from "@ant-design/icons";
import { Typography, Spin, Tag, message } from "antd";
import { useRouteMatch, useHistory } from "react-router-dom";
import queryString from 'query-string'
import { AccessDenied } from "../../components/Common/AccessDenied";
PropTypes.PropTypes = {

};

const { Text } = Typography;




export function Order(props) {
  const [orderList, setOrderList] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [isFetching, setFetching] = React.useState(false);
  const [filters, setFilters] = React.useState({
    statuses: 'all',
    limit: 100
  })
  const [accessDenied, setAccessDenied] = React.useState(false);
  const handleViewInvoice = (record) => {
    history.push({
      pathname: `${match.url}/${record.id}`,
      state: { detail: record }
    })
  }
  const pushData = async (path, data) => {
    let newOrdertList = [...orderList];
    try {
      let result = await axiosClient.put(path, data, "json");
      if (result.status === 400) {
        message.error(result.data.message);
        return;
      }
      if (result.data.status === data.status) {
        newOrdertList.forEach((order) => {
          if (order.id === result.data.id) {
            order.status = data.status;
            if(data.status === 'Completed'){
              order.isFullfilled = true;
            }
          }
        })
        setOrderList(newOrdertList);
        return;
      }

    } catch (error) {
      message.error("Không có quyền chỉnh sửa");
    }
  }
  const handleOrderClick = (id, value, nextStatus) => {
    value.status = nextStatus;
    pushData(`/orders/${id}`, value);
  }


  const renderButton = (record) => {
    switch (record.status) {
      case 'Pending':
        return (
          <>
            <OrderButton orderId={record.id} handleOrderClick={handleOrderClick} nextStatus="Awaiting Shipment" icon={<CodeSandboxOutlined style={{ fontSize: "20px", marginTop: "0.8rem", color: "#53a653" }} />} />
            <OrderButton orderId={record.id} handleOrderClick={handleOrderClick} nextStatus="Cancelled" icon={<CloseOutlined style={{ fontSize: "20px", marginTop: "0.8rem", color: "#FF0000" }} />} />
            <button onClick={() => handleViewInvoice(record)}><EyeOutlined color="#0092f2" style={{ fontSize: "20px", marginTop: "0.8rem" }} /></button>
          </>
        )
      case 'Awaiting Shipment':
        return (
          <>
            <OrderButton orderId={record.id} handleOrderClick={handleOrderClick} nextStatus="Shipping" icon={<CarOutlined  style={{ fontSize: "20px", marginTop: "0.8rem", color: "#53a653" }} />} />
            <OrderButton orderId={record.id} handleOrderClick={handleOrderClick} nextStatus="Cancelled" icon={<CloseOutlined style={{ fontSize: "20px", marginTop: "0.8rem", color: "#FF0000" }} />} />
            <button onClick={() => handleViewInvoice(record)}><EyeOutlined color="#0092f2" style={{ fontSize: "20px", marginTop: "0.8rem" }} /></button>
          </>
        )
      case 'Shipping':
        return (
          <>
            <OrderButton orderId={record.id} handleOrderClick={handleOrderClick} nextStatus="Completed" icon={<CheckOutlined style={{ fontSize: "20px", marginTop: "0.8rem", color: "#53a653" }} />} />
            <OrderButton orderId={record.id} handleOrderClick={handleOrderClick} nextStatus="Cancelled" icon={<CloseOutlined style={{ fontSize: "20px", marginTop: "0.8rem", color: "#FF0000" }} />} />
            <button onClick={() => handleViewInvoice(record)}><EyeOutlined style={{ fontSize: "20px", marginTop: "0.8rem", color: "#0092f2" }} /></button>
          </>
        )
      case 'Completed':
        return (
          <>
            <button onClick={() => handleViewInvoice(record)}><EyeOutlined style={{ fontSize: "20px", marginTop: "0.8rem", color: "#0092f2" }} /></button>
          </>
        )
      default:
        return (
          <>
            <button onClick={() => handleViewInvoice(record)}><EyeOutlined style={{ fontSize: "20px", marginTop: "0.8rem", color: "#0092f2" }} /></button>
          </>
        )
    }

  }

  const history = useHistory();
  const match = useRouteMatch();
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
      align: 'center',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Họ tên',
      dataIndex: 'customer',
      key: 'customer',
      align: 'center',
      width: '10%'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '10%',
      align: 'center',
    },
    {
      title: 'Trạng thái thanh toán',
      dataIndex: 'isFullfilled',
      key: 'isFullfilled',
      width: '6%',
      align: 'center',
      render: isFullfilled => (
        isFullfilled ? <Tag color="success" > Đã thanh toán </Tag> : <Tag color="error" > Chưa thanh toán </Tag>
      )
    },
    {
      title: 'Người duyệt',
      dataIndex: 'staff',
      key: 'staff',
      width: '10%',
      align: 'center',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
      width: '5%',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.total - b.total,
      render: (total, record) => (
        <Text type={record.isFullfilled ? "success" : "danger"}>{total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</Text>
      )
    },
    {
      title: 'Hình thức thanh toán',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      align: 'center',
      width: '8%',
      render: method => (
        <Tag color="#108ee9"> {method} </Tag>
      )
    },
    {
      title: 'Ngày tạo đơn',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      align: 'center',
      width: '5%',
      render: date => (
        <Text> {date.match(/(\d{2,4}\-\d{1,2}\-\d{1,2})/)[1].replace(/(\d{4})\-(\d{2})\-(\d{2})/, '$3/$2/$1')} </Text>
      )
    },
    {
      title: 'Trạng thái đơn hàng',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '5%',
      render: status => (
        status === "Awaiting Shipment" ? <Tag color="blue" > {status} </Tag> :
          status === "Cancelled" ? <Tag color="error" > {status} </Tag> :
            status === "Shipping" ? <Tag color="processing" > {status} </Tag> :
              <Tag color="success" > {status} </Tag>
      )
    },
    {
      title: "Hành động",
      dataIndex: "action",
      align: 'center',
      width: '3%',
      render: (text, record) => (
        renderButton(record)
      ),
      width: '10%'
    }
  ];


  const fetchData = async (path) => {
    try {
      let result = await axiosClient.get(path);
      if (result) {
        setOrderList(result);
        setLoading(false);
        setFetching(false);
        return;
      }
    } catch (err) {
      setAccessDenied(true);
    }
  }


  React.useEffect(() => {
    if (filters.statuses === 'all') {
      delete filters.statuses
      setFetching(true);
      fetchData(`/orders?${queryString.stringify(filters)}`);
      return;
    }
    setFetching(true);
    fetchData(`/orders?${queryString.stringify(filters)}`);
  }, [filters])

  const handleFiltersChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters
    }))
  }

  return (
    <div>
      {
        accessDenied ? <AccessDenied /> :
          isLoading ?
            <div className="flex h-screen justify-center items-center">
              <Spin size="large" />
            </div>
            :
            <>
              <div>
                <OrderFilters filters={filters} onChange={handleFiltersChange} />
              </div>
              {isFetching ?
                <div className="flex justify-center items-center">
                  <Spin size="large" />
                </div> : <OrderTable data={orderList} columns={columns} />}
            </>
      }
    </div >
  );
}

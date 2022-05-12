import React from "react";
import PropTypes from "prop-types";
import { Input, Button } from "antd";
import { MyDataTable } from "../../../../components/Common/MyDataTable";
import { useHistory, useRouteMatch } from 'react-router-dom';
import {
  SearchOutlined,
  EyeOutlined
} from "@ant-design/icons";

GoodReceiptTable.propTypes = {
  data: PropTypes.object.isRequired,
};

export function GoodReceiptTable({ data }) {
  const match = useRouteMatch();
  const history = useHistory();
  const handleSeeMoreClick = (record) => {
    history.push({
      pathname: `${match.url}/${record.idSupply}`,
      state: { detail: record }
    })
  }
  const columns = [
    {
      title: "Mã phiếu nhập",
      dataIndex: "idSupply",
      key: "idSupply",
      width: "15%",
      align: 'center',
      sorter: (a, b) => a.idSupply - b.idSupply,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilter,
      }) => {
        return (
          <div className="flex justify-between">
            <Input
              autoFocus
              placehover="Tìm kiếm theo mã nhà cung cấp"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              type="danger"
              onClick={() => {
                clearFilter();
              }}
            >
              Sắp lại
            </Button>
          </div>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.idSupply.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Nhân viên tạo phiếu",
      dataIndex: "staff",
      key: "staff",
      width: "15%",
      align: 'center',
      sorter: (a, b) => a.idStaff - b.idStaff,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilter,
      }) => {
        return (
          <div className="flex justify-between">
            <Input
              autoFocus
              placehover="Tìm kiếm theo mã nhân viên tạo phiếu"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              type="danger"
              onClick={() => {
                clearFilter();
              }}
            >
              Sắp lại
            </Button>
          </div>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.staff.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Mã nhà cung cấp",
      dataIndex: "supplier",
      key: "supplier",
      width: "15%",
      align: 'center',
      sorter: (a, b) => a.supplier - b.supplier,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilter,
      }) => {
        return (
          <div className="flex justify-between">
            <Input
              autoFocus
              placehover="Tìm kiếm theo mã nhà cung cấp"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              type="danger"
              onClick={() => {
                clearFilter();
              }}
            >
              Sắp lại
            </Button>
          </div>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.supplier.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Ngày nhập hàng",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "20%",
      align: 'center',
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      width: "20%",
      align: 'center',
      sorter: (a, b) => a.total - b.total,
      render: total => (total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }))
    },
    {
      title: "Hành động",
      dataIndex: "action",
      align: 'center',
      render: (text, record) => (
        <div className='flex justify-center'>
          <button className="p-2" onClick={() => handleSeeMoreClick(record)}>
            <EyeOutlined style={{ fontSize: "20px" }} />
          </button>
        </div>
      ),
      width: "15%",
    },
  ];

  return (
    <div>
      <MyDataTable columns={columns} data={data}></MyDataTable>
    </div>
  );
}

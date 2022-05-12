import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from "antd";
import { MyDataTable } from '../../../../components/Common/MyDataTable';
import {
    CheckOutlined,
    CloseOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { useHistory, useRouteMatch } from 'react-router-dom';

OrderAwaitingTable.propTypes = {
    data: PropTypes.object.isRequired
};

export function OrderAwaitingTable({data}) {
    const match = useRouteMatch();
    const history = useHistory();
    const handleEditClick = (record) =>{
        console.log(record);
        history.push(`${match.url}/${record.id}`)
    }

    const columns = [
        {
            title: "Mã",
            dataIndex: "id",
            key: "id",
            width: "10%",
            align: 'center',
            sorter: (a, b) => a.id - b.id,
          },
        {
        title: "Họ và tên",
        dataIndex: "fullName",
        key: "fullName",
        width: "20%",
        align: 'center',
        sorter: (a, b) => a.fullName.localeCompare(b.fullName),
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
                placehover="Tìm kiếm theo họ và tên"
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
            return record.fullName.toLowerCase().includes(value.toLowerCase());
        },
        },
        {
        title: "Số điện thoại",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        width: "20%",
        align: 'center',
        sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
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
                placehover="Tìm kiếm theo số điện thoại"
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
            return record.phoneNumber.toLowerCase().includes(value.toLowerCase());
        },
        },
        {
        title: "Ngày lập đơn hàng",
        dataIndex: "orderDate",
        key: "orderDate",
        width: "20%",
        align: 'center',
        },
        {
            title: 'Duyệt đơn hàng',
            dataIndex: 'action',
            align: 'center',
            render: (text, record) => (
                <div>
                    <button className='p-2' onClick={() => handleEditClick(record)}>
                        <CheckOutlined style={{ fontSize: '20px', color: '#08c' }}></CheckOutlined>
                    </button>
                    <button className="mx-2 p-2">
                        <CloseOutlined style={{ fontSize: '20px',color:'rgba(239, 68, 68)'}}></CloseOutlined>
                    </button>
                </div>
            ),
            width: '20%'
        },
    ];

    return (
        <div>
            <MyDataTable columns={columns} data={data} />
        </div>
    );
}
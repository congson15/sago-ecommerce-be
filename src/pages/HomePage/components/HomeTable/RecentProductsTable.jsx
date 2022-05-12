import React from "react";
import { Input, Button } from 'antd';
import { MyDataTable } from '../../../../components/Common/MyDataTable';
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
export function RecentProductsTable ({data}) {
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
        title: "Tên sản phẩm",
        dataIndex: "name",
        key: "name",
        width: "20%",
        align: 'center',
        sorter: (a, b) => a.name.localeCompare(b.name),
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
                placehover="Tìm kiếm theo tên sản phẩm"
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
        title: "Kho",
        dataIndex: "stock",
        key: "stock",
        width: "20%",
        align: 'center',
        sorter: (a, b) => a.stock.localeCompare(b.stock),
        // render: stock => (
        //     <>
        //         {stock.map(s => {
        //             let color = s.length > 5 ? 'white' : 'white';
        //             if (s === 'Còn hàng') {
        //                 color = 'green';
        //             } else {
        //                 color = 'red';
        //             }
        //             return (
        //                 <p style={{color: color}}>{s}</p>
        //             );
        //         })}
        //     </>
        // ),
        },
        {
            title: "Đơn giá",
            dataIndex: "price",
            key: "price",
            width: "20%",
            align: 'center',
            sorter: (a, b) => a.price - b.price,
        },
        {
        title: "Hành động",
        dataIndex: "action",
        key: "action",
        width: "20%",
        align: 'center',
        render: (text, record) => (
            <div>
                <button className="p-2">
                    <EllipsisOutlined style={{ fontSize: '20px'}}/>
                </button>
            </div>
        ),
        },
    ];
    return (
        <div>
            <MyDataTable columns={columns} data={data} />
        </div>
    );
}
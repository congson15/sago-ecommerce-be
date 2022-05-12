import React from "react";
import { Table } from 'antd';


export function InvoiceProductTable({data}) {
    const columns = [
        {
            title: 'STT',
            dataIndex: 'number',
            key: 'number',
            width: '10%',
            align: 'center'
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            width: '50%',
            align: 'center'
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            key: 'amount',
            width: '10%',
            align: 'center'
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            width: '15%',
            align: 'center'
        },
        {
            title: 'Tạm tính',
            dataIndex: 'subTotal',
            key: 'subTotal',
            width: '15%',
            align: 'center'
        },
    ];
    return (
        <div className='mt-24'>
            <Table pagination={false} bordered={true} dataSource={data} columns={columns}/>
        </div>
    );
}
import React from "react";
import { Table } from 'antd';


export function InvoiceProductTable({data, columns}) {
    return (
        <div className='mt-24'>
            <Table pagination={false} bordered={true} dataSource={data} columns={columns}/>
        </div>
    );
}
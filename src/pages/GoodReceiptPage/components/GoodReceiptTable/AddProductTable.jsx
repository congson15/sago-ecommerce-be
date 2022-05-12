import React from 'react';
import { MyDataTable } from '../../../../components/Common/MyDataTable';
import { PlusOutlined } from '@ant-design/icons';

export function AddProductTable({productList}){
    const columns = [
        {
            title: 'Mã sản phẩm',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
            align: 'center',
            sorter: (a, b) => a.idProduct.localeCompare(b.idProduct)
        },
        {

            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
            align: 'center',
            sorter: (a, b) => a.idProduct.localeCompare(b.idProduct)
        },
        {
            title: 'Kích cỡ',
            dataIndex: 'size',
            key: 'size',
            width: '10%',
            align: 'center',
            sorter: (a, b) => a.sizeProduct - b.sizeProduct
        },
        {
            title: 'Màu sắc',
            dataIndex: 'color',
            key: 'color',
            width: '10%',
            align: 'center',
            sorter: (a, b) => a.idProduct.localeCompare(b.idProduct)
        },
        {
            title: "Hành động",
            dataIndex: "actionProduct",
            key: 'action',
            width: '15%',
            align: 'center',
            render: (text, record) => (
                <div>
                    <button className="p-2" /*onClick={() => handleEditClick(record)}*/>
                        <PlusOutlined style={{ fontSize: '20px', color: '#4CAF50' }}/>
                    </button>
                </div>
            ),
        }
    ];

    const data = [
        {
            idProduct: '1',
            nameProduct: 'Nike air',
            sizeProduct: 38,
            colorProduct: 'Đỏ',
        },
        {
            idProduct: '2',
            nameProduct: 'Vans',
            sizeProduct: 40,
            colorProduct: 'Đen',
        },
        {
            idProduct: '3',
            nameProduct: 'Bitis',
            sizeProduct: 41,
            colorProduct: 'Xanh',
        },
    ];

    return (
        <div>
            <MyDataTable columns={columns} data={data}/>
        </div>
    );
}
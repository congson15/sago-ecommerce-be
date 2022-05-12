import React from 'react';
import { MyDataTable } from '../../../../components/Common/MyDataTable';
import { MinusOutlined } from '@ant-design/icons';

export function AddedProductTable(props){
    const columns = [
        {
            title: 'Mã sản phẩm',
            dataIndex: 'idProduct',
            key: 'idProduct',
            width: '15%',
            align: 'center',
            sorter: (a, b) => a.idProduct.localeCompare(b.idProduct)
        },
        {

            title: 'Tên sản phẩm',
            dataIndex: 'nameProduct',
            key: 'nameProduct',
            width: '15%',
            align: 'center',
            sorter: (a, b) => a.idProduct.localeCompare(b.idProduct)
        },
        {
            title: 'Kích cỡ',
            dataIndex: 'sizeProduct',
            key: 'sizeProduct',
            width: '10%',
            align: 'center',
            sorter: (a, b) => a.sizeProduct - b.sizeProduct
        },
        {
            title: 'Màu sắc',
            dataIndex: 'colorProduct',
            key: 'colorProduct',
            width: '10%',
            align: 'center',
            sorter: (a, b) => a.idProduct.localeCompare(b.idProduct)
        },
        {
            title: 'Đơn giá',
            dataIndex: 'priceProduct',
            key: 'priceProduct',
            width: '15%',
            align: 'center',
            sorter: (a, b) => a.priceProduct - b.priceProduct
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantityProduct',
            key: 'quantityProduct',
            width: '10%',
            align: 'center',
            sorter: (a, b) => a.quantityProduct - b.quantityProduct
        },
        {
            title: 'Tạm tính',
            dataIndex: 'provCalcProduct',
            key: 'provCalcProduct',
            width: '15%',
            align: 'center',
            sorter: (a, b) => a.provCalcProduct.localeCompare(b.provCalcProduct)
        },
        {
            title: "Hành động",
            dataIndex: "actionProduct",
            key: 'action',
            width: '10%',
            align: 'center',
            render: (text, record) => (
                <div>
                    <button className="p-2" /*onClick={() => handleEditClick(record)}*/>
                        <MinusOutlined style={{ fontSize: '20px', color: '#F37373' }}/>
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
            priceProduct: 1500000,
            quantityProduct: 10,
            provCalcProduct: 15000000,
        },
        {
            idProduct: '2',
            nameProduct: 'Vans',
            sizeProduct: 40,
            colorProduct: 'Đen',
            priceProduct: 1500000,
            quantityProduct: 20,
            provCalcProduct: 30000000,
        },
        {
            idProduct: '3',
            nameProduct: 'Bitis',
            sizeProduct: 41,
            colorProduct: 'Xanh',
            priceProduct: 1000000,
            quantityProduct: 20,
            provCalcProduct: 20000000,
        },
    ];

    return (
        <div>
            <MyDataTable columns={columns} data={data}/>
        </div>
    );
}
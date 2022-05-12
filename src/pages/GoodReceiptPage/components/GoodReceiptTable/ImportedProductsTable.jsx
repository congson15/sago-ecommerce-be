import React from 'react';
import PropTypes from 'prop-types';
import { MyDataTable } from '../../../../components/Common/MyDataTable';

ImportedProductsTable.propTypes = {
    data: PropTypes.array.isRequired
};



export function ImportedProductsTable({data}) {

    const columns = [
        {

            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
            width: '15%',
            align: 'center',
            sorter: (a, b) => a.idProduct.localeCompare(b.idProduct),
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            width: '15%',
            align: 'center',
            sorter: (a, b) => a.priceProduct - b.priceProduct,
            render: (text,record) => text.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '15%',
            align: 'center',
            sorter: (a, b) => a.quantityProduct - b.quantityProduct
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
            width: '15%',
            align: 'center',
            sorter: (a, b) => a.idProduct.localeCompare(b.idProduct),
        },
        {
            title: "Tạm tính",
            dataIndex: "provCalcProduct",
            key: 'provCalcProduct',
            width: '15%',
            align: 'center',
            sorter: (a, b) => a.provCalcProduct - b.provCalcProduct,
            render: (text, record) => (Number.parseInt(record.quantity) * Number.parseInt(record.price)).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        }
    ];


    return (
        <div>
            <MyDataTable columns={columns} data={data}/>
        </div>
    );
}

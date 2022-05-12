import React from 'react';
import PropTypes from 'prop-types';
import { ProductTable } from './components/ProductTable/ProductTable';
import { ProductFilters } from './components/ProductFilters';
import axiosClient from '../../api/axiosClient';
import {
    EditOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { Spin, Input, Button, message } from 'antd';
import { useHistory, useRouteMatch } from 'react-router';
import queryString from 'query-string'
PropTypes.propTypes = {

};


export function Products(props) {

    const match = useRouteMatch();
    const history = useHistory();

    const [productList, setProductList] = React.useState();
    const [isLoading, setLoading] = React.useState(true);
    const [filters, setFilters] = React.useState({
        statuses:'stock',
        limit: 10000
    })
    React.useEffect(() => {
        if (filters.brands === "other") {
            delete filters.brands;
            fetchData(`/products?${queryString.stringify(filters)}`);
            return;
        }
        fetchData(`/products?${queryString.stringify(filters)}`);
    }, [filters])

    const columns = [
        {
            title: 'Mã',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
            align: 'center',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilter }) => {
                return (
                    <div className="flex justify-between">
                        <Input
                            autoFocus
                            placehover="Tìm kiếm theo tên"
                            value={selectedKeys[0]}
                            onChange={(e) => {
                                setSelectedKeys(e.target.value ? [e.target.value] : [])
                                confirm({ closeDropdown: false })
                            }}
                            onPressEnter={() => {
                                confirm()
                            }}
                            onBlur={() => {
                                confirm()
                            }}
                        ></Input>
                    </div>
                );
            },
            filterIcon: () => {
                return <SearchOutlined />
            },
            onFilter: (value, record) => {
                return record.name.toLowerCase().includes(value.toLowerCase())
            },
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            width: '15%',
            align: 'center',
            sorter: (a, b) => Number.parseInt(a.price.replace(/\./, "").replace('VND', '')) - Number.parseInt(b.price.replace(/\./, "").replace('VND', ''))
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '10%',
            align: 'center',
            sorter: (a, b) => Number.parseInt(a.quantity) - Number.parseInt(b.quantity)
        },
        {
            title: "Hành động",
            dataIndex: "action",
            align: 'center',
            render: (text, record) => (
                <div>
                    <button className="p-2" onClick={() => handleEditClick(record)}>
                        <EditOutlined style={{ fontSize: '20px', color: '#08c' }} />
                    </button>
                </div>
            ),
            width: '10%'
        }
    ];

    const handleEditClick = (record) => {
        history.push(`${match.url}/edit/${record.id}`)
    }

    const fetchData = async (path) => {
        try {
            let response = await axiosClient.get(path);
            let newData = [];
            if (response) {
                localStorage.setItem("productList",JSON.stringify(response));
                if (filters.statuses === 'stock') {
                    response = response.filter(item => item.inStock > 0);
                }
                else {
                    response = response.filter(item => item.inStock === 0);
                }
                response.forEach((item, index) => {
                    let newItem = {
                        id: item.id,
                        name: item.name,
                        price: item.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }),
                        quantity: item.inStock
                    }
                    newData.push(newItem);
                })
                setProductList(newData);
                setLoading(false);
            }
        }
        catch (error) {
            message.error("Đã xảy ra lỗi, vui lòng thử lại sau.");
        }
    }



    const handleFiltersChange = (newFilters) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilters
        }))
    }
    return (
        <>
            {isLoading ?
                <div className="flex h-screen justify-center items-center">
                    <Spin size="large" />
                </div>
                :
                <div>
                    <div className="flex justify-between py-5">
                        <h2 className="text-xl font-medium">Sản phẩm ({productList.length})</h2>
                        <button
                            onClick={() => history.push(history.push(`${match.url}/add`))}
                            className="text-gray-50 bg-blue-400 hover:bg-blue-500 p-2 rounded">
                            Thêm sản phẩm
                        </button>
                    </div>
                    <div>
                        <ProductFilters filters={filters} onChange={handleFiltersChange} />
                    </div>
                    <ProductTable data={productList} columns={columns} />
                </div>
            }
        </>
    );
}


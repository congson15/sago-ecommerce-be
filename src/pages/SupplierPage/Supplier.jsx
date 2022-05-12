import React from 'react';
import PropTypes from 'prop-types';
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { SupplierTable } from './components/SupplierTable/SupplierTable';
import NewSupplier from './components/NewSupplier/NewSupplier';
import axiosClient from '../../api/axiosClient';
import { useHistory, useRouteMatch } from 'react-router';
PropTypes.propTypes = {

};

export function Supplier(props) {
    const [supplierList, setSupplierList] = React.useState();
    const match = useRouteMatch();
    const history = useHistory();
    const columns = [
        {
            title: 'Mã',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            width: '10%'
        },
        {
            title: 'Tên nhà cung cấp',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: '25%'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
            width: '25%'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
            width: '30%'
        },
    ];

    const handleEditClick = (record) => {
        history.push(`${match.url}/${record.id}`)
    }

    const fetchData = async (path) => {
        try {
            const response = await axiosClient.get(path);
            let newData = [];
            if (response) {
                response.forEach((item, index) => {
                    let newItem = {
                        id: item.id,
                        name: item.name,
                        phoneNumber: item.phoneNumber,
                        email: item.email
                    }
                    newData.push(newItem);
                })
                setSupplierList(newData);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        fetchData("/suppliers");
    }, [])

    return (
        <div>
            <div className="flex justify-between py-5">
                <h2 className="text-xl font-medium">Nhà cung cấp</h2>
                <NewSupplier supplierList={supplierList} setSupplierList={setSupplierList} />
            </div>

            <SupplierTable data={supplierList} columns={columns} />
        </div>
    );
}

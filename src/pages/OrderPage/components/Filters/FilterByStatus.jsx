import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd'

const { Option } = Select;

FilterByStatus.propTypes = {
    currentStatus: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

export function FilterByStatus({ currentStatus, onChange }) {

    const handleFilterChange = (newStatus) => {
        let status = {
            statuses: newStatus
        }
        onChange(status);
    }
    return ( 
        <div className="flex items-center mx-5">
            <h2 className="mr-2 mt-0.5">Trạng thái đơn hàng</h2>
            <Select
                onChange={handleFilterChange}
                defaultValue={currentStatus}
                showSearch
                style={{ width: 120 }}
                placeholder="Tìm kiếm"
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                
                <Option value="pending">Pending</Option>
                <Option value="awaiting shipment">Awaiting Shipment</Option>
                <Option value="shipping">Shipping</Option>
                <Option value="completed">Completed</Option>
                <Option value="cancelled">Cancelled</Option>
                <Option value="all">All</Option>
            </Select>
        </div>
    );
}

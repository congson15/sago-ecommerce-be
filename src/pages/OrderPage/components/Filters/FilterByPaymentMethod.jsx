import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd'

const { Option } = Select;

FilterByPaymentMethod.propTypes = {
    currentMethod: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

export function FilterByPaymentMethod({ currentMethod, onChange }) {

    const handleFilterChange = (newStatus) => {
        let status = {
            _status: newStatus
        }
        onChange(status);
    }
    return ( 
        <div className="flex items-center mx-5">
            <h2 className="mr-2 mt-0.5">Hình thức thanh toán</h2>
            <Select
                onChange={handleFilterChange}
                defaultValue={currentMethod}
                showSearch
                style={{ width: 120 }}
                placeholder="Tìm kiếm"
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="online">Online</Option>
                <Option value="cod">COD</Option>
            </Select>
        </div>
    );
}

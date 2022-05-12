import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd'

const { Option } = Select;

FilterByStatus.propTypes = {
    currentStatus: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

function FilterByStatus({ currentStatus, onChange }) {

    const handleFilterChange = (newStatus) => {
        let status = {
            statuses: newStatus
        }
        onChange(status);
    }
    return ( 
        <div className="flex items-center mx-5">
            <h2 className="mr-2">Trạng thái</h2>
            <Select
                onChange={handleFilterChange}
                defaultValue={currentStatus}
                showSearch
                style={{ width: 110 }}
                placeholder="Tìm kiếm"
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="stock">Còn hàng</Option>
                <Option value="outOfStock">Hết hàng</Option>
            </Select>
        </div>
    );
}

export default FilterByStatus;

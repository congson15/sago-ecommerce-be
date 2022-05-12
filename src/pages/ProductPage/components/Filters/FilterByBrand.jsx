import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd'

const { Option } = Select;

FilterByBrand.propTypes = {
    currentBrand: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

function FilterByBrand({ currentBrand, onChange, brandList }) {
    console.log(currentBrand);
    const handleBrandChange = (newBrand) => {
        let brand = {
            brands:newBrand.replace(/\s/g,'-')
        }
        onChange(brand);
    }
    return ( 
        <div className="flex items-center mx-5">
            <h2 className="mr-2">Thương hiệu</h2>
            <Select
                onChange={handleBrandChange}
                defaultValue={currentBrand}
                showSearch
                style={{ width: 110 }}
                placeholder="Tìm kiếm"
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {brandList.map((item, index) => <Option key={item.id} value={item.name.toLowerCase()}>{item.name}</Option>)}
            </Select>
        </div>
    );
}

export default FilterByBrand;

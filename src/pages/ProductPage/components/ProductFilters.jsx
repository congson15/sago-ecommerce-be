import React from 'react';
import PropTypes from 'prop-types';
import FilterByStatus from './Filters/FilterByStatus';
import FilterByBrand from './Filters/FilterByBrand';
import axiosClient from '../../../api/axiosClient';

ProductFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func,
};



export function ProductFilters({ filters, onChange }) {

    const [brandList, setBrandList] = React.useState();

    const fetchData = async () => {
        try {
        
            const response = await axiosClient.get("/brands");
            if (response) {
                setBrandList(response);
            }
        }
        catch (error) {
            
        }
    }

    React.useEffect(() => {
        fetchData();
    },[])

    const handleChange = (newFilters) => {
        onChange(newFilters);
    }


    return (
        <div className="flex py-5 my-5">
                {brandList && <FilterByBrand currentBrand={filters.brands} onChange={handleChange} brandList={brandList} /> }
                <FilterByStatus currentStatus={filters.statuses} onChange={handleChange} />
        </div>
    );
}

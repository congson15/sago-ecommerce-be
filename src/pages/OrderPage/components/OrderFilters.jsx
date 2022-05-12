import React from 'react';
import PropTypes from 'prop-types';
import { FilterByStatus } from './Filters/FilterByStatus';
import { FilterByPaymentMethod } from './Filters/FilterByPaymentMethod';
import { FilterByDateTime } from './Filters/FilterByDateTime';


OrderFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func,
};



export function OrderFilters({ filters, onChange }) {

    const handleChange = (newFilters) => {
        onChange(newFilters);
    }


    return (
        <div className="flex py-5 my-5">
            <FilterByStatus currentStatus={filters.statuses} onChange={handleChange} />
            {/* <FilterByPaymentMethod currentMethod={filters._status} onChange={handleChange} /> */}
            <FilterByDateTime onChange={handleChange}/>
        </div>
    );
}

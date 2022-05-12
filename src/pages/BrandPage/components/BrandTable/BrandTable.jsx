import React from 'react';
import PropTypes from 'prop-types';
import { MyDataTable } from '../../../../components/Common/MyDataTable';
BrandTable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired
};

export function BrandTable({data, columns}) {
    return (
        <div>
            <MyDataTable columns={columns} data={data}/>
        </div>
    );
}
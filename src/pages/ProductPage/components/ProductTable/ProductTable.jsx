import React from 'react';
import PropTypes from 'prop-types';
import { MyDataTable } from '../../../../components/Common/MyDataTable';
ProductTable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired
};

export function ProductTable({data, columns}) {
    return (
        <div>
            <MyDataTable columns={columns} data={data}/>
        </div>
    );
}

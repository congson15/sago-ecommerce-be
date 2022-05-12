import React from 'react';
import PropTypes from 'prop-types';
import { MyDataTable } from '../../../../components/Common/MyDataTable';

OrderStatusTable.propTypes = {
    data: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
};

export function OrderStatusTable({data, columns}) {

    return (
        <div>
            <MyDataTable columns={columns} data={data}/>
        </div>
    );
}
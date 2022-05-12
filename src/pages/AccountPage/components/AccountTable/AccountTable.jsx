import React from 'react';
import PropTypes from 'prop-types';
import { MyDataTable } from '../../../../components/Common/MyDataTable';

AccountTable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired
};

export function AccountTable({data,columns}) {
    return (
        <div>
            <MyDataTable columns={columns} data={data}/>
        </div>
    );
}
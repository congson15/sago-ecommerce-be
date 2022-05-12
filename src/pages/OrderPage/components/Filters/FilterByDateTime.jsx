import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;

FilterByDateTime.propTypes = {

};
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
export function FilterByDateTime({onChange}) {
    const handleFilterChange = (date,dateString) => {
        let status = {
            from: dateString[0],
            to: dateString[1]
        }
        console.log(status);
        onChange(status);
    }
    return (
        <>
            <div className="flex items-center mx-5">
                <h2 className="mx-2 mt-0.5">Ngày tạo đơn </h2>
                <RangePicker
                    onChange={handleFilterChange}
                    defaultValue={moment('01/01/2021', dateFormatList[0])} format={dateFormatList}
                    disabled={[false, true]}
                />
            </div>

        </>
    );
}


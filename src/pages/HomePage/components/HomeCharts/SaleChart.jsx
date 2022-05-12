import React from 'react';
import { Line } from '@ant-design/charts';

export function SaleChart(props) {

    const { data } = props;

    const config = {
        data,
        padding: 'auto',
        xField: 'type',
        yField: 'sales',
        xAxis: {
          // type: 'timeCat',
          tickCount: 12,
        },
      };
    return <Line {...config} />
}
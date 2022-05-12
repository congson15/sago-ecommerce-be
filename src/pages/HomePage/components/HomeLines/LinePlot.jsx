import React from 'react';
import { TinyLine } from '@ant-design/charts';

export function LinePlot({width, height, lineWidth}) {
  const data = [25, 66, 41, 89, 63, 30, 50];
  const config = {
    width: width,
    height: height,
    lineStyle: {
        lineWidth: lineWidth,
    },
    autoFit: false,
    data,
    smooth: true,
  };
  return <TinyLine {...config} />;
};
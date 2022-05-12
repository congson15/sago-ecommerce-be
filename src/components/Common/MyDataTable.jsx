import React from "react";
import { Table } from "antd";


export const MyDataTable = (props) => {
  const {columns, data} = props
  return <Table dataSource={data} columns={columns} />;
};

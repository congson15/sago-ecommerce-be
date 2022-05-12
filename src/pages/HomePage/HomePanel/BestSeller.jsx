import React from "react";
import { MyDataTable } from "../../../components/Common/MyDataTable";

export function BestSeller(props) {

  const { dataList } = props;

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
    }
  ];
  return (
    <div className='h-auto row-span-2 col-span-2'>
      <div className='bg-white pt-2 px-2 pb-4 rounded-xl' style={{ height: "100%" }}>
        <div className="flex justify-between my-2">
          <h2 className="text-2xl font-medium pl-4">Top {dataList.length} sản phẩm bán chạy</h2>
        </div>
        <div className="mt-4">
          <MyDataTable data={dataList} columns={columns} />
        </div>

      </div>

    </div>
  );
}
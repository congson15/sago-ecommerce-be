import React from "react";

export function TopPlace(props) {
  const { dataList } = props;
  return (
    <div className='h-auto' style={{ height: "300px" }}>
      <div className='bg-white pt-2 px-2 pb-4 rounded-xl' style={{ height: "100%" }}>
        <div className="flex justify-between mt-2">
          <h2 className="text-2xl font-medium pl-4">Nơi mua nhiều nhất</h2>
        </div>
        {dataList.map(data => {
          return (
            <>
              <div className='flex justify-between mx-5 mt-3'>
                <p className='text-xl'>{data.type}</p>
              </div>
              <div className='bg-gray-400 m-auto' style={{ width: '90%', height: '0.5px' }}></div>
            </>
          )
        })}
      </div>
    </div>
  );
}
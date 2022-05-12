import React from 'react';
import { SingleActivity } from '../components/SingleActivity';
import {
  SmileOutlined,
  FrownOutlined,
  CheckOutlined,
  CarOutlined,
  DropboxOutlined
} from "@ant-design/icons";

export function ActivityOverview(props) {
  let { dataList } = props

  const renderActivity = () => {
    return (dataList.map((data) => {
      console.log(data);
      let icon = <SmileOutlined style={{ fontSize: "45px", color: '#73d13d' }} />;
      let title = "Hoàn thành";
      let detail = `${data.value}`;
      switch (data.type) {
        case "Đã hủy đơn":
          icon = <FrownOutlined style={{ fontSize: "45px", color: '#f5222d' }} />
          title = data.type;
          detail = `${data.value}`;
          break;
        case 'Đang giao':
          icon = <CarOutlined style={{ fontSize: "45px", color: '#ffec3d' }} />
          title = data.type
          detail = `${data.value}`;
          break;
        case "Chuẩn bị hàng":
          icon = <DropboxOutlined style={{ fontSize: "45px", color: '#9254de' }} />
          title = data.type;
          detail = `${data.value}`;
          break;
        case "Chờ xác nhận":
          icon = <CheckOutlined style={{ fontSize: "45px", color: '#40a9ff' }} />
          title = data.type
          detail = `${data.value}`;
          break;
      }
      return (
        <SingleActivity
          icon={icon}
          title={title}
          detail={detail}
        />
      )
    })
    )
  }

  return (
    <div>
      <p className='text-2xl font-medium mb-4'>Tổng quan hoạt động</p>
      <div className='grid grid-cols-5 gap-x-5'>
        {renderActivity()}
      </div>
    </div>
  );
}
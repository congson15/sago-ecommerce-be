import React from 'react';
import PropTypes from 'prop-types';
import { ColorTable } from './components/ColorTable/ColorTable';
import NewColor from './components/NewColor/NewColor';
import axiosClient from '../../api/axiosClient';
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { useHistory, useRouteMatch } from 'react-router-dom';

PropTypes.propTypes = {

};

export function Color() {
  const [colorList, setColorList] = React.useState();
  const match = useRouteMatch();
  const history = useHistory();
  const handleEditClick = (record) =>{
      console.log(record);
      history.push(`${match.url}/${record.id}`)
  }
  const [flag, setFlag] = React.useState(true);
    const handleEdit = () =>{
      if(flag){
        setFlag(false)
      }else{
        setFlag(true)
      }
  }
  const columns = [
    {
      title: 'Mã',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: '15%',
    },
    {
      title: 'Màu sắc',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: '65%',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      align: 'center',
      render: (text, record) => (
        <div>
          <button className='p-2' onClick={() => handleEditClick(record)}>
            <EditOutlined style={{ fontSize: '20px', color: '#08c' }}></EditOutlined>
          </button>
          <button className="mx-2 p-2">
            <DeleteOutlined style={{ fontSize: '20px',color:'rgba(239, 68, 68)'}}></DeleteOutlined>
          </button>
        </div>
      ),
      width: '20%'
    },
  ];
  const fetchData = async (path) => {
    try {
      const response = await axiosClient.get(path);
      let newData = [];
      if (response) {
        response.forEach((item, index) => {
          let newItem = {
            id: item.id,
            name: item.name,
          }
          newData.push(newItem);
        });
        setColorList(newData);
      }
    } catch (error) {
        console.log(error);
    }
  }
  React.useEffect(()=>{
    fetchData("/colors");
  },[flag]);
  return (
      <div>
          <div className="flex justify-between py-5">
              <h2 className="text-xl font-medium">Màu sắc</h2>
              <NewColor handleEdit={handleEdit}/>
          </div>

          <ColorTable data={colorList} columns={columns}/>
      </div>
  );
}

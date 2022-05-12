import * as React from "react";
import PropTypes from 'prop-types';
import { SizeTable } from './components/SizeTable/SizeTable';
import NewSize from './components/NewSize/NewSize';
import axiosClient from "../../api/axiosClient";
import { Input, Button } from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { useHistory, useRouteMatch } from 'react-router';
PropTypes.propTypes = {

}; 

export function Size(props) {
  const [sizeList, setSizeList] = React.useState();
  const match = useRouteMatch();
  const history = useHistory();
  const [flag,setFlag] = React.useState(true);
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
        width: '10%',
        align: 'center',
        sorter: (a, b) => a.id - b.id
    },
    {
        title: 'Kích cỡ',
        dataIndex: 'name',
        key: 'name',
        width: '60%',
        align: 'center',
        sorter: (a, b) => a.name.localeCompare(b.name),
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilter}) => {
            return (
              <div className="flex justify-between">
                <Input
                autoFocus
                placehover="Tìm kiếm theo kích cỡ"
                value = {selectedKeys[0]}
                onChange = {(e) => {
                  setSelectedKeys(e.target.value ? [e.target.value] : [])
                  confirm({closeDropdown:false})
                }}
                onPressEnter = {() => {
                  confirm()
                }}
                onBlur = {() => {
                  confirm()
                }}
                ></Input>
                <Button type="danger" onClick = {() => {clearFilter();}}>Sắp lại</Button>
              </div>
            );
        },
        filterIcon: () => {
            return <SearchOutlined />
        },
        onFilter: (value, record) => {
            return record.name.toLowerCase().includes(value.toLowerCase())
        },
    },
    {
        title: "Hành động",
        dataIndex: "action",
        align: 'center',
        render: (text, record) => (
            <div>
                <button className="p-2" onClick={() => handleEditClick(record)}>
                    <EditOutlined style={{ fontSize: '20px', color: '#08c' }}/>
                </button>
                <button className="mx-2 p-2">
                    <DeleteOutlined style={{ fontSize: '20px',color:'rgba(239, 68, 68)'}}/>
                </button>
            </div>
        ),
        width: '20%'
    }
  ];
  const handleEditClick = (record) =>{
    console.log(record);
    history.push(`${match.url}/${record.id}`)
  }

  const fetchData = async (path) => {
    try {
      const response = await axiosClient.get(path);
      let newData = [];
      if (response) {
        response.forEach((item, index) => {
          let newItem = {
            id: item.id,
            name: item.name
          }
          newData.push(newItem);
        });
        setSizeList(newData);
      }
    } catch (error) {
        console.log(error);
    }
  }
  React.useEffect(() => {
    fetchData("/sizes");
  }, [flag]);
  return (
    <div>
      <div className="flex justify-between py-5">
        <h2 className="text-xl font-medium">Kích cỡ</h2>
        <NewSize handleEdit={handleEdit}/>
      </div>
      
      <SizeTable data={sizeList} columns={columns}/>
    </div>
  );
}

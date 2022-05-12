import React from "react";
import PropTypes from "prop-types";
import { Spin, Input } from "antd";
import { AccountTable } from "./components/AccountTable/AccountTable";
import NewAccount from "./components/NewAccount/NewAccount";
import axiosClient from "../../api/axiosClient";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { useHistory, useRouteMatch } from "react-router-dom";
import { AccountEditing } from "./components/AccountEditing";
import { AccessDenied } from "../../components/Common/AccessDenied";
PropTypes.propTypes = {};

export function Account(props) {
  const [accountList, setAccountList] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const [accessDenied, setAccessDenied] = React.useState(false);
  const [isOpen, setOpen] = React.useState(false);
  const [account, setAccount] = React.useState({
    username: "",
    fullname: "",
    password: "",
    role: "",
  });
  const match = useRouteMatch();
  const history = useHistory();
  //Sua quyen //warehouse
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      width: "5%",
      align: "center",
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
      width: "30%",
      align: "center",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilter }) => {
        return (
          <div className="flex justify-between">
            <Input
              autoFocus
              placehover="Tìm kiếm theo tên"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : [])
                confirm({ closeDropdown: false })
              }}
              onPressEnter={() => {
                confirm()
              }}
              onBlur={() => {
                confirm()
              }}
            ></Input>
          </div>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value, record) => {
        return record.username.toLowerCase().includes(value.toLowerCase())
      },
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      width: "25%",
      align: "center",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilter }) => {
        return (
          <div className="flex justify-between">
            <Input
              autoFocus
              placehover="Tìm kiếm theo tên"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : [])
                confirm({ closeDropdown: false })
              }}
              onPressEnter={() => {
                confirm()
              }}
              onBlur={() => {
                confirm()
              }}
            ></Input>
          </div>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value, record) => {
        return record.fullname.toLowerCase().includes(value.toLowerCase())
      },
    },
    {
      title: "Loại tài khoản",
      dataIndex: "roleName",
      key: "roleName",
      sorter: (a, b) => a.roleName.localeCompare(b.roleName),
      width: "25%",
      align: "center",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <button className="p-2">
            <EditOutlined
              style={{ fontSize: "20px", color: "#08c" }}
              onClick={() => handleEditingClick(record)}
            ></EditOutlined>
          </button>
        </div>
      ),
      width: "10%",
      align: "center",
    },
  ];
  const handleEditingClick = (record) => {
    setAccount({
      id: record.id,
      username: record.username,
      fullname: record.fullName,
      role: record.roleName,
    });
    setOpen(true);
  };
  const fetchData = async () => {
    try {
      let result = await axiosClient.get(`/staffs`);
      if (result) {
        setAccountList(result);
        setLoading(false);
      }
    } catch (error) {
      setAccessDenied(true);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {

        accessDenied ? <AccessDenied /> :
          isLoading ?
            <div className="flex h-screen justify-center items-center">
              <Spin size="large" />
            </div>
            :
            <>
              <div className="flex justify-between py-5">
                <h2 className="text-xl font-medium">Tài khoản nhân viên</h2>
                <NewAccount />
              </div>
              <AccountEditing isOpen={isOpen} account={account} accountList={accountList} setAccountList={setAccountList} setOpen={setOpen} />
              <AccountTable data={accountList} columns={columns} />
            </>
      }
    </div>
  );
}

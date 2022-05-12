import React from "react";
import PropTypes from "prop-types";
import { Modal, Select, Form, Input, Button, message } from "antd";
import axiosClient from "../../../api/axiosClient";
PropTypes.propTypes = {};

const { Option } = Select;
export function AccountEditing({ isOpen, setOpen, account, accountList, setAccountList }) {
  const [form] = Form.useForm();
  form.setFieldsValue({
    username: account.username,
    fullname: account.fullname,
    role: account.role,
  });
  const onFinish = async (values) => {
    try {
      let result = await axiosClient.put(`/staffs/${account.id}`, values);
      if (result.status === 201) {
        let newAccountList = [...accountList];
        message
          .loading('Đang tiến hành cập nhật tài khoản....', 0.5)
          .then(() => {
            newAccountList.forEach((account) => {
              if (account.username === result.data.username) {
                account.roleName = result.data.roleName;
              }

            })
            setAccountList(newAccountList);
            setOpen(false);
            message.success('Cập nhật tài khoản thành công', 1.5)
          });
      }
      return;
    } catch (error) {
      console.log(error);
    }

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        width={500}
        title="Chỉnh sửa tài khoản nhân viên"
        visible={isOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input disabled/>
          </Form.Item>
          <Form.Item
            label="Họ và tên"
            name="fullname"
            rules={[
              {
                required: true,
                message: 'Please input your fullname!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="role"
            label="Chọn quyền"
          >
            <Select
              style={{ width: "100%" }}
              value={account.role}
            >
              <Option key="Warehouse" value="Warehouse">
                Warehouse
              </Option>
              <Option key="Sale" value="Sale">
                Sale
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

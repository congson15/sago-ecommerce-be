import React from "react";
import { Input, Modal, Select, Form, message, Button } from "antd";
import axiosClient from "../../../../api/axiosClient";

NewAccount.propTypes = {};

const { Option } = Select;

function NewAccount(props) {
  const [form] = Form.useForm();
  const [isOpen, setOpen] = React.useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const onFinish = async (values) => {
    try {
      let result = await axiosClient.post(`/staffs`, values);
      console.log(result);
      if(result.data === 'username exists'){
        message.error("Tên tài khoản đã tồn tại");
        return;
      }
      if (result.status === 201) {
        message
          .loading('Đang tiến hành tạo tài khoản....', 0.2)
          .then(() => message.success('Tạo tài khoản thành công', 1.5));
        setOpen(false);
      }
      return;
    } catch (error) {
      message.warn("Vui lòng thử lại sau");
    }

  };


  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div>
      <button
        onClick={showModal}
        className="text-gray-50 bg-blue-400 hover:bg-blue-500 p-2 rounded"
      >
        Thêm tài khoản nhân viên
      </button>
      <Modal
        width={500}
        title="Thêm tài khoản nhân viên"
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
          autoComplete="on"
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
            <Input />
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

export default NewAccount;

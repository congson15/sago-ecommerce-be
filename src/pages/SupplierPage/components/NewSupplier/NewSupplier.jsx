import React from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import axiosClient from '../../../../api/axiosClient';

NewSupplier.propTypes = {

};

function NewSupplier({supplierList, setSupplierList}) {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);


    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const onFinish = async (values) => {
        try {
            let result = await axiosClient.post("/suppliers", values);
            if (result.status === 201) {
                message
                    .loading('Đang tiến hành tạo phiếu nhập....', 0.5)
                    .then(() => message.success('Tạo phiếu nhập thành công', 1.5));
                let newSupplierList = [...supplierList];
                newSupplierList.push(result.data);
                setSupplierList(newSupplierList);
                setVisible(false);

            }
        } catch (error) {

        }
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    return (
        <div>

            <button
                onClick={showModal}
                className="text-gray-50 bg-blue-400 hover:bg-blue-500 p-2 rounded">
                Thêm nhà cung cấp
            </button>
            <Modal
                width={500}
                title="Thêm nhà cung cấp"
                visible={visible}
                footer={null}
                onCancel={handleCancel}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên nhà cung cấp"
                        name="name"
                        rules={[{ required: true, message: 'Please input your supplier name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default NewSupplier;
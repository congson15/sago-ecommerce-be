import React from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    Modal
} from 'antd';
import { EditOutlined } from "@ant-design/icons";

OrderEditing.propTypes = {

};


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};



export function OrderEditing(props) {
    const validateMessages = {
        required: 'Không được bỏ trống ${label}',
    };
    const onFinish = (values) => {
        console.log(values);
    };
    const [visible, setVisible] = React.useState(false);
    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {

    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <button className="p-2" onClick={showModal}>
                <EditOutlined style={{ fontSize: "20px", color: "#08c" }} />
            </button>
            <Modal
                width={600}
                title="Chỉnh sửa đơn hàng"
                visible={visible}
                onCancel={handleCancel}
                footer={[]}
            >
                <div className="text-left">
                    <Form {...layout} name='_order' onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item name={'fullName'} label="Họ và tên" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={'phoneNumber'} label="Số điện thoại" rules={[{ required: true }]}>
                            <Input type='number' />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit" onClick={handleOk}>
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
}
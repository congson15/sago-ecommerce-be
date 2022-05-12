import React from 'react';
import {
    Form,
    Input,
    Button,
    Tooltip,
    Modal
} from 'antd';
import { CheckOutlined } from "@ant-design/icons";



const validateMessages = {
    required: 'Không được bỏ trống ${label}',
};

export function OrderButton({ orderId, handleOrderClick, nextStatus, icon }) {

    const [form] = Form.useForm();
    const [visible, setVisible] = React.useState(false);


    const showModal = () => {
        setVisible(true);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    const onFinish = (values) => {
        handleOrderClick(orderId, values, nextStatus);
        setVisible(false);
    };
    React.useEffect(() => {
        form.setFieldsValue({
            status: nextStatus,
        });

    }, [])
    return (
        <>
            <Tooltip title={nextStatus}>
                <button className="p-2" onClick={showModal}>
                    {icon}
                </button>
            </Tooltip>
            <Modal
                forceRender
                width={500}
                title="Thay đổi trạng thái đơn hàng"
                visible={visible}
                onCancel={handleCancel}
                footer={[]}
            >
                <div className="text-left">

                    <Form name='_orderStatus' form={form} onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item name={'status'} hidden>
                            <Input />
                        </Form.Item>
                        <Form.Item name={'reason'} label="Lý do thay đổi" rules={[{ required: true }]}>
                            <Input type='text' />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" >
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
}
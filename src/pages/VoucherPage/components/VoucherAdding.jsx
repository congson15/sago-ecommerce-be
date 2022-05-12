import React from 'react';
import { Form, Input, Button, Modal, message, DatePicker, InputNumber } from 'antd';
import axiosClient from '../../../api/axiosClient';

VoucherAdding.propTypes = {

};
const { TextArea } = Input;
export function VoucherAdding({ voucherList, setVoucherList }) {
    const [visible, setVisible] = React.useState(false);
    const [expiredDate, setExpiredDate] = React.useState();

    function onChange(value, dateString) {
        setExpiredDate(dateString.replace(/\s/, 'T'));
    }

    const showModal = () => {
        setVisible(true);
    };


    const onFinish = async (values) => {
        values.expiredDate = `${expiredDate}.000`;
        try {
            let result = await axiosClient.post('/vouchers', values);
            if (result.status === 201) {
                let newVoucherList = [...voucherList];
                message
                    .loading('Đang tiến hành tạo giảm giá....', 0.5)
                    .then(() => {   
                        newVoucherList.push(result.data);
                        setVoucherList(newVoucherList);
                        message.success('Tạo giảm giá thành công', 1.5);
                        
                    });
                    setVisible(false);
            }
            if (result.status === 400) {
                message.error("giảm giá đã tồn tại");
                return;
            }
        } catch (error) {
            message.error('Có lỗi xảy ra, vui lòng thử lại sau');
        }
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
                Thêm mã giảm giá
            </button>
            <Modal
                width={500}
                title="Thêm mã giảm giá"
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
                        label="Tên mã giảm giá"
                        name="name"
                        rules={[{ required: true, message: 'Please input your voucher name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mã giảm giá"
                        name="code"
                        rules={[{ required: true, message: 'Please input your code!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả giảm giá"
                        name="description"
                        rules={[{ required: true, message: 'Please input your description!' }]}
                    >
                        <TextArea TextArea={2} />
                    </Form.Item>
                    <Form.Item
                        label="Số lượng"
                        name="total"
                        rules={[{ required: true, message: 'Please input your total!' }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="Phần trăm giảm"
                        name="discountAmount"
                        rules={[{ required: true, message: 'Please input your discount amount!' }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="Giảm tối đa"
                        name="maxDiscountAmount"
                        rules={[{ required: true, message: 'Please input your max discount!' }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="Ngày hết hạn" name="expiredDate" rules={[{ required: true }]}>
                        <DatePicker showTime onChange={onChange} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Tạo mã
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

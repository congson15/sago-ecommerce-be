import React from 'react';
import { Form, Input, Button, Modal, message, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import axiosClient from '../../../api/axiosClient';

VoucherEditing.propTypes = {

};
const { TextArea } = Input;
export function VoucherEditing({ isOpen, setOpen, voucher, setUpdate, update }) {
    const [form] = Form.useForm();
    form.setFieldsValue(voucher);
    const onChange = (value, dateString) => {
        form.setFieldsValue((prevValues) => ({
            ...prevValues,
            expiredDate: moment(dateString.replace(/\s/, 'T'))
        }))
    }

    const onFinish = async (values) => {
        values.expiredDate = values.expiredDate.format().replace(/(\+.*)/, '.000');
        try {
            let result = await axiosClient.put(`/vouchers/${voucher.id}`, values);
            if (result.status === 200) {
                message
                    .loading('Đang tiến hành cập nhật mã giảm giá....', 0.5)
                    .then(() => {
                        setUpdate(true);
                        setOpen(false);
                        message.success('Cập nhật mã giảm giá thành công', 1.5);
                    });
            }
        } catch (error) {
            message.error('Có lỗi xảy ra, vui lòng thử lại sau');
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
                title="Cập nhật mã giảm giá"
                visible={isOpen}
                footer={null}
                onCancel={handleCancel}
                getContainer={false}

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
                        <InputNumber disabled/>
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
                            Cập nhật mã
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

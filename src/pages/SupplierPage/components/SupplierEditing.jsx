import React from 'react';
import {
    ArrowLeftOutlined
} from '@ant-design/icons';
import {
    Form,
    Input,
    Button
} from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import axiosClient from '../../../api/axiosClient';
SupplierEditing.propTypes = {

};

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: 'Không được bỏ trống ${label}',
};

export function SupplierEditing(props) {
    const [form] = Form.useForm();
    const history = useHistory();
    const { id } = useParams();
    const [supplierInfo, setSupplierInfo] = React.useState();
    const onFinish = (values) => {
        console.log(values);
    };

    React.useEffect(() => {
        fetchData(`/suppliers/${id}`);
    }, []);

    const fetchData = async (path) => {
        try {
            const response = await axiosClient.get(path);
            setSupplierInfo(response);
            form.setFieldsValue({
                name: response.name,
                phoneNumber: response.phoneNumber,
                email: response.email
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="py-5 h-screen">
            <button class="text-gray-50 bg-blue-400 hover:bg-blue-500 font-bold py-2 px-4 rounded flex items-center" onClick={() => history.goBack()}>
                <ArrowLeftOutlined className="mr-3" />
                Quay về
            </button>
            {supplierInfo && <div className="grid grid-flow-row grid-cols-3 my-10 -ml-16">
                <Form {...layout} form={form} name='_supplier' onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item name={'name'} label="Tên nhà cung cấp" rules={[{ required: true }]}>
                        <Input placeholder={supplierInfo.name}/>
                    </Form.Item>
                    <Form.Item name={'phoneNumber'} label="Số điện thoại" rules={[{ required: true }]}>
                        <Input type='number' placeholder={supplierInfo.phoneNumber}/>
                    </Form.Item>
                    <Form.Item name={'email'} label="Email" rules={[{ required: true }]}>
                        <Input placeholder={supplierInfo.address}/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button
                            type="primary" 
                            htmlType="submit"
                        >
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            }
        </div >
    );
}
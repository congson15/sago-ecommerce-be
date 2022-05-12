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
OrderStatusEditing.propTypes = {

};

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: 'Không được bỏ trống ${label}',
};

export function OrderStatusEditing(props) {
    const history = useHistory();
    const [orderStatusInfo, setOrderStatusInfo] = React.useState();
    const [form] = Form.useForm();
    const {id} = useParams();
    const onFinish = (values) => {
        console.log(values);
    };
    const fetchData = async (path) => {
        try {
            const response = await axiosClient.get(path);
            setOrderStatusInfo(response);
            form.getFieldValue({
                name: response.name,
                description: response.description,
            })
        } catch (error) {
            console.log(error);
        }
    }
    React.useEffect(()=>{
        fetchData(`/order-statuses/${id}`);
    },[])
    return (
        <div className="py-5 h-screen">
            <button class="text-gray-50 bg-blue-400 hover:bg-blue-500 font-bold py-2 px-4 rounded flex items-center" onClick={() => history.goBack()}>
                <ArrowLeftOutlined className="mr-3" />
                Quay về
            </button>
            {orderStatusInfo && <div className="grid grid-flow-row grid-cols-2 my-10 -ml-28">
                <Form {...layout} name='_orderStatus' onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item name={'name'} label="Tên trạng thái" rules={[{ required: true }]}>
                        <Input placeholder={orderStatusInfo.name} width={500}/>
                    </Form.Item>
                    <Form.Item name={'description'} label="Mô tả" rules={[{ required: true }]}>
                        <Input placeholder={orderStatusInfo.description}/>
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
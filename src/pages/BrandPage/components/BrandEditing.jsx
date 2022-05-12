import { Button, Input, Form } from 'antd';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axiosClient from '../../../api/axiosClient';
import axios from 'axios';

BrandEditing.propTypes = {

};

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: 'Không được bỏ trống ${label}',
};


export function BrandEditing(props) {
    const history = useHistory();
    const [form] = Form.useForm();
    const { id } = useParams();
    const [brandInfo, setBrandInfo] = React.useState();
    const [values,setValues] = React.useState();
    const onFinish = (values) => {
        console.log(values);
    };
    const getNameBrand = (e) => {
        setValues( (values) => ({
            ...values,
            name: e.target.value,
            slug: e.target.value.toLowerCase().replace(/\s+/g,'-'),
        }));
    }
    const pushData = async (path) => {
        let options = {
            method: 'POST',
            url: `${process.env.REACT_APP_BASE_URL}${path}`,
            data: values,
        }
        try {
            const responsePost = await axios(options).then((res)=>{
                if (res.data) {
                    alert("Cập nhật nhãn hiệu thành công");
                    
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    console.log(values)
    const fetchData = async (path) => {
        try {
            const response = await axiosClient.get(path);
            setBrandInfo(response);
            form.setFieldsValue({
                name: response.name,
            })
        } catch (error) {
            console.log(error);
        }
    }
    React.useEffect(() => {
        fetchData(`/brands/${id}`);
    }, []);
    return (
        <div className="py-5 h-screen">
            <button 
                class="text-gray-50 bg-blue-400 hover:bg-blue-500 font-bold py-2 px-4 rounded flex items-center" 
                onClick={() => history.goBack()}
                
            >
                <ArrowLeftOutlined className="mr-3" /> Quay về
            </button>
            {brandInfo && <div className="grid grid-flow-row grid-cols-3 mt-10 -ml-16">
                <Form {...layout} name='_product' onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item name={'name'} label="Tên nhãn hiệu" rules={[{ required: true }]}>
                        <Input placeholder={brandInfo.name} onChange={getNameBrand}/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button class="text-gray-50 bg-blue-400 hover:bg-blue-500 font-bold py-2 px-4 rounded" type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            }
        </div>
    );
}
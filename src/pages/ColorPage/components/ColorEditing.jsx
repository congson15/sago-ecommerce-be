import React from 'react';
import {
    ArrowLeftOutlined,
} from '@ant-design/icons';
import {
    Form,
    Input,
    Button
} from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import axiosClient from '../../../api/axiosClient';


ColorEditing.propTypes = {

};

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: 'Không được bỏ trống ${label}',
};

const onFinish = (values) => {
    console.log(values);
};


export function ColorEditing() {
    const history = useHistory();
    const [colorInfo, setColorInfo] = React.useState();
    const [form] = Form.useForm();
    const {id} = useParams();
    const fetchData = async (path) => {
        try {
            const response = await axiosClient.get(path);
            setColorInfo(response);
            form.getFieldValue({
                name: response.name
            })
        } catch (error) {
            console.log(error);
        }
    }
    React.useEffect(()=>{
        fetchData(`/colors/${id}`);
    }, [])
    return (
        <div className="py-5 h-screen">
            <button style={{backgroundColor: "#1890FF"}} class="text-gray-50 font-bold py-2 px-4 rounded flex items-center" onClick={() => history.goBack()}>
                <ArrowLeftOutlined className="mr-3" />
                Quay về
            </button>
            {colorInfo && <div className="grid grid-flow-row grid-cols-3 my-10 -ml-16">
                <Form {...layout} name='_size' onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item name={'name'} label="Màu sắc" rules={[{ required: true }]}>
                        <Input placeholder={colorInfo.name}/>
                    </Form.Item>
                    <Form.Item wrapperCol= {{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            }
        </div>
    );
}
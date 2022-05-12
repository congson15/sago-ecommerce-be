import React from 'react';
import {
    ArrowLeftOutlined,
    UploadOutlined
} from '@ant-design/icons';
import {
    Form,
    Input,
    Button,
    Select,
    Image,
    Upload,
    message
} from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import axiosClient from '../../../api/axiosClient';
import { Spin } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
ProductAdding.propTypes = {

};

const { Option } = Select;

const columns = [
    {
        title: 'Màu',
        dataIndex: 'color',
        key: 'color',
        align: 'center'
    },
    {

        title: 'Size',
        dataIndex: 'size',
        key: 'size',
        align: 'center'
    },
    {

        title: 'Còn lại',
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'center'
    }
];

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: 'Không được bỏ trống ${label}',
};

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


export function ProductAdding(props) {

    const [form] = Form.useForm();
    const history = useHistory();
    const { id } = useParams();
    const [brandList, setBrandList] = React.useState();
    const [isLoading, setLoading] = React.useState(true);
    const [imageList, setImageList] = React.useState([]);
    const [previewImage, setPreviewImage] = React.useState();
    const [description, setDescription] = React.useState('');

    const handleBrandChange = (newBrand) => {
        form.setFieldsValue({
            brand: newBrand,
        });
    }

    const handleGenderChange = (newGender) => {
        form.setFieldsValue({
            gender: newGender,
        });
    }


    const fetchBrandData = async () => {
        try {
            let result = await axiosClient.get('/brands');
            setBrandList(result);
            setLoading(false);
        } catch (error) {
            message.error("Vui lòng thử lại sau");
        }
    }

    React.useEffect(() => {
        fetchBrandData();
    },[])

    const onFinish = async (values) => {
        values.slug = values.name.replace(/\s/g,"-").toLowerCase();
        values.brand = values.brand.toLowerCase();
        values.description = description;
        values.price = values.price.replace(/[$,]+/g,"");
        if(!values.price.match(/\d/)){
            message.warning("Giá tiền chỉ bao gồm số");
            return;
        }
        const newImageList = [...imageList];
        var data = new FormData();
        data.append('product', JSON.stringify(values));
        if(newImageList.length === 0){
            message.warning("Vui lòng thêm hình ảnh")
            return;
        }
        newImageList.forEach((item) => {
            data.append('images', item.originFileObj);
        })
        try{
            let result = await axiosClient.post(`/products`, data);
            if(result.status === 201){
                message.success("Thêm mới thành công");
                return;
            }
            message.error("Thêm mới thất bại");
        }
        catch(error){
            message.error("Có lỗi, vui lòng thử lại sau");
        }


    }
    const handleUpload = ({ fileList }) => {
        setImageList(fileList);
        handlePreview(fileList[fileList.length - 1]);
    };
    const handlePreview = async (file) => {
        if (!file) {
            return;
        }
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.preview || file.url);
    }
    return (
        <>
            {isLoading ?
                <div className="flex h-screen justify-center items-center">
                    <Spin size="large" />
                </div>
                :
                <div className="py-5 h-screen">
                    <button className="bg-blue-500 text-gray-50 font-bold py-2 px-4 rounded flex items-center" onClick={() => history.goBack()}>
                        <ArrowLeftOutlined className="mr-3" />
                        Quay về
                    </button>
                    <div className="grid grid-flow-row grid-cols-3 my-5">
                        <div className='flex flex-col max-w-2xl'>
                            {previewImage && <Image
                                preview={false}
                                width='100%'
                                className="mb-5"
                                src={previewImage}
                            />
                            }
                            <Upload
                                accept=".jpg, .png"
                                listType="picture-card"
                                defaultFileList={imageList}
                                multiple
                                onChange={handleUpload}
                                beforeUpload={() => false}
                                onPreview={handlePreview}
                            >
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </div>
                        <div>
                            <Form {...layout} form={form} name='_product' onFinish={onFinish} className="grid-cols-2" validateMessages={validateMessages}>
                                <Form.Item name={'name'} label="Tên sản phẩm" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name={'slug'} label="Slug" >
                                    <Input disabled/>
                                </Form.Item>
                                <Form.Item name={'price'} label="Đơn giá" rules={[{ required: true }]}>
                                    <Input type='text' />
                                </Form.Item>
                                <Form.Item name={'brand'} label="Thương hiệu" rules={[{ required: true }]}>
                                    <Select
                                        onChange={handleBrandChange}
                                        showSearch
                                        style={{ width: 110 }}
                                        placeholder="Tìm kiếm"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {brandList.map((item, index) => <Option key={item.id} value={item.name.toLowerCase()}>{item.name}</Option>)}
                                    </Select>
                                </Form.Item>
                                <Form.Item name={'gender'} label="Giới tính" rules={[{ required: true }]}>
                                    <Select
                                        onChange={handleGenderChange}
                                        showSearch
                                        style={{ width: 110 }}
                                        placeholder="Tìm kiếm"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Option value="men"> Nam </Option>
                                        <Option value="women"> Nữ </Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name={'description'} label="Mô tả">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={description}
                                        onBlur={(event, editor) => {
                                            const data = editor.getData();
                                            setDescription(data);
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                    <Button type="primary" htmlType="submit">
                                        Thêm mới
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div >
            }
        </>
    );
}

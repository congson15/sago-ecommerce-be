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
import { ProductTable } from './ProductTable/ProductTable';
import { Spin } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

ProductEditing.propTypes = {

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


export function ProductEditing(props) {

    const [form] = Form.useForm();
    const history = useHistory();
    const { id } = useParams();
    const [productInfo, setProductInfo] = React.useState();
    const [brandList, setBrandList] = React.useState();
    const [productVariants, setProductVariants] = React.useState();
    const [isLoading, setLoading] = React.useState(true);
    const [imageList, setImageList] = React.useState([]);
    const [previewImage, setPreviewImage] = React.useState();
    const [description, setDescription] = React.useState('');
    React.useEffect(() => {
        fetchData(`/products/${id}`);
        fetchData(`/brands`);
    }, [])

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

    const convertImageToFile = (imageUrl) => {
        const toDataURL = url => fetch(url)
            .then(response => response.blob())
            .then(blob => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            }))
        function dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        }
        return toDataURL(imageUrl)
            .then(dataUrl => {
                var fileData = dataURLtoFile(dataUrl, `img-1.jpg`);
                return fileData;
            })
            .then(result => result);



    }

    const fetchData = async (path) => {
        try {
            const response = await axiosClient.get(path);
            if (path.match(/\/brands/)) {
                setBrandList(response);
                return;
            }
            let newProductVariants = [];
            response.productVariants.forEach((item, index) => {
                let newProductVariant;
                for (const [key, value] of Object.entries(item.colors)) {
                    newProductVariant = {
                        size: item.size,
                        color: key,
                        quantity: value
                    }
                    newProductVariants.push(newProductVariant)
                }
            });
            setProductVariants(newProductVariants);
            setProductInfo(response);
            let newImageList = [];
            if (response.images.length > 0) {
                for (const imageUrl of response.images) {
                    let result = await convertImageToFile(`${process.env.REACT_APP_BASE_URL}/products${imageUrl}`)
                    let newImage = {
                        uid: Math.floor(Math.random() * (100 - 1 + 1) + 1),
                        url: `${process.env.REACT_APP_BASE_URL}/products${imageUrl}`,
                        originFileObj: result
                    }
                    newImageList.push(newImage);
                }
                setPreviewImage(newImageList[0].url);
            }
            else {
                setPreviewImage('https://previews.123rf.com/images/latkun/latkun1712/latkun171200130/92172856-empty-transparent-background-seamless-pattern.jpg');
            }
            setImageList(newImageList);
            setDescription(response.description);
            setLoading(false);
            form.setFieldsValue({
                name: response.name,
                price: response.price,
                brand: response.brand,
                slug: response.slug,
                gender: response.gender,
                description: response.description
            });
        }
        catch (error) {
            console.log(error);
            message("Đã có lỗi xảy ra, vui lòng thử lại sau");
        }
    }



    const onFinish = async (values) => {
        values.description = description;
        values.price = values.price.replace(/[$,]+/g,"");
        const newImageList = [...imageList];
        var data = new FormData();
        data.append('product', JSON.stringify(values));
        if (newImageList.length === 0) {
            message.warning("Vui lòng thêm hình ảnh")
            return;
        }
        newImageList.forEach((item) => {
            data.append('images', item.originFileObj);
        })
        let result = await axiosClient.put(`/products/${id}`, data);
        if (!result) {
            message.warning("Cập nhật thất bại");
            return;
        }
        message.success("Cập nhật thành công");

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
                        <div className='col-span-2'>
                            <Form {...layout} form={form} name='_product' onFinish={onFinish} className="grid-cols-2" validateMessages={validateMessages}>
                                <Form.Item name={'name'} label="Tên sản phẩm">
                                    <Input placeholder={productInfo.name} disabled />
                                </Form.Item>
                                <Form.Item name={'slug'} label="Slug">
                                    <Input placeholder={productInfo.slug} disabled />
                                </Form.Item>
                                <Form.Item name={'price'} label="Đơn giá" rules={[{ required: true }]}>
                                    <Input type='text' value={form.price} />
                                </Form.Item>
                                <Form.Item name={'brand'} label="Thương hiệu">
                                    <Select
                                        onChange={handleBrandChange}
                                        value={form.brand}
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
                                        value={form.gender}
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
                                        Cập nhật
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-2xl'>Các biến thể</h1>
                        <ProductTable data={productVariants} columns={columns} />
                    </div>
                </div >
            }
        </>
    );
}

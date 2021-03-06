import React from 'react';
import { Input, Modal, Select, Form, Button, message, Row, Col, } from 'antd';
import { ImportedProductsTable } from '../GoodReceiptTable/ImportedProductsTable'
import axiosClient from '../../../../api/axiosClient';
import { useForm } from 'antd/es/form/Form';
NewGoodReceipt.propTypes = {

};

const { Option } = Select;
const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
};
function NewGoodReceipt({ supplyList, setSupplyList }) {
    const [form] = useForm();
    const [visible, setVisible] = React.useState(false);
    const [dataToShow, setDataToShow] = React.useState([]);
    const [suppliersList, setSupplierList] = React.useState(() => {
        const initSupplier = JSON.parse(localStorage.getItem("suppliers")) || [];
        return initSupplier;
    });
    const [sizeList, setSizeList] = React.useState(() => {
        const initSizeList = JSON.parse(localStorage.getItem("sizes")) || [];
        return initSizeList;
    });
    const [colorList, setColorList] = React.useState(() => {
        const initColorList = JSON.parse(localStorage.getItem("colors")) || [];
        return initColorList;
    });
    const [supplyOrderItems, setSupplyOrderItems] = React.useState([]);
    const [productList, setProductList] = React.useState(() => {
        const initProductList = JSON.parse(localStorage.getItem("productList")) || [];
        return initProductList;
    });
    const [formData, setFormData] = React.useState({
        supplyName: "",
        SupplyOrderItems: [],
        note: ""
    })
    const [selectedProduct, setSelectedProduct] = React.useState({
        productName: '',
        size: 0,
        color: '',
        quantity: 0,
        price: 0
    })

    const fetchData = async (path) => {
        try {
            let result = await axiosClient.get(path);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    const initData = async () => {
        let newSuppliersList = await fetchData("/suppliers");
        let newSizeList = await fetchData("/sizes");
        let newColorList = await fetchData("/colors");
        let newProductList = await fetchData("/products?limit=10000");
        setSupplierList(newSuppliersList);
        localStorage.setItem("suppliers", JSON.stringify(newSuppliersList));
        setProductList(newProductList);
        localStorage.setItem("productList", JSON.stringify(newProductList));
        setSizeList(newSizeList);
        localStorage.setItem("sizes", JSON.stringify(newSizeList));
        setColorList(newColorList);
        localStorage.setItem("colors", JSON.stringify(newColorList));

    }

    React.useEffect(() => {
        if (suppliersList.length > 0 && productList.length > 0) {
            return;
        }
        initData();
    }, [])

    const handleSupplyNameChange = (e) => {
        form.setFieldsValue({ supplyName: e });
    }
    const handleNoteChange = (e) => {
        form.setFieldsValue({ note: e.target.value });
    }
    const showModal = () => {
        setVisible(true);
    };

    const handleOk = async () => {
        if (supplyOrderItems.length === 0 || formData.supplyName.length === 0 || formData.note === 0) {
            message.warning("Vui l??ng ??i???n ?????y ?????")
            return;
        }
        try {
            let result = await axiosClient.post("/supply-orders", formData);
            if (result.status === 201) {
                message
                    .loading('??ang ti???n h??nh t???o phi???u nh???p....', 0.5)
                    .then(() => message.success('T???o phi???u nh???p th??nh c??ng', 2.5));
                form.resetFields();
                let resetSelectedProduct = {
                    productName: '',
                    size: 0,
                    color: '',
                    quantity: 0,
                    price: 0
                }
                let resetFormData = {
                    supplyName: "",
                    SupplyOrderItems: [],
                    note: ""
                }
                let newSupply = {
                    idSupply: result.data.id,
                    staff: result.data.staff.username,
                    supplier: result.data.supplier.name,
                    createdAt: result.data.createdAt.match(/(\d{2,4}\-\d{1,2}\-\d{1,2}T(\d{2})\:(\d{2}))/)[1].replace(/(\d{4})\-(\d{2})\-(\d{2})T/, '$3/$2/$1 '),
                    total: result.data.total
                }
                let newSupplyList = [...supplyList];
                newSupplyList.push(newSupply);
                setSupplyList(newSupplyList);
                setSelectedProduct(resetSelectedProduct);
                setDataToShow([]);
                setSupplyOrderItems([]);
                setFormData(resetFormData);

                setVisible(false);
                return;
            }
            console.log(result);
        } catch (error) {

        }
    };

    const handleProductNameChange = (e) => {
        setSelectedProduct((prevProduct) => ({
            ...prevProduct,
            productName: e
        }))
    }
    const handleProductSizeChange = (e) => {
        setSelectedProduct((prevProduct) => ({
            ...prevProduct,
            size: e
        }))
    }
    const handleProductColorChange = (e) => {
        setSelectedProduct((prevProduct) => ({
            ...prevProduct,
            color: e
        }))
    }
    const handleProductQuantityChange = (e) => {
        setSelectedProduct((prevProduct) => ({
            ...prevProduct,
            quantity: e
        }))
    }
    const handleProductPriceChange = (e) => {
        setSelectedProduct((prevProduct) => ({
            ...prevProduct,
            price: e
        }))
    }

    const handleCancel = () => {
        setVisible(false);
    };

    const handleAddToTable = (values) => {
        const newSupplyOrderItems = [...supplyOrderItems];
        const newDataToShow = [...dataToShow];
        const newFormData = { ...formData };
        const newSelectedProduct = {
            productName: '',
            size: 0,
            color: '',
            quantity: 0,
            price: 0
        }
        const newValue = {
            productName: `${values.productName} ${values.color} ${values.size}`,
            quantity: Number.parseInt(values.quantity),
            price: Number.parseInt(values.price)
        }
        if (newFormData.note.length === 0 || newFormData.supplyName.length === 0) {
            newFormData.note = values.note;
            newFormData.supplyName = values.supplyName;
        }

        values.productName = values.productName.replace(/\-/g, " ").toUpperCase();
        newDataToShow.push(values);
        newSupplyOrderItems.push(newValue);
        newFormData.SupplyOrderItems = newSupplyOrderItems;
        setFormData(newFormData);
        setSelectedProduct(newSelectedProduct);
        setSupplyOrderItems(newSupplyOrderItems);
        setDataToShow(newDataToShow);

    }
    return (
        <div>
            <button
                onClick={showModal}
                className="text-gray-50 bg-blue-400 hover:bg-blue-500 p-2 rounded">
                Th??m phi???u nh???p
            </button>
            <Modal
                width={1100}
                title="Th??m phi???u nh???p"
                cancelText="H???y"
                okText="T???o phi???u nh???p"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form {...layout} layout="vertical" name='SupplyOrderItems' onFinish={handleAddToTable} >
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item name={'productName'} label="T??n:" rules={[{ required: true }]}>
                                <Select
                                    style={{width: 250}}
                                    onChange={handleProductNameChange}
                                    value={selectedProduct.productName}
                                    showSearch
                                    name={selectedProduct.slug}
                                    placeholder="T??m ki???m"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {productList.map((item, index) => <Option key={item.id} value={item.slug}>{item.name}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name={'supplyName'} label="Nh?? cung c???p" rules={[{ required: true }]}>
                                <Select
                                    onChange={handleSupplyNameChange}
                                    value={form.supplyName}
                                    showSearch
                                    placeholder="T??m ki???m"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {suppliersList.map((item, index) => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name={'price'} label="Gi?? ti???n" rules={[{ required: true }]}>
                                <Input value={selectedProduct.price} onChange={handleProductPriceChange} type='text'  />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item name={'color'} label="M??u:" rules={[{ required: true }]}>
                                <Select
                                    onChange={handleProductColorChange}
                                    value={selectedProduct.color}
                                    showSearch
                                    placeholder="T??m ki???m"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {colorList.map((item, index) => <Option key={item.id} value={item.name}>{item.name}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name={'size'} label="K??ch c???:" rules={[{ required: true }]}>
                                <Select
                                    onChange={handleProductSizeChange}
                                    value={selectedProduct.size}
                                    showSearch
                                    placeholder="T??m ki???m"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {sizeList.map((item, index) => <Option key={item.id} value={item.name}>{item.name}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name={'quantity'} label="S??? l?????ng" rules={[{ required: true }]}>
                                <Input value={selectedProduct.quantity} onChange={handleProductQuantityChange} type='number' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item name={'note'} label="Ghi ch??" rules={[{ required: true }]}>
                                <Input value={form.note} onChange={handleNoteChange} type='text' />
                            </Form.Item>
                        </Col>
                        <Col span={14}>
                            <Form.Item style={{marginTop:25}}>
                                <Button type="primary" htmlType="submit">
                                    Th??m s???n ph???m
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                {dataToShow.length > 0 && <ImportedProductsTable data={dataToShow} />}
            </Modal>
        </div>
    );
}

export default NewGoodReceipt;
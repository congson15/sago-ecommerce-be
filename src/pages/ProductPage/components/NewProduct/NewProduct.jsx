import React from 'react';
import { Input, Modal, Select } from 'antd';
import { UploadImage } from './UploadImage';

NewProduct.propTypes = {

};

const { Option } = Select;

function NewProduct(props) {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setVisible(false);
    };
    return (
        <div>

            <button
                onClick={showModal}
                className="text-gray-50 bg-blue-400 hover:bg-blue-500 p-2 rounded">
                Thêm sản phẩm
            </button>
            <Modal
                width={1000}
                title="Thêm sản phẩm"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <div className="flex flex-wrap mb-5">
                    <div>
                        <p className="mb-2" >Tên sản phẩm</p>
                        <Input ></Input>
                    </div>
                    <div className="mx-2">
                        <p className="mb-2">Đơn giá</p>
                        <Input type="number"></Input>
                    </div>
                    <div >
                        <p className="mb-2">Thương hiệu</p>
                        <Select
                            style={{ width: 110 }}
                        >
                            <Option value="nike">Nike</Option>
                            <Option value="adidas">Adidas</Option>
                        </Select>
                    </div>
                </div>

                <UploadImage />


            </Modal>
        </div>
    );
}

export default NewProduct;
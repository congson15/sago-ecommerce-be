import React from 'react';
import { Input, Modal, Select } from 'antd';

NewOrder.propTypes = {

};

const { Option } = Select;

function NewOrder(props) {
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
                Thêm đơn hàng
            </button>
            <Modal
                width={600}
                title="Thêm đơn hàng"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <div className="mb-5">
                    <div>
                        <p className="mb-2" >Họ và tên</p>
                        <Input ></Input>
                    </div>
                    <div>
                        <p className="mb-2 mt-5">Số điện thoại</p>
                        <Input type="number"></Input>
                    </div>
                    <div>
                        <p className="mb-2 mt-5" >Ngày lập đơn hàng</p>
                        <Input ></Input>
                    </div>
                    <div >
                        <p className="mb-2 mt-5">Trạng thái</p>
                        <Select
                            style={{ width: 140 }}
                        >
                            <Option value="success">Thành công</Option>
                            <Option value="cancel">Huỷ</Option>
                        </Select>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default NewOrder;
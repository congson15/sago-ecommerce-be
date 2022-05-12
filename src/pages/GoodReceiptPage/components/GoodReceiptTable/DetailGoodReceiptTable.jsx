import React from 'react';
import moment from 'moment';
import { Input, Modal, DatePicker, Space, ConfigProvider, Button } from 'antd';
import {
    EyeOutlined,
} from "@ant-design/icons";
import { ImportedProductsTable } from '../GoodReceiptTable/ImportedProductsTable';
DetailGoodReceiptTable.propTypes = {

};

export function DetailGoodReceiptTable(props) {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const dateFormat = 'DD/MM/YYYY';
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
            <button onClick={showModal}>
                <EyeOutlined style={{ fontSize: "20px", marginTop: "0.8rem" }} />
            </button>
            <Modal
                width={1000}
                title="Thông tin phiếu nhập hàng"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[]}
            >
                <div className="mb-5">
                    <div>
                        <p className="mb-2 -mt-2">Ngày lập phiếu nhập hàng</p>
                        <Space direction="vertical" >
                            <ConfigProvider>
                                <DatePicker size={'medium'} style={{ width: '12rem' }} defaultValue={moment('12/12/2021')} format={dateFormat} disabled />
                            </ConfigProvider>
                        </Space>
                    </div>
                    <div>
                        <p className="mb-2 mt-5" >Mã phiếu nhập</p>
                        <Input disabled style={{ width: '12rem' }}></Input>
                    </div>
                    <div>
                        <p className="mb-2 mt-5" >Nhân viên tạo phiếu</p>
                        <Input disabled style={{ width: '12rem' }}></Input>
                    </div>
                    <h1 className="text-base mt-5 mb-4" >Chi tiết phiếu nhập hàng</h1>
                    <ImportedProductsTable />
                    <h1 className="text-base mt-5 mb-4 text-right" >Tổng thành tiền phiếu nhập: {''} VNĐ</h1>
                </div>
            </Modal>
        </div>
    );
}
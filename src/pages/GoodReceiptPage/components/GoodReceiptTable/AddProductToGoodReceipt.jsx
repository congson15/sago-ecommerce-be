import React from 'react';
import { Modal } from 'antd';
import { AddedProductTable } from '../GoodReceiptTable/AddedProductTable';
import { AddProductTable } from '../GoodReceiptTable/AddProductTable';
AddProductToGoodReceipt.propTypes = {

};


export function AddProductToGoodReceipt({productList, supplyOrderItems}) {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [productListTop, setProductListTop] = React.useState();
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
            <div className='pt-5'>
                <button
                    onClick={showModal}
                    className="text-gray-50 bg-blue-400 hover:bg-blue-500 p-2 rounded">
                    Thêm sản phẩm
                </button>
            </div>
            <Modal
                width={1100}
                title="Thêm sản phẩm vào phiếu nhập"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <AddProductTable productList={productList}/>
                <h1 className="text-base mt-5 mb-4" >Sản phẩm đã thêm</h1>
                <AddedProductTable />
            </Modal>
        </div>
    );
}
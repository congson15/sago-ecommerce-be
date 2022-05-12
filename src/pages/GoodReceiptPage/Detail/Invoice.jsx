import React from "react";
import { InvoiceProductTable } from "./InvoiceGoodReceiptTable/InvoiceProductTable";
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { useHistory, useLocation } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axiosClient from "../../../api/axiosClient";
import { useParams } from "react-router-dom";
import { Spin } from 'antd';


export function Invoice() {
    const { id } = useParams();
    const history = useHistory();
    const location = useLocation();
    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
            align: 'center',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            width: '15%',
            render: price => (price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }))
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            width: '10%',
        },
    ]

    const [isLoading, setLoading] = React.useState(true);
    const [invoiceInfo, setInvoiceInfo] = React.useState([]);
    const handlePrint = () => {
        const invoice = document.getElementById('invoice');
        html2canvas(invoice, {
            scrollX: 0,
            scrollY: 0,
            allowTaint: true
        })
            .then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                let newData = imgData.replace(/^data:image\/png/, "data:application/octet-stream");
                const pdf = new jsPDF();
                pdf.addImage(newData, 'JPEG', 0, 0);
                pdf.save(`Phieu-nhap.pdf`);
            });
    }
    const fetchData = async (path) => {
        try {
            const result = await axiosClient.get(path);

            if (result) {
                setInvoiceInfo(result);
                setLoading(false);
                return;
            }
        } catch (err) {
            console.log(err);
        }
    }
    React.useEffect(() => {
        fetchData(`/supply-orders/${id}`);
    }, [])

    return (
        <>
            {isLoading ?
                <div className="flex h-screen justify-center items-center">
                    <Spin size="large" />
                </div>
                :
                <div>
                    <div className='flex justify-between py-4'>
                        <button className="bg-blue-500 text-gray-50 font-bold py-2 px-4 rounded flex items-center" onClick={() => history.goBack()}>
                            <ArrowLeftOutlined className="mr-3" />Quay về</button>
                        <button className="bg-blue-500 text-gray-50 font-bold py-2 px-4 rounded flex items-center" onClick={handlePrint}>Tải hóa đơn</button>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className='px-9 col' id="invoice" style={{ backgroundColor: '#FFF' }}>
                            <p className='text-3xl font-bold text-center'>Phiếu nhập hàng</p>
                            <div style={{ height: 'auto' }}>
                                <div className='grid grid-cols-3'>
                                    <div className="flex">
                                        <p>Mã phiếu nhập: #{invoiceInfo.id}</p>
                                    </div>
                                    <div className="flex">
                                        <p>Ngày lập phiếu nhập: {invoiceInfo.createdAt.match(/(\d{2,4}\-\d{1,2}\-\d{1,2}T(\d{2})\:(\d{2}))/)[1].replace(/(\d{4})\-(\d{2})\-(\d{2})T/, '$3/$2/$1 ')}</p>
                                        
                                    </div>
                                    <div className="flex">
                                        <p>Nhân viên lập phiếu nhập: {invoiceInfo.username}</p>
                                        
                                    </div>
                                </div>
                                <InvoiceProductTable data={invoiceInfo.supplyOrderItems} columns={columns} />
                                <div className='grid grid-cols-2'>
                                    <div className="col-start-2">
                                        <div className="flex justify-between">
                                            <p>Tổng giá: </p>
                                            <p key='invoiceSubtotal' className='font-bold text-right'> {invoiceInfo.total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p>Thuế: </p>
                                            <p key='invoiceTax' className='font-bold text-right'> 0</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p>Phí vận chuyển: </p>
                                            <p key='invoiceShipping' className='font-bold text-right'> 0</p>
                                        </div>
                                        <div className='w-full bg-gray-500' style={{ height: '2px' }}></div>
                                        <div className="flex justify-between">
                                            <p>Thành tiền: </p>
                                            <p key='invoiceTotal' className='font-bold text-right text-red-500'>{invoiceInfo.total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            }
        </>
    );
}
import React from "react";
import { InvoiceProductTable } from "./InvoiceOrderTable/InvoiceProductTable";
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { useHistory, useLocation } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axiosClient from "../../../api/axiosClient";
import { useParams } from "react-router-dom";
import { Spin, Steps, Tag } from 'antd';

const { Step } = Steps;

export function Invoice() {
    const { id } = useParams();
    const history = useHistory();
    const location = useLocation();
    const { detail } = location.state;
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            width: '2%',
            align: 'center',
            render: item => (Math.floor(Math.random() * (100 - 0 + 1) + 0))
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
            align: 'center',
            width: '15%',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            width: '10%',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            width: '10%',
            render: price => (price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }))
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
                pdf.save(`Hoa-don-${detail.id}.pdf`);
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
        fetchData(`/orders/${id}`);

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
                            <p className='text-3xl font-bold text-center'>Hóa đơn</p>
                            <p className='font-bold text-center'>---Cảm ơn quý khách đã mua sản phẩm tại SagoShoes---</p>
                            <div style={{ height: 'auto' }}>
                                <div className='grid grid-cols-3'>
                                    <div>
                                        <div>
                                            <div className="flex">
                                                <p>Mã hoá đơn: </p>
                                                <p key='invoicePayMethods' className='font-bold'>#{detail.id}</p>
                                            </div>
                                            <div className="flex flex-col">
                                                <p>Ngày lập hoá đơn: </p>
                                                <p className='font-bold'> {detail.createdAt.match(/(\d{2,4}\-\d{1,2}\-\d{1,2})/)[1].replace(/(\d{4})\-(\d{2})\-(\d{2})/, '$3/$2/$1')}</p>
                                            </div>
                                            <div className="flex">
                                                <p>Nhân viên lập hoá đơn: </p>
                                                <p className='font-bold'> {detail.staff}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="flex justify-between">
                                            <p>Phương thức thanh toán: </p>
                                            <p key='invoicePayMethods' className='font-bold'> {detail.paymentMethod.toUpperCase()}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p>Tên khách hàng: </p>
                                            <p key='invoiceCustomer' className='font-bold'> {detail.customer}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p>Địa chỉ nhận hàng: </p>
                                            <p key='invoiceCustomer' className='font-bold'> {detail.address}</p>
                                        </div>
                                    </div>
                                </div>
                                <InvoiceProductTable data={invoiceInfo.items} columns={columns} />
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
                        <div>
                            <p className='text-3xl font-bold text-center'>Trạng thái đơn hàng</p>
                            <Steps current={invoiceInfo.histories.length} size="small" direction="vertical" className="h-96" style={{ backgroundColor: '#fff', margin: '10px', padding: '20px' }} >
                                {invoiceInfo.histories.map((orderStatus, index) => {
                                    return (
                                        <>
                                            <Step title={orderStatus.status}
                                                subTitle={
                                                    <Tag>{orderStatus.createdAt.match(/(\d{2,4}\-\d{1,2}\-\d{1,2}T(\d{2})\:(\d{2}))/)[1].replace(/(\d{4})\-(\d{2})\-(\d{2})T/, '$3/$2/$1 ')}</Tag>
                                                }
                                                description={orderStatus.reason}
                                                key={index} />
                                        </>
                                    )
                                }
                                )}
                            </Steps>
                        </div>

                    </div>


                </div>
            }
        </>
    );
}
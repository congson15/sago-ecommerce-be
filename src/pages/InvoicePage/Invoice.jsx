import React from "react";
import logo from "../../images/logo.png";
import { InvoiceProductTable } from "./InvoiceTable/InvoiceProductTable";
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";


const data = [
    {
        number: 1,
        name: 'Nike Air 1',
        price: 1000000,
        amount: 2,
        subTotal: 2000000,
    },
    {
        number: 2,
        name: 'Nike Air 2',
        price: 200000,
        amount: 2,
        subTotal: 400000,
    },
    {   
        number: 3,
        name: 'Nike Air 3',
        price: 500000,
        amount: 2,
        subTotal: 1000000,
    },
    {
        number: 4,
        name: 'Nike Air 4',
        price: 1500000,
        amount: 2,
        subTotal: 3000000,
    },
];

export function Invoice() {
    const [invoiceList] = React.useState(data);
    const handlePrint = () => {
        const invoice = document.getElementById('invoice');
        html2canvas(invoice)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            // pdf.output('dataurlnewwindow');
            pdf.save("download.pdf");
          });
    }

    return (
        <>
        <button onClick={handlePrint}>Tai hoa don</button>
        <div className='p-9' id="invoice" style={{width: '50%', height: 'auto', backgroundColor: '#FFF'}}>
            <div style={{height: 'auto'}}>
                <img className='w-48' src={logo}></img>
                <div className='flex justify-between'>
                    <div className='mt-20 pl-6'>
                        <p className='text-3xl font-bold'>SagoShoes</p>
                        <div className='flex justify-between' style={{width: '130%'}}>
                            <div style={{width: '50%'}}>
                                <p>Mã hoá đơn: </p>
                                <p>Ngày lập hoá đơn: </p>
                                <p>Nhân viên lập hoá đơn: </p>
                                
                            </div>
                            <div style={{width: '50%'}}>
                                <p key='invoiceId' className='font-bold text-right'>#12345</p>
                                <p key='invoiceDate' className='font-bold text-right'> 02/12/2021</p>
                                <p key='invoiceStaff' className='font-bold text-right'> Phan Công Hà</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-28 pr-9 text-right'>
                        <p>Cửa hàng bán giày SagoShoes</p>
                        <p>273 An Dương Vương</p>
                        <p>Phường 3, Quận 5, Thành phố Hồ Chí Minh</p>
                        <p>lienlac@sagoshoes.com</p>
                    </div>
                </div>
                <InvoiceProductTable data={invoiceList}/>
                <div className='flex justify-between py-16'>
                    <div>
                        <div className='flex justify-between pl-6' style={{width: '90%'}}>
                            <div style={{width: '50%'}}>
                                <p>Phương thức thanh toán: </p>
                                <p>Tên khách hàng: </p>
                                <p>Địa chỉ nhận hàng: </p>
                            </div>
                            <div style={{width: '50%'}}>
                                <p key='invoicePayMethods' className='font-bold text-right'> Thanh toán trực tiếp</p>
                                <p key='invoiceCustomer' className='font-bold text-right'> Phan Công Hà</p>
                                <p key='invoiceAddress' className='font-bold text-right'> 123 An Dương Vương, P.3, Q.5, TP. HCM</p>
                            </div>
                        </div>
                    </div>
                    <div className='pr-12' style={{width: '30%'}}>
                        <div className='flex justify-between' style={{width: '100%'}}>
                            <div style={{width: '50%'}}>
                                <p>Tổng giá: </p>
                                <p>Thuế: </p>
                                <p>Phí vận chuyển: </p>
                            </div>
                            <div style={{width: '50%'}}>
                                <p key='invoicePayMethods' className='font-bold text-right'> 6400000</p>
                                <p key='invoiceCustomer' className='font-bold text-right'> 10000</p>
                                <p key='invoiceAddress' className='font-bold text-right'> 50000</p>
                            </div>
                        </div>
                        <div className='w-full bg-gray-500' style={{height: '2px'}}></div>
                        <div className='flex justify-between mt-3'>
                            <p className='text-right'>Thành tiền: </p>
                            <p key='mainTotal' className='text-xl font-bold inline text-red-500'> 6460000</p>
                        </div>
                    </div>
                </div>
                
                <p className='font-bold text-center'>---Cảm ơn quý khách đã mua sản phẩm tại SagoShoes---</p>
            </div>
            
        </div>    
        </>
    );
}
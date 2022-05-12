import { message } from 'antd';
import React from 'react';
import axiosClient from '../../api/axiosClient';
import { VoucherTable } from './components/VoucherTable';
import { VoucherAdding } from './components/VoucherAdding';
import { Spin, Tag, Input } from 'antd';
import {
    EditOutlined,
    SearchOutlined,
    
} from '@ant-design/icons';
import moment from 'moment';
import { VoucherEditing } from './components/VoucherEditing';

export function Voucher(props) {
    const [voucherList, setVoucherList] = React.useState();
    const [isLoading, setLoading] = React.useState(true);
    const [isOpen, setOpen] = React.useState(false);
    const [isUpdate, setUpdate] = React.useState(true);
    const [voucher, setVoucher] = React.useState();
    const remainingTime = (time) => {
        let expiredDate = moment(time).unix();
        let currTime = moment().unix();
        let leftTime = expiredDate - currTime;
        if (leftTime <= 0) {
            return null;
        }
        var duration = moment.duration(leftTime, 'seconds');
        return duration;
    }
    const handleEditingClick = (record) => {
        record.expiredDate = moment(record.expiredDate);
        setVoucher(record);
        setOpen(true);
    };
    const fetchData = async () => {
        try {

            let result = await axiosClient.get('/vouchers');
            if (result) {
                setVoucherList(result);
                setLoading(false);
                setUpdate(false);
            }

        } catch (error) {
            message.error("Có lỗi xảy ra");
        }
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Tên mã giảm giá',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: 'Mã giảm giá',
            dataIndex: 'code',
            key: 'code',
            align: 'center',
        },
        {
            title: 'Còn lại',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            sorter: (a, b) => Number.parseInt(a.quantity) - Number.parseInt(b.quantity),
            render: quantity => (
                quantity > 0 ? <Tag color="#2db7f5" > {quantity} </Tag> : <Tag color="error" > {quantity} </Tag>
            )
        },
        {
            title: 'Số lượng',
            dataIndex: 'total',
            key: 'total',
            align: 'center',
            sorter: (a, b) => Number.parseInt(a.total) - Number.parseInt(b.total),
        },
        {
            title: 'Giảm tối đa',
            dataIndex: 'maxDiscountAmount',
            key: 'maxDiscountAmount',
            align: 'center',
            sorter: (a, b) => Number.parseInt(b.maxDiscountAmount) - Number.parseInt(a.maxDiscountAmount),
            render: text => text.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        },
        {
            title: 'Phần trăm giảm',
            dataIndex: 'discountAmount',
            key: 'discountAmount',
            align: 'center',
            sorter: (a, b) => Number.parseInt(b.discountAmount) - Number.parseInt(a.discountAmount),
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'expiredDate',
            key: 'expiredDate',
            align: 'center',
            render: expiredDate => {
                let duration = remainingTime(expiredDate);
                if (!duration) {
                    return `Đã hết hạn`;
                }
                else {
                    const days = Math.floor(duration.asDays()); // .asDays returns float but we are interested in full days only
                    const daysFormatted = days ? `${days} ` : '0'
                    return `Còn lại ${daysFormatted} ngày và ${duration.hours()} giờ`;
                }
            },
        },

        {
            title: "Hành động",
            dataIndex: "action",
            align: 'center',
            render: (text, record) => (
                <div>
                    <button className="p-2" onClick={() => handleEditingClick(record)}>
                        <EditOutlined style={{ fontSize: '20px', color: '#08c' }} />
                    </button>
                </div>
            ),
            width: '10%'
        }
    ];

    React.useEffect(() => {
        if(!isUpdate){
            return;
        }
        fetchData();
    }, [isUpdate])

    return (
        <div>
            {isLoading ?
                <div className="flex h-screen justify-center items-center">
                    <Spin size="large" />
                </div>
                :
                <>
                    <div className="flex justify-between py-5">
                        <h2 className="text-xl font-medium">Mã giảm giá</h2>
                        <VoucherAdding voucherList={voucherList} setVoucherList={setVoucherList} />
                    </div>
                    <VoucherEditing isOpen={isOpen} voucher={voucher} setUpdate={setUpdate} setOpen={setOpen} />
                    <VoucherTable columns={columns} data={voucherList} />
                </>

            }
        </div>
    );
}

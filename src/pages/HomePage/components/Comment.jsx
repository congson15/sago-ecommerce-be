import React from 'react';
import { StarFilled } from '@ant-design/icons';
import moment from 'moment';
const contentStyle = {
    color: '#000000',
    width: '100%',
    lineHeight: '80px',
    background: '#FFFFFF',
};
export function Comment({ review }) {
    return (
        <div style={contentStyle}>
            <div className='flex truncate justify-between'>
                <h2 className='text-lg truncate font-bold'>
                    {review.name}
                </h2>
                <span className='font-normal text-base mt-0.5'>{moment(review.createdAt).fromNow()}</span>
            </div>

            <div className='flex'>
                <StarFilled style={{ fontSize: '15px', color: '#FAAE42' }} className='mr-3' />
                <StarFilled style={{ fontSize: '15px', color: '#FAAE42' }} className='mr-3' />
                <StarFilled style={{ fontSize: '15px', color: '#FAAE42' }} className='mr-3' />
                <StarFilled style={{ fontSize: '15px', color: '#FAAE42' }} className='mr-3' />
                <StarFilled style={{ fontSize: '15px', color: '#FAAE42' }} />
            </div>
            <h2 className='text-xl'>{review.title}</h2>
            <p
                className='
            text-base
            break-all
            '>
                {review.title}
            </p>
            <p
                className='
            text-base
            '>
                Sản phẩm bình luận: <span className='font-bold'>{review.product}</span>
            </p>
        </div>
    );
}
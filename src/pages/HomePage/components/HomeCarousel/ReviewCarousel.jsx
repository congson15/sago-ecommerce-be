import React from 'react';
import { Carousel } from 'antd';
import { Comment } from '../Comment';

export function ReviewCarousel({ commentList }) {
    return (
        <Carousel autoplay dots={false}>
            {commentList.map((review) => (
                <Comment review={review} />
            ))}
        </Carousel>
    );
}

import React from 'react';
import { Skeleton } from 'antd';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Pagination, Navigation } from 'swiper';

import './index.css';

export default function SliderProduct(props) {
	return (
		<div className='slider-product'>
			{!props.loading && (
				<Swiper
					slidesPerView={1}
					spaceBetween={30}
					loop={true}
					pagination={{
						clickable: true,
					}}
					navigation={true}
					modules={[Pagination, Navigation]}
					className='mySwiper'
				>
					{!!props.item &&
						props.item.map((i, index) => (
							<SwiperSlide key={index}>
								<img
									className='md:rounded-2xl rounded-none'
									src={i}
								/>
							</SwiperSlide>
						))}

				</Swiper>
			)}
			{props.loading && (
				<Skeleton.Avatar className='slider-skeleton' active size='large' shape='square' />
			)}
		</div>
	);
}

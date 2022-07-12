import React, { useEffect, useState } from 'react';
import { Col, Row, Pagination, Button } from 'antd';
import { Search } from 'react-feather';

import Product from '../../components/product';
import SliderHome from '../../components/slider-home';
import SellButton from '../../components/sell-button';
import Empty from '../../components/empty';
import LoadingProduct from '../../components/loadingProduct';

import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../features/product/productSlice';

import './index.css';

export default function Home() {
	const [categoryActive, setActive] = useState('Semua');
	const [filterCategory, setCategory] = useState('');
	const [search, setSearch] = useState('');

	const { response, loading } = useSelector((state) => state.product.get);
	const dispatch = useDispatch();

	const paginationHandler = (current) => {
		const productName = search;
		const category = filterCategory;
		const page = current - 1;

		dispatch(getProduct({ productName, category, page }));
		window.scrollTo(0, 0);
	};

	const getAllProduct = () => {
		const page = 0;
		const productName = '';
		const category = '';

		setCategory('');
		setSearch('');

		dispatch(getProduct({ productName, category, page }));
	};

	const categoryHandler = (category) => {
		const page = 0;
		const productName = '';

		setCategory(category);
		setActive(category);

		dispatch(getProduct({ productName, category, page }));
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		getAllProduct();
	}, []);

	return (
		<>
			<Helmet>
				<title>SecondHand - Homepage</title>
				<meta name='description' content='Helmet application' />
			</Helmet>
			<SliderHome />
			<div className='product-section'>
				<div className='container'>
					<h2 className='text-base font-bold mt-10 mb-4'>
						Telusuri Kategori!
					</h2>
					<div className='flex mb-10 w-full md:overflow-auto overflow-x-scroll category-warpper'>
						<Button
							className={`${
								categoryActive == 'Semua' ? 'active' : ''
							} bg-[#E2D4F0] text-[#3C3C3C] border-0 py-3 px-6 h-12 flex items-center rounded-xl btn-category mr-4`}
							type='primary'
							icon={<Search className='mr-2' />}
							size='large'
							onClick={() => {
								getAllProduct(), setActive('Semua');
							}}
						>
							Semua
						</Button>
						<Button
							className={`${
								categoryActive == 'Hobi' ? 'active' : ''
							} bg-[#E2D4F0] text-[#3C3C3C] border-0 py-3 px-6 h-12 flex items-center rounded-xl btn-category mr-4`}
							type='primary'
							icon={<Search className='mr-2' />}
							size='large'
							onClick={() => categoryHandler('Hobi')}
						>
							Hobi
						</Button>
						<Button
							className={`${
								categoryActive == 'Kendaraan' ? 'active' : ''
							} bg-[#E2D4F0] text-[#3C3C3C] border-0 py-3 px-6 h-12 flex items-center rounded-xl btn-category mr-4`}
							type='primary'
							icon={<Search className='mr-2' />}
							size='large'
							onClick={() => categoryHandler('Kendaraan')}
						>
							Kendaraan
						</Button>
						<Button
							className={`${
								categoryActive == 'Baju' ? 'active' : ''
							} bg-[#E2D4F0] text-[#3C3C3C] border-0 py-3 px-6 h-12 flex items-center rounded-xl btn-category mr-4`}
							type='primary'
							icon={<Search className='mr-2' />}
							size='large'
							onClick={() => categoryHandler('Baju')}
						>
							Baju
						</Button>
						<Button
							className={`${
								categoryActive == 'Elektronik' ? 'active' : ''
							} bg-[#E2D4F0] text-[#3C3C3C] border-0 py-3 px-6 h-12 flex items-center rounded-xl btn-category mr-4`}
							type='primary'
							icon={<Search className='mr-2' />}
							size='large'
							onClick={() => categoryHandler('Elektronik')}
						>
							Elektronik
						</Button>
						<Button
							className={`${
								categoryActive == 'Kesehatan' ? 'active' : ''
							} bg-[#E2D4F0] text-[#3C3C3C] border-0 py-3 px-6 h-12 flex items-center rounded-xl btn-category mr-4`}
							type='primary'
							icon={<Search className='mr-2' />}
							size='large'
							onClick={() => categoryHandler('Kesehatan')}
						>
							Kesehatan
						</Button>
					</div>
					<Row gutter={[16, 16]} className='mb-10'>
						{!loading && response.length === 0 && <Empty />}
						{loading && <LoadingProduct />}
						{!loading &&
							!!response &&
							response.productResponses &&
							response.productResponses.length > 0 &&
							response.productResponses.map((i, index) => (
								<Col
									key={index}
									xs={{ span: 12 }}
									md={{ span: 6 }}
									lg={{ span: 4 }}
								>
									<Product
										img={i.imgUrl[0]}
										title={i.name}
										category={i.category}
										price={i.price}
										link={i.id}
									/>
								</Col>
							))}
					</Row>
					{!loading && !!response && response.totalPage > 1 && (
						<Pagination
							className='mb-10'
							onChange={paginationHandler}
							defaultCurrent={1}
							current={!!response && response.currentPage + 1}
							total={!!response && response.totalElement}
							pageSize={18}
						/>
					)}
				</div>
			</div>
			<SellButton />
		</>
	);
}

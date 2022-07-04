import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button } from 'antd';
import './index.css';

export default function SalerInformation(props) {
	const navigate = useNavigate();

	const handleProfile = () => {
		navigate('/profile');
	};

	return (
		<div
			className={`saler-information p-4 shadow-custom rounded-2xl flex justify-between items-center ${
				!props.mobile ? 'md:flex hidden' : 'md:hidden flex'
			}`}
		>
			<div className='saler-profile flex items-center'>
				<Avatar
					size={48}
					className='rounded-xl'
					src={props.user ? props.user.imgUrl : `https://ui-avatars.com/api/?name=${props.user.name}`}
				/>
				<div className='ml-4'>
					<p className='text-sm text-black mb-1'>{props.user.name}</p>
					<span className='text-[10px] text-[#8A8A8A] block leading-[14px]'>
						{props.user.cityName}
					</span>
				</div>
			</div>
			{props.edit && (
				<Button
					onClick={handleProfile}
					className='text-xs py-1 px-3 rounded-lg'
					type='primary'
					ghost
				>
					Edit
				</Button>
			)}
		</div>
	);
}

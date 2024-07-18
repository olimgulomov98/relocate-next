import React from 'react';
import { Box, Stack } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const Choose = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>Choose section</div>;
	} else {
		return (
			<Stack className={'choose'}>
				<Stack className="container">
					<Stack className="info-box">
						<Stack className="left" textAlign={'center'}>
							<span>Why Choose Us?</span>
							<p>The best booking platform you can trust</p>
						</Stack>
					</Stack>
					<Stack className={'box-wrap'}>
						<div className={'choose-box'}>
							<img src="./img/icons/chooseImg1.svg" alt="" />
							<h3>Security Assurance</h3>
							<p>Demonstrates commitment to user data security through encryption and secure payment practices</p>
						</div>
						<div className={'choose-box'} style={{ background: '#fdf3fa' }}>
							<img src="./img/icons/chooseImg2.svg" alt="" />
							<h3>24/7 Support</h3>
							<p>Demonstrates commitment to user data security through encryption and secure payment practices</p>
						</div>
						<div className={'choose-box'} style={{ background: '#e2f0ff' }}>
							<img src="./img/icons/chooseImg3.svg" alt="" />
							<h3>Excellent Agreement</h3>
							<p>Demonstrates commitment to user data security through encryption and secure payment practices</p>
						</div>
						<div className={'choose-box'} style={{ background: '#f7f3fd' }}>
							<img src="./img/icons/chooseImg4.svg" alt="" />
							<h3>All Information</h3>
							<p>Demonstrates commitment to user data security through encryption and secure payment practices</p>
						</div>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Choose;

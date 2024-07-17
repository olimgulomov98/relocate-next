import React from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const Choose = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>Choose section</div>;
	} else {
		return (
			<Stack className={'choose'}>
				<Stack className="container">
					<img src="./img/home1section.png" alt="" />
				</Stack>
			</Stack>
		);
	}
};

export default Choose;

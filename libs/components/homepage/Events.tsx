import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const Events = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<Stack className={'events'}>
				<Stack className={'container'}>
					<div className={'left'}>
						<Typography className={'title'}>Luxury Travel Redifined: Your Passport to Global Glamour</Typography>
						<Typography className={'desc'}>
							Discover how you can offset your adventure's carbon emissions and support the sustainable initiatives
							practiced by our operators worldwide.
						</Typography>
					</div>
					<div className={'right'}>
						<img src="./img/events/img1.png" alt="" />
						<div>
							<img src="./img/events/img2.png" alt="" style={{ marginBottom: '40px' }} />
							<img src="./img/events/img3.png" alt="" />
						</div>
						<div>
							<img src="./img/events/img4.png" alt="" style={{ marginBottom: '10px' }} />
							<img src="./img/events/img5.png" alt="" />
						</div>
					</div>
				</Stack>
			</Stack>
		);
	}
};

export default Events;

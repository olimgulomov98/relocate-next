import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

export default function FiberContainer() {
	return (
		<Stack className={'fiber-container'}>
			<Stack>
				<Typography className={'title'}>
					Unleash Your Wanderlust <br /> Book Your Next Journey
				</Typography>
				<Typography className={'description'}>
					Crafting Exceptional Journeys: Your Global Escape Planner. <br />
					Unleash Your Wanderlust: Seamless Travel, Extraordinary Adventures
				</Typography>
			</Stack>
			<Stack className={'fiber-img'}>
				<img src="./img/fiber/image1.png" alt="" className="box-img" />
				<img src="./img/fiber/image2.png" alt="" className="box-img" />
				<img src="./img/fiber/image3.png" alt="" className="box-img" />
			</Stack>
		</Stack>
	);
}

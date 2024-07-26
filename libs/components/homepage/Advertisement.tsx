import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box, Stack } from '@mui/material';
import { Image } from '@mui/icons-material';

const Advertisement = () => {
	const device = useDeviceDetect();

	if (device == 'mobile') {
		return (
			<Stack className={'advertisement-frame'}>
				<Stack direction={'row'} justifyContent={'space-between'}>
					<div className="big-city">
						<img src="./img/banner/cities/BUSAN.webp" alt="" />
						<span>DUBAI</span>
					</div>
					<video autoPlay muted loop playsInline preload="auto">
						<source src="/video/ads.mov" type="video/mp4" />
					</video>
					<div className="big-city">
						<p>capital city</p>
						<img src="./img/banner/cities/SEOUL.webp" alt="" />
						<span>ABU DHABI</span>
					</div>
				</Stack>

				<Stack direction={'row'} justifyContent={'space-between'}>
					<div className="small-city">
						<img src="./img/banner/cities/DAEGU.webp" alt="" />
						<span>Sharjah</span>
					</div>
					<div className="small-city">
						<img src="./img/banner/cities/JEJU.webp" alt="" />
						<span>Ajman</span>
					</div>
					<div className="small-city">
						<img src="./img/banner/cities/GWANGJU.webp" alt="" />
						<span>Ras Aa Khaimah</span>
					</div>
					<div className="small-city">
						<img src="./img/banner/cities/INCHEON.webp" alt="" />
						<span>Umm Al Quwain</span>
					</div>
					<div className="small-city">
						<img src="./img/banner/cities/CHONJU.webp" alt="" />
						<span>Fujairah</span>
					</div>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'advertisement-frame'}>
				<Stack direction={'row'} justifyContent={'space-between'}>
					<div className="big-city">
						<img src="./img/banner/cities/DUBAI.webp" alt="" />
						<span>DUBAI</span>
					</div>
					<video autoPlay muted loop playsInline preload="auto">
						<source src="/video/ads.mov" type="video/mp4" />
					</video>
					<div className="big-city">
						<p>capital city</p>
						<img src="./img/banner/cities/ABU_DHABI.webp" alt="" />
						<span>ABU DHABI</span>
					</div>
				</Stack>

				<Stack direction={'row'} justifyContent={'space-between'}>
					<div className="small-city">
						<img src="./img/banner/cities/SHARJAH.webp" alt="" />
						<span>Sharjah</span>
					</div>
					<div className="small-city">
						<img src="./img/banner/cities/AJMAN.webp" alt="" />
						<span>Ajman</span>
					</div>
					<div className="small-city">
						<img src="./img/banner/cities/RAS_AL_KHAIMAH.webp" alt="" />
						<span>Ras Al Khaimah</span>
					</div>
					<div className="small-city">
						<img src="./img/banner/cities/UMM_AL_QUWAIN.webp" alt="" />
						<span>Umm Al Quwain</span>
					</div>
					<div className="small-city">
						<img src="./img/banner/cities/FUJAIRAH.webp" alt="" />
						<span>Fujairah</span>
					</div>
				</Stack>
			</Stack>
		);
	}
};

export default Advertisement;

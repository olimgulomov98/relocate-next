import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Head from 'next/head';
import Top from '../Top';
import Footer from '../Footer';
import { Stack } from '@mui/material';
import { getJwtToken, updateUserInfo } from '../../auth';
import Chat from '../Chat';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useTranslation } from 'next-i18next';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const withLayoutBasic = (Component: any) => {
	return (props: any) => {
		const router = useRouter();
		const { t, i18n } = useTranslation('common');
		const device = useDeviceDetect();
		const [authHeader, setAuthHeader] = useState<boolean>(false);
		const user = useReactiveVar(userVar);

		const memoizedValues = useMemo(() => {
			let title = '',
				desc = '',
				bgImage = '';

			switch (router.pathname) {
				case '/property':
					title = 'All Hotels';
					desc = 'We are glad to see you again!';
					bgImage = '/img/banner/propertyPage.jpg';
					break;
				case '/agent':
					title = 'Realtors';
					desc = 'you can check all Realtors!';
					bgImage = '/img/banner/agentsPage.jpg';
					break;
				case '/agent/detail':
					title = 'Realtor Page';
					desc = `you can see Agent's information!`;
					bgImage = '/img/banner/header2.svg';
					break;
				case '/mypage':
					title = 'My Profile';
					desc = 'You can see your profile!';
					bgImage = '/img/banner/myPage.jpg';
					break;
				case '/community':
					title = 'Community';
					desc = 'Any kind of Articles!';
					bgImage = '/img/banner/header2.svg';
					break;
				case '/community/detail':
					title = 'Community Detail';
					desc = 'you can see the detail of article!';
					bgImage = '/img/banner/header2.svg';
					break;
				case '/cs':
					title = 'CS';
					desc = 'We are glad to see you again!';
					bgImage = '/img/banner/csPage.jpg';
					break;
				case '/account/join':
					title = 'Login/Signup';
					desc = 'Authentication Process';
					bgImage = '/img/banner/header2.svg';
					setAuthHeader(true);
					break;
				case '/member':
					title = 'Member Profile';
					desc = `you can see all information!`;
					bgImage = '/img/banner/myPage.jpg';
					break;
				default:
					break;
			}

			return { title, desc, bgImage };
		}, [router.pathname]);

		/** LIFECYCLES **/
		useEffect(() => {
			const jwt = getJwtToken();
			if (jwt) updateUserInfo(jwt);
		}, []);

		/** HANDLERS **/

		if (device == 'mobile') {
			return (
				<>
					<Head>
						<title>Relocate</title>
						<meta name={'title'} content={`Relocate`} />
					</Head>
					<Stack id="mobile-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		} else {
			return (
				<>
					<Head>
						<title>Relocate</title>
						<meta name={'title'} content={`Relocate`} />
					</Head>
					<Stack id="pc-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack
							className={`header-basic ${authHeader && 'auth'}`}
							style={{
								backgroundImage: `url(${memoizedValues.bgImage})`,
								backgroundSize: 'cover',
							}}
						>
							<Stack className={'container'}>
								<strong>{t(memoizedValues.title)}</strong>
								<span>{t(memoizedValues.desc)}</span>
							</Stack>
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						{user?._id && <Chat />}

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		}
	};
};

export default withLayoutBasic;

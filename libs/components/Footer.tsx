import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import useDeviceDetect from '../hooks/useDeviceDetect';
import { Stack, Box } from '@mui/material';
import moment from 'moment';

const Footer = () => {
	const device = useDeviceDetect();

	if (device == 'mobile') {
		return (
			<>
				<Stack className={'sea-frame'}>
					<img src="./img/Rectangle.png" alt="" className="rectangle" />
					<img src="/img/sea.png" alt="" />
				</Stack>
				<Stack className={'footer-container'}>
					<Stack className={'main'}>
						<Stack className={'left'}>
							<Box component={'div'} className={'footer-box'}>
								<img src="/img/logo/logoWhite.svg" alt="" className={'logo'} />
							</Box>
							<Box component={'div'} className={'footer-box'}>
								<span>total free customer care</span>
								<p>+971 52 394 7515</p>
							</Box>
							<Box component={'div'} className={'footer-box'}>
								<span>nee live</span>
								<p>+971 52 394 7515</p>
								<span>Support?</span>
							</Box>
							<Box component={'div'} className={'footer-box'}>
								<p>follow us on social media</p>
								<div className={'media-box'}>
									<FacebookOutlinedIcon />
									<TelegramIcon />
									<InstagramIcon />
									<TwitterIcon />
								</div>
							</Box>
						</Stack>
						<Stack className={'right'}>
							<Box component={'div'} className={'bottom'}>
								<div>
									<strong>Popular Search</strong>
									<span>Property for Rent</span>
									<span>Property Low to hide</span>
								</div>
								<div>
									<strong>Quick Links</strong>
									<span>Terms of Use</span>
									<span>Privacy Policy</span>
									<span>Pricing Plans</span>
									<span>Our Services</span>
									<span>Contact Support</span>
									<span>FAQs</span>
								</div>
								<div>
									<strong>Discover</strong>
									<span>Dubai</span>
									<span>Abu Dhabi</span>
									<span>Ajman</span>
									<span>Fujairah</span>
									<span>Sharjah</span>
								</div>
							</Box>
						</Stack>
					</Stack>
					<Stack className={'second'}>
						<span>© Relocate - All rights reserved. Relocate {moment().year()}</span>
					</Stack>
				</Stack>
			</>
		);
	} else {
		return (
			<>
				<Stack className={'sea-frame'}>
					<img src="/img/Rectangle.png" alt="" className="rectangle" />
					<img src="/img/sea.png" alt="" />
				</Stack>
				<Stack className={'footer-container'}>
					<Stack className={'main'}>
						<Stack className={'left'}>
							<Box component={'div'} className={'footer-box'}>
								<img src="/img/logo/logoWhite.svg" alt="" className={'logo'} />
							</Box>
							<Box component={'div'} className={'footer-box'}>
								<span>total free customer care</span>
								<p>+971 52 394 7515</p>
							</Box>
							<Box component={'div'} className={'footer-box'}>
								<span>nee live</span>
								<p>+971 52 394 7515</p>
								<span>Support?</span>
							</Box>
							<Box component={'div'} className={'footer-box'}>
								<p>follow us on social media</p>
								<div className={'media-box'}>
									<FacebookOutlinedIcon />
									<TelegramIcon />
									<InstagramIcon />
									<TwitterIcon />
								</div>
							</Box>
						</Stack>
						<Stack className={'right'}>
							<Box component={'div'} className={'top'}>
								<strong>keep yourself up to date</strong>
								<div>
									<input type="text" placeholder={'Your Email'} />
									<span>Subscribe</span>
								</div>
							</Box>
							<Box component={'div'} className={'bottom'}>
								<div>
									<strong>Popular Search</strong>
									<span>Property for Rent</span>
									<span>Property Low to hide</span>
								</div>
								<div>
									<strong>Quick Links</strong>
									<span>Terms of Use</span>
									<span>Privacy Policy</span>
									<span>Pricing Plans</span>
									<span>Our Services</span>
									<span>Contact Support</span>
									<span>FAQs</span>
								</div>
								<div>
									<strong>Discover</strong>
									<span>Dubai</span>
									<span>Abu Dhabi</span>
									<span>Ajman</span>
									<span>Fujairah</span>
									<span>Sharjah</span>
								</div>
							</Box>
						</Stack>
					</Stack>
					<Stack className={'second'}>
						<span>© Relocate - All rights reserved. Relocate {moment().year()}</span>
						<span>Privacy · Terms · Sitemap</span>
					</Stack>
				</Stack>
			</>
		);
	}
};

export default Footer;

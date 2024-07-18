import React from 'react';
import Link from 'next/link';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box, Button } from '@mui/material';
import Moment from 'react-moment';
import { BoardArticle } from '../../types/board-article/board-article';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface CommunityCardProps {
	vertical: boolean;
	article: BoardArticle;
	index: number;
}

const CommunityCard = (props: CommunityCardProps) => {
	const { vertical, article, index } = props;
	const device = useDeviceDetect();
	const articleImage = article?.articleImage
		? `${process.env.REACT_APP_API_URL}/${article?.articleImage}`
		: '/img/event.svg';

	const writerImage = article?.memberData?.memberImage
		? `${process.env.REACT_APP_API_URL}/${article?.memberData?.memberImage}`
		: '/img/profile/defaultUser.svg';

	if (device === 'mobile') {
		return <div>COMMUNITY CARD (MOBILE)</div>;
	} else {
		if (vertical) {
			return (
				<Box component={'div'} className={'vertical-card'}>
					<div className={'community-img'} style={{ backgroundImage: `url(${articleImage})` }}>
						<div>{article?.articleCategory}</div>
					</div>
					<div className="info">
						<div className="info-top">
							<div>
								<CalendarMonthIcon sx={{ fontSize: '16px', marginRight: '5px', paddingBottom: '2px' }} />
								<Moment format="DD.MM.YY">{article?.createdAt}</Moment>
							</div>
							<div>
								<AccessTimeIcon sx={{ fontSize: '16px', marginRight: '5px', paddingBottom: '2px' }} />
								<Moment format="HH:mm">{article?.createdAt}</Moment>
							</div>
							<span>
								{article?.articleComments} comment{article?.articleComments > 1 ? 's' : ''}
							</span>
						</div>
						<strong>{article?.articleTitle}</strong>
						<div className={'info-down'}>
							<img src={writerImage} alt="" />
							<span>{article?.memberData?.memberNick}</span>
						</div>
						<Link href={`/community/detail?articleCategory=${article?.articleCategory}&id=${article?._id}`}>
							<Button className={'info-btn'}>Keep reading</Button>
						</Link>
					</div>
				</Box>
			);
		} else {
			return (
				<Box component={'div'} className={'horizantal-card'}>
					<div className={'community-img'} style={{ backgroundImage: `url(${articleImage})` }}>
						<div>{article?.articleCategory}</div>
					</div>
					<div className="info">
						<div className="info-top">
							<div>
								<CalendarMonthIcon sx={{ fontSize: '16px', marginRight: '5px', paddingBottom: '2px' }} />
								<Moment format="DD.MM.YY">{article?.createdAt}</Moment>
							</div>
							<div>
								<AccessTimeIcon sx={{ fontSize: '16px', marginRight: '5px', paddingBottom: '2px' }} />
								<Moment format="HH:mm">{article?.createdAt}</Moment>
							</div>
							<span>
								{article?.articleComments} comment{article?.articleComments > 1 ? 's' : ''}
							</span>
						</div>
						<strong>{article?.articleTitle}</strong>
						<div className={'info-down'}>
							<img src={writerImage} alt="" />
							<span>{article?.memberData?.memberNick}</span>
						</div>
						<Link href={`/community/detail?articleCategory=${article?.articleCategory}&id=${article?._id}`}>
							<Button className={'info-btn'}>Keep reading</Button>
						</Link>
					</div>
				</Box>
			);
		}
	}
};

export default CommunityCard;

import React from 'react';
import { Stack, Box, Divider, Typography, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Property } from '../../types/property/property';
import { REACT_APP_API_URL, topPropertyRank } from '../../config';
import { formatterStr } from '../../utils';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PinDropIcon from '@mui/icons-material/PinDrop';

interface PropertyBigCardProps {
	property: Property;
	likePropertyHandler?: any;
}

const PropertyBigCard = (props: PropertyBigCardProps) => {
	const { property, likePropertyHandler } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const router = useRouter();
	const agentImage = property?.memberData?.memberImage
		? `${process.env.REACT_APP_API_URL}/${property?.memberData?.memberImage}`
		: '/img/profile/defaultUser.svg';

	/** HANDLERS **/
	const goPropertyDetatilPage = (propertyId: string) => {
		router.push(`/property/detail?id=${propertyId}`);
	};

	const pushDetailHandler = async (propertyId: string) => {
		console.log('propertyId: ', propertyId);
		await router.push({ pathname: '/property/detail', query: { id: propertyId } });
	};

	if (device === 'mobile') {
		return <div>APARTMENT BIG CARD</div>;
	} else {
		return (
			<Stack className="property-big-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages?.[0]})` }}
				>
					{property && property?.propertyRank >= topPropertyRank && (
						<div className={'status'}>
							<img src="/img/icons/electricity.webp" alt="" />
							<span>top</span>
						</div>
					)}
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>{property?.propertyTitle}</strong>
					<p className={'desc'}>
						<PinDropIcon className={'locationIcon'} />
						{property?.propertyAddress}
					</p>
					<div className={'options'}>
						<div>
							<img src="/img/icons/bed.svg" alt="" />
							<span>{property?.propertyBeds} bed</span>
						</div>
						<div>
							<img src="/img/icons/room.svg" alt="" />
							<span>{property?.propertyRooms} rooms</span>
						</div>
						<div>
							<img src="/img/icons/expand.svg" alt="" />
							<span>{property?.propertySquare} m2</span>
						</div>
					</div>
					<div className={'bott'}>
						<div className={'price'}>
							${property?.propertyPrice} <span>/ night</span>
						</div>
						<div className="buttons-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
							<IconButton
								color={'default'}
								onClick={(e) => {
									e.stopPropagation();
									likePropertyHandler(user, property?._id);
								}}
							>
								{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{property?.propertyLikes}</Typography>
						</div>
					</div>
					<div className={'agent'}>
						<div>
							<img src={agentImage} alt="" />
							<p style={{ textAlign: 'center' }}>{property.memberData?.memberNick}</p>
						</div>
						<div className={'rent'}>
							{property?.propertyBook ? <p>Book</p> : <span>Book</span>}
							{property?.propertyRent ? <p>Rent</p> : <span>Rent</span>}
						</div>
						<Button className="book-btn" onClick={() => goPropertyDetatilPage(property?._id)}>
							Book now
						</Button>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default PropertyBigCard;

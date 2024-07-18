import React from 'react';
import { Stack, Typography, Box, Button } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Property } from '../../types/property/property';
import Link from 'next/link';
import { formatterStr } from '../../utils';
import { REACT_APP_API_URL, topPropertyRank } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface PropertyCardType {
	property: Property;
	likePropertyHandler?: any;
	myFavorites?: boolean;
	recentlyVisited?: boolean;
}

const PropertyCard = (props: PropertyCardType) => {
	const { property, likePropertyHandler, myFavorites, recentlyVisited } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = property?.propertyImages[0]
		? `${REACT_APP_API_URL}/${property?.propertyImages[0]}`
		: '/img/banner/header1.svg';

	if (device === 'mobile') {
		return <div>PROPERTY CARD</div>;
	} else {
		return (
			<Stack className="card-config">
				<Stack className="card-left">
					<img className="card-img" src={imagePath} alt="" />
					{property && property?.propertyRank > topPropertyRank && (
						<Box component={'div'} className={'top-badge'}>
							<img src="./img/icons/electricity.webp" alt="" />
							<Typography>TOP</Typography>
						</Box>
					)}
				</Stack>
				<Stack className="card-right">
					<Stack className="name-address">
						<Stack className="name">
							<Typography>{property.propertyTitle}</Typography>
							{!recentlyVisited && (
								<Stack className="buttons">
									<IconButton color={'default'}>
										<RemoveRedEyeIcon />
									</IconButton>
									<Typography className="view-cnt">{property?.propertyViews}</Typography>
									<IconButton color={'default'} onClick={() => likePropertyHandler(user, property?._id)}>
										{myFavorites ? (
											<FavoriteIcon color="primary" />
										) : property?.meLiked && property?.meLiked[0]?.myFavorite ? (
											<FavoriteIcon color="primary" />
										) : (
											<FavoriteBorderIcon />
										)}
									</IconButton>
									<Typography className="view-cnt">{property?.propertyLikes}</Typography>
								</Stack>
							)}
						</Stack>
						<Stack className="address">
							<Typography>
								{property.propertyAddress}, {property.propertyLocation}
							</Typography>
						</Stack>
					</Stack>
					<Stack className="options">
						<Stack className="option">
							<img src="/img/icons/bed.svg" alt="" /> <Typography>{property.propertyBeds} bed</Typography>
						</Stack>
						<Stack className="option">
							<img src="/img/icons/room.svg" alt="" /> <Typography>{property.propertyRooms} room</Typography>
						</Stack>
						<Stack className="option">
							<img src="/img/icons/expand.svg" alt="" /> <Typography>{property.propertySquare} m2</Typography>
						</Stack>
					</Stack>
					{/* <Stack className="divider"></Stack> */}
					<Stack className="type-buttons">
						<Stack className="type">
							<Typography
								sx={{ fontWeight: 500, fontSize: '14px' }}
								className={property.propertyRent ? '' : 'disabled-type'}
							>
								Rent
							</Typography>
							<Typography
								sx={{ fontWeight: 500, fontSize: '14px' }}
								className={property.propertyBarter ? '' : 'disabled-type'}
							>
								Barter
							</Typography>
						</Stack>
					</Stack>
					<Stack className={'price-wrap'}>
						<Typography>
							${formatterStr(property?.propertyPrice)} <span>/night</span>
						</Typography>
						<Link
							href={{
								pathname: '/property/detail',
								query: { id: property?._id },
							}}
						>
							<Button className={'book-btn'}>Book now</Button>
						</Link>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default PropertyCard;

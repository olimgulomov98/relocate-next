import React, { useState } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Stack, Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { REACT_APP_API_URL } from '../../config';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import { sweetErrorHandling } from '../../sweetAlert';

interface AgentCardProps {
	agent: any;
	likeMemberHandler: any;
}

const AgentCard = (props: AgentCardProps) => {
	const { agent, likeMemberHandler } = props;
	const router = useRouter();
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = agent?.memberImage
		? `${REACT_APP_API_URL}/${agent?.memberImage}`
		: '/img/profile/defaultUser.svg';

	/** HANDLERS **/
	const redirectToMemberPageHandler = async (memberId: string) => {
		try {
			if (memberId === user?._id) await router.push(`/mypage?memberId=${memberId}`);
			else await router.push(`/member?memberId=${memberId}`);
		} catch (error) {
			await sweetErrorHandling(error);
		}
	};

	if (device === 'mobile') {
		return <div>AGENT CARD</div>;
	} else {
		return (
			<Stack className="agent-general-card">
				<Box
					component={'div'}
					className={'agent-img'}
					style={{
						backgroundImage: `url(${imagePath})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
					}}
				></Box>

				<Stack className={'agent-desc'}>
					<Box component={'div'} className={'agent-info'}>
						<strong>{agent?.memberFullName ?? agent?.memberNick}</strong>
						<span>Agent</span>
					</Box>
					<div className={'agent-properties'}>
						{agent?.memberProperties} propert{agent?.memberProperties > 1 ? 'ies' : 'y'}
					</div>

					<Box component={'div'} className={'detail-wrap'}>
						<Box component={'div'} className={'buttons'}>
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{agent?.memberViews}</Typography>
							<IconButton color={'default'} onClick={() => likeMemberHandler(user, agent?._id)}>
								{agent?.meLiked && agent?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon sx={{ color: 'red' }} />
								) : (
									<FavoriteBorderIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{agent?.memberLikes}</Typography>
						</Box>
						{/* <Link
							href={{
								pathname: '/agent/detail',
								query: { agentId: agent?._id },
							}}
						> */}
						<Button className={'detail-btn'} onClick={() => redirectToMemberPageHandler(agent?._id as string)}>
							View Profile
						</Button>
						{/* </Link> */}
					</Box>
				</Stack>
			</Stack>
		);
	}
};

export default AgentCard;

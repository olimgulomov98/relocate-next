import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useQuery, useReactiveVar } from '@apollo/client';
import { GET_NOTIFICATIONS } from '../../apollo/user/query';
import { T } from '../types/common';
import { useState } from 'react';
import { userVar } from '../../apollo/store';
import { Notification } from '../types/notification/notification';
import { Badge, Box, Button, Stack } from '@mui/material';
import AccessibleIcon from '@mui/icons-material/Accessible';
import { NotificationStatus } from '../enums/notification.enum';

const BasicPopover = () => {
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const user = useReactiveVar(userVar);
	const [notification, setNotification] = useState<Notification[]>([]);

	// Apollo
	const {
		loading: getNotificationsLoading,
		data: getNotificationsData,
		error: getNotificationsError,
		refetch: getNotificationsRefetch,
	} = useQuery(GET_NOTIFICATIONS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: '' },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if (data?.getNotifications) setNotification(data?.getNotifications);
		},
	});

	/** LIFECYCLES **/

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	console.log('user', user);
	return (
		<div>
			<Badge
				badgeContent={
					notification?.filter(
						(ele) => ele.receiverId === user._id && ele.notificationStatus === NotificationStatus.WAIT,
					).length
				}
				color="secondary"
			>
				<Button onClick={handleClick}>
					<NotificationsOutlinedIcon />
				</Button>
			</Badge>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
			>
				<Typography sx={{ p: 2, width: '500px', height: '100%', color: 'black', border: '2px solid green' }}>
					{notification?.map((ele: Notification) => {
						if (ele.receiverId === user._id) {
							return (
								<Stack key={ele._id} width={'400px'} height={'100%'} border={'2px solid red'}>
									<div>{ele.notificationTitle}</div>
									<div>{ele.notificationDesc}</div>
								</Stack>
							);
						}
					})}
				</Typography>
			</Popover>
		</div>
	);
};

export default BasicPopover;

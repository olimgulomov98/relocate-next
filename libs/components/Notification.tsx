import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { GET_NOTIFICATIONS } from '../../apollo/user/query';
import { T } from '../types/common';
import { Notification } from '../types/notification/notification';
import { userVar } from '../../apollo/store';
import { Badge, Box, Button, Stack } from '@mui/material';
import { NotificationStatus } from '../enums/notification.enum';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { MARK_NOTIFICATION_READ } from '../../apollo/user/mutation';
dayjs.extend(relativeTime);
dayjs.locale('ko');

export default function BasicPopover() {
	const user = useReactiveVar(userVar);
	const router = useRouter();
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const [notification, setNotification] = React.useState<Notification[]>([]);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>, notificationId: string) => {
		setAnchorEl(event.currentTarget);
		// markNotificationsAsRead();
	};

	const [markNotificationAsRead] = useMutation(MARK_NOTIFICATION_READ, {
		onCompleted: () => {
			getNotificationsRefetch(); // 성공적으로 업데이트 후 알림 다시 가져오기
		},
		onError: (error) => {
			console.error('Error updating notifications:', error);
		},
	});

	const handleClickRead = (notification: Notification) => {
		markNotificationAsRead({
			variables: { notificationId: notification._id },
			onCompleted: () => {
				// Redirect to the member page after marking as read
				switch (notification.notificationGroup) {
					case 'MEMBER':
						router.push(`/member?memberId=${notification.authorId}`);
						break;
					case 'PROPERTY':
						router.push(`/property/detail?id=${notification.propertyId}`);
						break;
					case 'ARTICLE':
						router.push(`/property/detail?id=${notification.articleId}`);
						break;
					default:
						router.push(`/member?memberId=${notification.authorId}`);
				}

				getNotificationsRefetch();
			},
		});
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	console.log(notification);

	const {
		loading: getNotificationsLoading,
		data: getNotificationsData,
		error: getNotificationsError,
		refetch: getNotificationsRefetch,
	} = useQuery(GET_NOTIFICATIONS, {
		fetchPolicy: 'cache-and-network',
		variables: { userId: user._id },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if (data?.getNotificationsByUserId) setNotification(data?.getNotificationsByUserId);
		},
	});

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
				<NotificationsOutlinedIcon style={{ cursor: 'pointer' }} onClick={handleClick} />
			</Badge>

			<Popover
				sx={{ marginTop: 5 }}
				style={{ height: '500px' }}
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				{notification?.map((ele: Notification) => {
					if (ele.receiverId === user._id) {
						return (
							<Stack key={ele._id} sx={{ m: 3, cursor: 'pointer' }} onClick={() => handleClickRead(ele)}>
								<div
									style={{
										background: ele.notificationStatus === NotificationStatus.READ ? 'white' : '#e0dfdf',
										padding: '15px',
										borderRadius: '15px',
										border: '1px solid black',
										width: '400px',
									}}
								>
									<Typography>{ele.notificationTitle}</Typography>
									<Typography>{ele.notificationDesc}</Typography>
									<Typography variant="body2" color="textSecondary">
										{dayjs(ele.createdAt).fromNow()}
									</Typography>
								</div>
							</Stack>
						);
					}
				})}
			</Popover>
		</div>
	);
}

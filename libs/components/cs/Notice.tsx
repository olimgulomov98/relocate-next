import React from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useQuery } from '@apollo/client';
import { GET_NOTICE } from '../../../apollo/admin/query';
import { Notices } from '../../types/notice/notice';
import moment from 'moment';

const Notice = () => {
	const device = useDeviceDetect();

	/** APOLLO REQUESTS **/
	const {
		loading: getNoticeLoading,
		data: getNoticeData,
		error: getNoticeError,
		refetch: getNoticeRefetch,
	} = useQuery(GET_NOTICE, {
		fetchPolicy: 'cache-and-network',
		variables: {
			input: '',
		},

		// onCompleted: (data: T) => {
		// 	if (data?.getNotice) setSelect(data?.getNotice);
		// },
	});

	/** LIFECYCLES **/
	/** HANDLERS **/

	if (device === 'mobile') {
		return <div>NOTICE MOBILE</div>;
	} else {
		return (
			<Stack className={'notice-content'}>
				<span className={'title'}>Notice</span>
				<Stack className={'main'}>
					<Box component={'div'} className={'top'}>
						<span>number</span>
						<span>title</span>
						<span>content</span>
						<span>date</span>
					</Box>
					<Stack className={'bottom'}>
						{getNoticeData?.getNotice.map((ele: Notices, index: any) => (
							<div className={`notice-card`} key={ele._id}>
								<span className={'notice-number'}>{index + 1}</span>
								<span className={'notice-title'}>{ele.noticeTitle}</span>
								<span className={'notice-content'}>{ele.noticeContent}</span>
								<span className={'notice-date'}>{moment(ele.createdAt).format('YYYY MM DD')}</span>
							</div>
						))}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Notice;

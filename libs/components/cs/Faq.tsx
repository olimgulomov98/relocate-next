import React, { SyntheticEvent, useState } from 'react';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { AccordionDetails, Box, Stack, Typography } from '@mui/material';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { useQuery } from '@apollo/client';
import { GET_FAQ } from '../../../apollo/admin/query';
import { Faqs } from '../../types/faq/faq';
import { FaqCategory } from '../../enums/faq.enum';

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
	({ theme }) => ({
		border: `1px solid ${theme.palette.divider}`,
		'&:not(:last-child)': {
			borderBottom: 0,
		},
		'&:before': {
			display: 'none',
		},
	}),
);
const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: '1.4rem' }} />} {...props} />
))(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#005351',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(180deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}));

const Faq = () => {
	const device = useDeviceDetect();
	const router = useRouter();
	const [category, setCategory] = useState<FaqCategory>(FaqCategory.PROPERTY);
	const [expanded, setExpanded] = useState<string | false>('panel1');

	/** APOLLO REQUESTS **/

	const {
		loading: getFaqLoading,
		data: getFaqData,
		error: getFaqError,
		refetch: getFaqRefetch,
	} = useQuery(GET_FAQ, {
		fetchPolicy: 'cache-and-network',
		variables: {
			input: '',
		},
	});

	/** LIFECYCLES **/

	/** HANDLERS **/
	const changeCategoryHandler = (category: FaqCategory) => {
		setCategory(category);
	};

	const handleChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};

	if (device === 'mobile') {
		return <div>FAQ MOBILE</div>;
	} else {
		return (
			<Stack className={'faq-content'}>
				<Box className={'categories'} component={'div'}>
					<div
						className={category === 'PROPERTY' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler(FaqCategory.PROPERTY);
						}}
					>
						Property
					</div>
					<div
						className={category === 'PAYMENT' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler(FaqCategory.PAYMENT);
						}}
					>
						Payment
					</div>
					<div
						className={category === 'FOR_BUYERS' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler(FaqCategory.FOR_BUYERS);
						}}
					>
						Foy Buyers
					</div>
					<div
						className={category === 'FOR_REALTORS' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler(FaqCategory.FOR_REALTORS);
						}}
					>
						For Realtors
					</div>
					<div
						className={category === 'MEMBERSHIP' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler(FaqCategory.MEMBERSHIP);
						}}
					>
						Membership
					</div>
					<div
						className={category === 'COMMUNITY' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler(FaqCategory.COMMUNITY);
						}}
					>
						Community
					</div>
					<div
						className={category === 'OTHER' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler(FaqCategory.OTHER);
						}}
					>
						Other
					</div>
				</Box>
				<Box className={'wrap'} component={'div'}>
					{getFaqData?.getFaq
						.filter((ele: Faqs) => ele.faqCategory === category)
						.map((ele: Faqs) => (
							<Accordion expanded={expanded === ele._id} onChange={handleChange(ele._id)} key={ele.faqQuestion}>
								<AccordionSummary id="panel1d-header" className="question" aria-controls="panel1d-content">
									<Typography className="badge" variant={'h4'}>
										Q
									</Typography>
									<Typography className="desc"> {ele.faqQuestion}</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Stack className={'answer flex-box'}>
										<Typography className="badge" variant={'h4'} color={'primary'}>
											A
										</Typography>
										<Typography className="desc"> {ele.faqAnswer}</Typography>
									</Stack>
								</AccordionDetails>
							</Accordion>
						))}
				</Box>
			</Stack>
		);
	}
};

export default Faq;

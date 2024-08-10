import React from 'react';
import { useRouter } from 'next/router';
import { TableCell, TableHead, TableBody, TableRow, Table, TableContainer, Button } from '@mui/material';
import { Stack } from '@mui/material';
import { FaqInput } from '../../../types/faq/faq.input';
import moment from 'moment';

interface Data {
	category: string;
	question: string;
	answer: string;
	date: string;
	status: string;
	id?: string;
}

type Order = 'asc' | 'desc';

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: 'category',
		numeric: true,
		disablePadding: false,
		label: 'Number',
	},
	{
		id: 'question',
		numeric: true,
		disablePadding: false,
		label: 'QUESTION',
	},

	{
		id: 'answer',
		numeric: true,
		disablePadding: false,
		label: 'ANSWER',
	},

	{
		id: 'category',
		numeric: true,
		disablePadding: false,
		label: 'CATEGORY',
	},
	{
		id: 'date',
		numeric: true,
		disablePadding: false,
		label: 'DATE',
	},
	{
		id: 'status',
		numeric: false,
		disablePadding: false,
		label: 'STATUS',
	},
];

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { onSelectAllClick } = props;

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'left' : 'center'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
					>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

interface FaqArticlesPanelListType {
	dense?: boolean;
	membersData?: any;
	searchMembers?: any;
	anchorEl?: any;
	handleMenuIconClick?: any;
	handleMenuIconClose?: any;
	generateMentorTypeHandle?: any;
	data: any;
}

export const FaqArticlesPanelList = (props: FaqArticlesPanelListType) => {
	const {
		dense,
		membersData,
		searchMembers,
		anchorEl,
		handleMenuIconClick,
		handleMenuIconClose,
		generateMentorTypeHandle,
		data,
	} = props;
	const router = useRouter();

	/** APOLLO REQUESTS **/
	/** LIFECYCLES **/
	/** HANDLERS **/

	return (
		<Stack>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
					{/*@ts-ignore*/}
					<EnhancedTableHead />
					<TableBody>
						{data.map((ele: FaqInput, index: any) => {
							const member_image = '/img/profile/defaultUser.svg';

							let status_class_name = '';

							return (
								<TableRow hover key={'member._id'} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell align="left">{index + 1}</TableCell>
									<TableCell align="left">{ele.faqQuestion}</TableCell>
									<TableCell align="left">{ele.faqAnswer}</TableCell>
									<TableCell align="left">{ele.faqCategory}</TableCell>
									<TableCell align="left" className={'name'}>
										{moment(ele.createdAt).format('YYYY MM DD')}
									</TableCell>
									<TableCell align="center">
										<Button onClick={(e: any) => handleMenuIconClick(e, index)} className={'badge success'}>
											{ele.faqStatus}
										</Button>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};

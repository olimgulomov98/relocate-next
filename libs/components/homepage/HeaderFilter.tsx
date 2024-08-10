import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PropertyLocation, PropertyType } from '../../enums/property.enum';
import { PropertiesInquiry } from '../../types/property/property.input';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface HeaderFilterProps {
	initialInput: PropertiesInquiry;
}

const HeaderFilter = (props: HeaderFilterProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const { t, i18n } = useTranslation('common');
	const [searchFilter, setSearchFilter] = useState<PropertiesInquiry>(initialInput);
	const locationRef: any = useRef();
	const typeRef: any = useRef();
	const roomsRef: any = useRef();
	const router = useRouter();
	const [openLocation, setOpenLocation] = useState(false);
	const [openType, setOpenType] = useState(false);
	const [openRooms, setOpenRooms] = useState(false);
	const [propertyLocation, setPropertyLocation] = useState<PropertyLocation[]>(Object.values(PropertyLocation));
	const [propertyType, setPropertyType] = useState<PropertyType[]>(Object.values(PropertyType));

	/** LIFECYCLES **/
	useEffect(() => {
		const clickHandler = (event: MouseEvent) => {
			if (!locationRef?.current?.contains(event.target)) {
				setOpenLocation(false);
			}

			if (!typeRef?.current?.contains(event.target)) {
				setOpenType(false);
			}

			if (!roomsRef?.current?.contains(event.target)) {
				setOpenRooms(false);
			}
		};

		document.addEventListener('mousedown', clickHandler);

		return () => {
			document.removeEventListener('mousedown', clickHandler);
		};
	}, []);

	/** HANDLERS **/

	const locationStateChangeHandler = () => {
		setOpenLocation((prev) => !prev);
		setOpenRooms(false);
		setOpenType(false);
	};

	const typeStateChangeHandler = () => {
		setOpenType((prev) => !prev);
		setOpenLocation(false);
		setOpenRooms(false);
	};

	const roomStateChangeHandler = () => {
		setOpenRooms((prev) => !prev);
		setOpenType(false);
		setOpenLocation(false);
	};

	const disableAllStateHandler = () => {
		setOpenRooms(false);
		setOpenType(false);
		setOpenLocation(false);
	};

	const propertyLocationSelectHandler = useCallback(
		async (value: any) => {
			try {
				setSearchFilter({
					...searchFilter,
					search: {
						...searchFilter.search,
						locationList: [value],
					},
				});
				typeStateChangeHandler();
			} catch (err: any) {
				console.log('ERROR, propertyLocationSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const propertyTypeSelectHandler = useCallback(
		async (value: any) => {
			try {
				setSearchFilter({
					...searchFilter,
					search: {
						...searchFilter.search,
						typeList: [value],
					},
				});
				roomStateChangeHandler();
			} catch (err: any) {
				console.log('ERROR, propertyTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const propertyRoomSelectHandler = useCallback(
		async (value: any) => {
			try {
				setSearchFilter({
					...searchFilter,
					search: {
						...searchFilter.search,
						roomsList: [value],
					},
				});
				disableAllStateHandler();
			} catch (err: any) {
				console.log('ERROR, propertyRoomSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const pushSearchHandler = async () => {
		try {
			if (searchFilter?.search?.locationList?.length == 0) {
				delete searchFilter.search.locationList;
			}

			if (searchFilter?.search?.typeList?.length == 0) {
				delete searchFilter.search.typeList;
			}

			if (searchFilter?.search?.roomsList?.length == 0) {
				delete searchFilter.search.roomsList;
			}

			if (searchFilter?.search?.options?.length == 0) {
				delete searchFilter.search.options;
			}

			if (searchFilter?.search?.bedsList?.length == 0) {
				delete searchFilter.search.bedsList;
			}

			await router.push(
				`/property?input=${JSON.stringify(searchFilter)}`,
				`/property?input=${JSON.stringify(searchFilter)}`,
			);
		} catch (err: any) {
			console.log('ERROR, pushSearchHandler:', err);
		}
	};

	if (device === 'mobile') {
		return <div>HEADER FILTER MOBILE</div>;
	} else {
		return (
			<>
				<Stack className={'search-box'}>
					<Stack className={'select-box'}>
						<Box component={'div'} className={`box ${openLocation ? 'on' : ''}`} onClick={locationStateChangeHandler}>
							<span>{searchFilter?.search?.locationList ? searchFilter?.search?.locationList[0] : t('Location')} </span>
							<ExpandMoreIcon />
						</Box>
						<Box component={'div'} className={`box ${openType ? 'on' : ''}`} onClick={typeStateChangeHandler}>
							<span> {searchFilter?.search?.typeList ? searchFilter?.search?.typeList[0] : t('Property type')} </span>
							<ExpandMoreIcon />
						</Box>
						<Box component={'div'} className={`box ${openRooms ? 'on' : ''}`} onClick={roomStateChangeHandler}>
							<span>
								{searchFilter?.search?.roomsList ? `${searchFilter?.search?.roomsList[0]} rooms}` : t('Rooms')}
							</span>
							<ExpandMoreIcon />
						</Box>
					</Stack>
					<Stack className={'search-box-other'}>
						<Box component={'div'} className={'search-btn'} onClick={pushSearchHandler}>
							<img src="/img/icons/search_white.svg" alt="" />
						</Box>
					</Stack>

					{/*MENU */}
					<div className={`filter-location ${openLocation ? 'on' : ''}`} ref={locationRef}>
						{propertyLocation.map((location: string) => {
							return (
								<div onClick={() => propertyLocationSelectHandler(location)} key={location}>
									<img src={`img/banner/cities/${location}.webp`} alt="" />
									<span>{location}</span>
								</div>
							);
						})}
					</div>

					<div className={`filter-type ${openType ? 'on' : ''}`} ref={typeRef}>
						{propertyType.map((type: string) => {
							return (
								<div
									style={{ backgroundImage: `url(/img/banner/types/${type.toLowerCase()}.webp)` }}
									onClick={() => propertyTypeSelectHandler(type)}
									key={type}
								>
									<span>{type}</span>
								</div>
							);
						})}
					</div>

					<div className={`filter-rooms ${openRooms ? 'on' : ''}`} ref={roomsRef}>
						{[1, 2, 3, 4, 5].map((room: number) => {
							return (
								<span onClick={() => propertyRoomSelectHandler(room)} key={room}>
									{room} room{room > 1 ? 's' : ''}
								</span>
							);
						})}
					</div>
				</Stack>
			</>
		);
	}
};

HeaderFilter.defaultProps = {
	initialInput: {
		page: 1,
		limit: 9,
		search: {},
	},
};

export default HeaderFilter;

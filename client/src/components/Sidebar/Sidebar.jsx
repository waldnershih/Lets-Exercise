import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../assets';
import { AiOutlineSchedule } from 'react-icons/ai';
import { CgGym } from 'react-icons/cg';
import { Divider } from '../Header/Header';

import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
} from '@mui/material';

import { useDispatch } from 'react-redux';

import {
	fetchExercisesByTag,
	setCurrentPage,
} from '../../redux/slices/exerciseSlice';

import './Sidebar.scss';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleOnExerciseClick = () => {
		dispatch(fetchExercisesByTag('all'));
		dispatch(setCurrentPage(1));
		navigate('/');
		setIsSidebarOpen(preState => !preState);
	};

	const handleOnScheduleClick = () => {
		navigate('/schedule');
		setIsSidebarOpen(preState => !preState);
	};

	const routes = [
		{
			icon: <CgGym />,
			title: 'Exercise',
			path: '/',
			handleOnClick: handleOnExerciseClick,
		},
		{
			icon: <AiOutlineSchedule />,
			title: 'Schedule',
			path: '/schedule',
			handleOnClick: handleOnScheduleClick,
		},
	];

	return (
		<Drawer
			anchor="left"
			open={isSidebarOpen}
			onClose={() => setIsSidebarOpen(false)}
		>
			<Box
				sx={{
					width: [200, 250],
				}}
				role="presentation"
				onClick={() => setIsSidebarOpen(false)}
				onKeyDown={() => setIsSidebarOpen(false)}
			>
				<Toolbar className="sidebar__header">
					<div className="sidebar__header__logo-container">
						<img src={Logo} alt="Logo" />
					</div>
				</Toolbar>

				<Divider />
				<List>
					{routes.map(route => (
						<ListItem
							disablePadding
							className="sidebar__content"
							key={route.title}
							onClick={route.handleOnClick}
						>
							<ListItemButton>
								<ListItemIcon>{route.icon}</ListItemIcon>
								<ListItemText
									primary={route.title}
									className="p-text-18"
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>
		</Drawer>
	);
};

export default Sidebar;

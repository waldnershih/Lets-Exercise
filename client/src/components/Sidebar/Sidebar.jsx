import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../assets';
// import { GrFormClose } from 'react-icons/gr';
import { AiOutlineSchedule } from 'react-icons/ai';
import { CgGym } from 'react-icons/cg';
import { Divider } from '../Header/Header';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';

import './Sidebar.scss';

const routes = [
	{
		icon: <CgGym />,
		title: 'Exercise',
		path: '/',
	},
	{
		icon: <AiOutlineSchedule />,
		title: 'Schedule',
		path: '/schedule',
	},
];

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
	return (
		<Drawer
			anchor="left"
			open={isSidebarOpen}
			onClose={() => setIsSidebarOpen(false)}
		>
			<Box
				sx={{
					width: 250,
				}}
				role="presentation"
				onClick={() => setIsSidebarOpen(false)}
				onKeyDown={() => setIsSidebarOpen(false)}
			>
				<Toolbar className="header">
					{/* <GrFormClose
						onClick={() => setIsSidebarOpen(false)}
						className="cancel-icon"
					/> */}
					<div className="logo-container">
						<img src={Logo} alt="Logo" />
					</div>
				</Toolbar>

				<Divider />
				<List>
					{routes.map(route => (
						<Link
							to={route.path}
							onClick={() =>
								setIsSidebarOpen(preState => !preState)
							}
							key={route.title}
						>
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemIcon>{route.icon}</ListItemIcon>
									<ListItemText
										primary={route.title}
										className="p-text-18"
									/>
								</ListItemButton>
							</ListItem>
						</Link>
					))}
				</List>
			</Box>
		</Drawer>
	);
};

export default Sidebar;

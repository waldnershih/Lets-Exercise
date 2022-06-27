import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../assets';
import { GrFormClose } from 'react-icons/gr';
import { AiOutlineSchedule } from 'react-icons/ai';
import { CgGym } from 'react-icons/cg';
import { Divider } from '../Header/Header';

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

const Sidebar = ({ setIsSidebarOpen }) => {
	return (
		<div className="app__sidebar">
			<div className="app__sidebar-container">
				<GrFormClose
					onClick={() => setIsSidebarOpen(preState => !preState)}
					className="cancel-icon"
				/>
				<div className="header-container">
					<img src={Logo} alt="Logo" />
				</div>
				<Divider />
				{routes.map(route => (
					<Link to={route.path} onClick={() => setIsSidebarOpen(preState => !preState)}>
						<div className="route-box" key={route}>
							{route.icon}
							<h2 className="subHead-text">{route.title}</h2>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Sidebar;

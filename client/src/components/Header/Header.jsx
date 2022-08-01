import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
	fetchTagList,
	fetchExercisesByTag,
	fetchExercisesByName,
	setCurrentPage,
} from '../../redux/slices/exerciseSlice';
import { logoutUser } from '../../redux/slices/userSlice';
import { HiMenuAlt4 } from 'react-icons/hi';
import { IoMdHeartEmpty } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { Avatar, Logo } from '../../assets';
import { BasicMenu } from '../../components';
import './Header.scss';

const whitelist = ['/', '/profile/loveexercises'];

export const Navbar = ({ setIsSidebarOpen }) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const { isAuth } = useSelector(state => state.isAuth);

	const [searchValue, setSearchValue] = useState('');
	const [anchorEl, setAnchorEl] = useState(null);

	const handleOnChange = e => {
		setSearchValue(e.target.value);
	};

	const handMenuOnClick = () => {
		setIsSidebarOpen(preState => !preState);
	};

	const handleOnSearchClick = () => {
		dispatch(fetchExercisesByName(searchValue));
		setSearchValue('');
	};

	// menu item functions
	const handleOnLoveExercisesClick = () => {
		navigate('/profile/loveexercises');
		setAnchorEl(null);
	};

	const handleOnProfileClick = e => {
		navigate('/profile/userinfo');
		setAnchorEl(null);
	};

	const handleLogout = () => {
		dispatch(logoutUser());
		setAnchorEl(null);
	};

	const menuItems = [
		{
			label: 'Love',
			icon: <IoMdHeartEmpty />,
			handleOnClick: handleOnLoveExercisesClick,
		},
		{
			label: 'Profile',
			icon: <CgProfile />,
			handleOnClick: handleOnProfileClick,
		},
		{
			label: 'Logout',
			icon: <RiLogoutBoxRLine />,
			handleOnClick: handleLogout,
		},
	];

	return (
		<div className="navbar">
			<div className="navbar__left-container">
				<HiMenuAlt4 onClick={handMenuOnClick} />
				<Link to="/">
					<div>
						<img src={Logo} alt="Logo" />
					</div>
				</Link>
			</div>

			<div className="navbar__middle-container">
				{whitelist.includes(location.pathname) && (
					<input
						type="text"
						value={searchValue}
						onChange={handleOnChange}
					/>
				)}
				{whitelist.includes(location.pathname) && (
					<div
						className="search-container"
						onClick={handleOnSearchClick}
					>
						<FiSearch />
					</div>
				)}
			</div>

			<div className="navbar__right-container">
				<div className="login-register-avatar">
					{isAuth ? (
						<BasicMenu
							items={menuItems}
							anchorEl={anchorEl}
							setAnchorEl={setAnchorEl}
						>
							<img
								src={Avatar}
								alt="Avatar"
								onClick={e => setAnchorEl(e.currentTarget)}
							/>
						</BasicMenu>
					) : (
						<Link to="/signin" state={{ from: location }}>
							<p className="p-text-18">Login</p>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export const Tagbar = () => {
	const dispatch = useDispatch();
	const { tagList: tags } = useSelector(state => state.exercises);
	const [selectedTag, setSelectedTag] = useState('');

	useEffect(() => {
		dispatch(fetchTagList());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (tags) setSelectedTag(tags[0]);
	}, [tags]);

	const handleOnTagClick = tag => {
		dispatch(setCurrentPage(1)); // reset pagination
		setSelectedTag(tag);
		dispatch(fetchExercisesByTag(tag));
	};

	return (
		<div className="tagbar">
			{tags.map(tag => (
				<div
					key={tag}
					className={`tagbar__container ${
						selectedTag === tag ? 'app--darkskinbg' : 'app--skinbg'
					}`}
					onClick={() => handleOnTagClick(tag)}
				>
					<p className="p-text-16">{tag}</p>
				</div>
			))}
		</div>
	);
};

export const Divider = () => {
	return <div className="divider" />;
};

const Header = ({ setIsSidebarOpen }) => {
	const location = useLocation();

	return (
		<div className="app__header">
			<Navbar setIsSidebarOpen={setIsSidebarOpen} />
			<Divider />
			{whitelist.includes(location.pathname) && <Tagbar />}
			{whitelist.includes(location.pathname) && <Divider />}
		</div>
	);
};

export default Header;

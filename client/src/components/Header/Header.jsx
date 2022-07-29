import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchTagList,
	fetchExercisesByTag,
	fetchExercisesByName,
	setCurrentPage,
} from '../../redux/slices/exerciseSlice';
import { logoutUser } from '../../redux/slices/userSlice';
import { HiMenuAlt4 } from 'react-icons/hi';
import { FaHeart } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { Avatar, Logo } from '../../assets';
import { Link, useLocation } from 'react-router-dom';
import { BasicMenu } from '../../components';
import './Header.scss';

const whitelist = ['/', '/profile/loveexercises'];

export const Navbar = ({ setIsSidebarOpen }) => {
	// console.log(isAuth);
	const dispatch = useDispatch();
	const [searchValue, setSearchValue] = useState('');
	const [anchorEl, setAnchorEl] = useState(null);
	const { isAuth } = useSelector(state => state.isAuth);
	const location = useLocation();

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

	const handleOnProfileClick = e => {
		setAnchorEl(e.currentTarget);
	};

	const handleLogout = () => {
		dispatch(logoutUser());
		setAnchorEl(null);
	};

	const menuItems = [
		{
			label: 'Logout',
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
				{isAuth && (
					<Link to="/profile/loveexercises">
						<FaHeart />
					</Link>
				)}

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
								onClick={handleOnProfileClick}
							/>
						</BasicMenu>
					) : (
						<Link to="/signin" state={{ from: location }}>
							Login
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

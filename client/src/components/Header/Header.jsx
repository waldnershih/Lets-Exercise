import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchTagList,
	fetchExercisesByTag,
	fetchExercisesByName,
} from '../../redux/slices/exerciseSlice';
import { HiMenuAlt4 } from 'react-icons/hi';
import { FaHeart } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { Avatar, Logo } from '../../assets';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './Header.scss';

export const Navbar = ({ setIsSidebarOpen }) => {
	const dispatch = useDispatch();
	const [searchValue, setSearchValue] = useState('');
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
				{location.pathname === '/' && (
					<input type="text" value={searchValue} onChange={handleOnChange} />
				)}
				{location.pathname === '/' && (
					<div className="search-container" onClick={handleOnSearchClick}>
						<FiSearch />
					</div>
				)}
			</div>

			<div className="navbar__right-container">
				<FaHeart />
				<div>
					<img src={Avatar} alt="Avatar" />
				</div>
			</div>
		</div>
	);
};

export const Tagbar = () => {
	const { tagList: tags } = useSelector(state => state.exercises);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchTagList());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleOnTagClick = tag => {
		dispatch(fetchExercisesByTag(tag));
	};

	return (
		<div className="tagbar">
			{tags.map(tag => (
				<div key={tag} className="tagbar__container" onClick={() => handleOnTagClick(tag)}>
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
			{location.pathname === '/' && <Tagbar />}
			{location.pathname === '/' && <Divider />}
		</div>
	);
};

export default Header;
import React, { useState, useEffect } from 'react';
// import { FaHeart } from 'react-icons/fa';
import './BasicCard.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { patchUserProfile } from '../../redux/slices/userSlice';
import { BasicMenu, BasicPopover } from '../../components';

const BasicCard = ({ exercise, detailLink, isAuth }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { userProfile } = useSelector(state => state.user);
	const { bodyPart, gifUrl, name } = exercise;
	const [isSave, setIsSave] = useState(false);
	const [anchorElMenu, setAnchorElMenu] = useState(null);
	const [anchorElPopover, setAnchorElPopover] = useState(null);

	useEffect(() => {
		if (userProfile) {
			const isMatch = userProfile?.loveExercises.includes(exercise._id);
			setIsSave(isMatch);
		} else {
			setIsSave(false);
		}
	}, [userProfile, exercise._id]);

	const handleOnSave = e => {
		if (isAuth) {
			dispatch(
				patchUserProfile({
					loveExercise: exercise._id,
					field: 'addLoveExercise',
				}),
			);
		} else {
			setAnchorElMenu(e.currentTarget);
		}
	};

	const handleOnUnsave = e => {
		setAnchorElPopover(e.currentTarget);
	};

	const handleOnYesClick = () => {
		dispatch(
			patchUserProfile({
				loveExercise: exercise._id,
				field: 'removeLoveExercise',
			}),
		);
		setAnchorElPopover(null);
	};

	const handleSaveWithoutLogin = () => {
		navigate('/signin', { state: { from: location } });
		setAnchorElMenu(null);
	};

	const menuItems = [
		{
			label: 'Login for save',
			handleOnClick: handleSaveWithoutLogin,
		},
	];

	const handleOnDetailClick = () => {
		navigate(detailLink);
	};

	return (
		<div className="app__card">
			<div className="image-container">
				<img src={gifUrl} alt="img" loading="lazy" />
			</div>
			<div className="tag-container">
				<div className={`tag-container__box app--lightpurplebg`}>
					<p className="caption-text">{bodyPart}</p>
				</div>
				{/* <div className={`tag-container__box app--lightpurplebg`}>
					<p className="caption-text">{target}</p>
				</div> */}

				{/* <FaHeart /> */}
			</div>
			<p className="p-text-18">{name}</p>
			<div className="action-container">
				{isSave ? (
					<div>
						<p className="p-text-16" onClick={handleOnUnsave}>
							Unsave
						</p>
						<BasicPopover
							anchorEl={anchorElPopover}
							setAnchorEl={setAnchorElPopover}
							title="Are you sure to unsave?"
							handleOnYesClick={handleOnYesClick}
							handleOnNoClick={() => setAnchorElPopover(null)}
						/>
					</div>
				) : (
					<BasicMenu
						items={menuItems}
						anchorEl={anchorElMenu}
						setAnchorEl={setAnchorElMenu}
					>
						<p className="p-text-16" onClick={handleOnSave}>
							Save
						</p>
					</BasicMenu>
				)}

				{detailLink && (
					<p className="p-text-16" onClick={handleOnDetailClick}>
						Detail
					</p>
				)}
			</div>
		</div>
	);
};

export default BasicCard;

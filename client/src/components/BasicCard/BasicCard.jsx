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

	const { bodyPart, gifUrl, name } = exercise;

	const { userProfile } = useSelector(state => state.user);

	const [isSave, setIsSave] = useState(false);
	const [anchorElMenu, setAnchorElMenu] = useState(null);
	const [anchorElPopover, setAnchorElPopover] = useState(null);

	useEffect(() => {
		if (!userProfile) return setIsSave(false);

		const isMatch = userProfile?.loveExercises.includes(exercise._id);
		setIsSave(isMatch);
	}, [userProfile, exercise._id]);

	const handleOnSave = e => {
		if (!isAuth) return setAnchorElMenu(e.currentTarget);

		dispatch(
			patchUserProfile({
				loveExercise: exercise._id,
				field: 'addLoveExercise',
			}),
		);
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
		navigate('/signin', { state: { from: location, userId: 'id' } });
		setAnchorElMenu(null);
	};

	const handleOnDetailClick = () => {
		navigate(detailLink);
	};

	const menuItems = [
		{
			label: 'Login for save',
			handleOnClick: handleSaveWithoutLogin,
		},
	];

	return (
		<div className="app__basic-card">
			<div className="basic-card__image-container">
				<img src={gifUrl} alt="img" loading="lazy" />
			</div>
			<div className="basic-card__tag-container">
				<div
					className={`basic-card__tag-container__box app--lightpurplebg`}
				>
					<p className="caption-text">{bodyPart}</p>
				</div>
			</div>
			<p className="p-text-18">
				{name?.length > 22 ? `${name.substring(0, 22)} ...` : name}
			</p>
			<div className="basic-card__action-container">
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

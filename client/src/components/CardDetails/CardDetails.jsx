import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { BasicMenu, BasicPopover } from '../../components/';
import { patchUserProfile } from '../../redux/slices/userSlice';

import './CardDetails.scss';

const CardDetails = ({ data }) => {
	const { _id: id, bodyPart, gifUrl, name, target, equipment } = data;
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const [isSave, setIsSave] = useState(false);
	const [anchorElMenu, setAnchorElMenu] = useState(null);
	const [anchorElPopover, setAnchorElPopover] = useState(null);
	const { isAuth } = useSelector(state => state.isAuth);
	const { userProfile } = useSelector(state => state.user);

	useEffect(() => {
		if (userProfile) {
			const isMatch = userProfile.loveExercises.includes(id);
			setIsSave(isMatch);
		} else {
			setIsSave(false);
		}
	}, [userProfile, id]);

	const handleOnSave = e => {
		if (isAuth) {
			dispatch(
				patchUserProfile({
					loveExercise: id,
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
				loveExercise: id,
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

	return (
		<div className="app__card-details">
			<img src={gifUrl} alt="sample" />
			<div className="tags-container">
				<div className={`tag-container__box app--lightgreenbg`}>
					<p className="p-text-16">{bodyPart}</p>
				</div>
				<div className={`tag-container__box app--lightpurplebg`}>
					<p className="p-text-16">{target}</p>
				</div>
				<div className={`tag-container__box app--lightyellowbg`}>
					<p className="p-text-16">{equipment}</p>
				</div>
				<div>
					<BasicMenu
						items={menuItems}
						anchorEl={anchorElMenu}
						setAnchorEl={setAnchorElMenu}
					>
						<FaHeart
							className={isSave && `yellow-icon`}
							onClick={isSave ? handleOnUnsave : handleOnSave}
						/>
					</BasicMenu>
					<BasicPopover
						anchorEl={anchorElPopover}
						setAnchorEl={setAnchorElPopover}
						title="Are you sure to unsave?"
						handleOnYesClick={handleOnYesClick}
						handleOnNoClick={() => setAnchorElPopover(null)}
					/>
				</div>
			</div>
			<p className="p-text-18">
				Exercises keep you strong.{' '}
				<span style={{ textTransform: 'capitalize' }}>{name}</span> is
				one of the best exercises to train your{' '}
				<span style={{ textTransform: 'capitalize' }}>{target}</span>.
				It will help you improve your mood and gain energy.
			</p>
		</div>
	);
};

export default CardDetails;

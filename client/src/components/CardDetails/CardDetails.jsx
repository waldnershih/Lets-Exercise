import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { BasicPopover } from '../../components/';
import { patchUserProfile } from '../../redux/slices/userSlice';
import Rating from '@mui/material/Rating';

import './CardDetails.scss';

const CardDetails = ({ data }) => {
	const { _id: id, bodyPart, gifUrl, name, target, equipment } = data;

	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	const { isAuth } = useSelector(state => state.isAuth);
	const { userProfile } = useSelector(state => state.user);
	const { reviewRating } = useSelector(state => state.exercises);

	const [isSave, setIsSave] = useState(false);
	const [anchorElMenu, setAnchorElMenu] = useState(null);
	const [anchorElPopover, setAnchorElPopover] = useState(null);

	useEffect(() => {
		if (!userProfile) return setIsSave(false);

		const isMatch = userProfile.loveExercises.includes(id);
		setIsSave(isMatch);
	}, [userProfile, id]);

	const handleOnSave = e => {
		if (!isAuth) return setAnchorElMenu(e.currentTarget);

		dispatch(
			patchUserProfile({
				loveExercise: id,
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

	return (
		<div className="app__card-details">
			<img src={gifUrl} alt="sample" />
			<div className="app__card-details__tags-container">
				<div
					className={`app__card-details__tag-container__box app--lightgreenbg`}
				>
					<p className="p-text-16">{bodyPart}</p>
				</div>
				<div
					className={`app__card-details__tag-container__box app--lightpurplebg`}
				>
					<p className="p-text-16">{target}</p>
				</div>
				<div
					className={`app__card-details__tag-container__box app--lightyellowbg`}
				>
					<p className="p-text-16">{equipment}</p>
				</div>
				<div className="heart-box">
					<FaHeart
						className={isSave && `yellow-icon`}
						onClick={isSave ? handleOnUnsave : handleOnSave}
					/>
					<BasicPopover
						anchorEl={anchorElMenu}
						setAnchorEl={setAnchorElMenu}
						title="Login for save"
						handleOnYesClick={handleSaveWithoutLogin}
						handleOnNoClick={() => setAnchorElMenu(null)}
					/>
					<BasicPopover
						anchorEl={anchorElPopover}
						setAnchorEl={setAnchorElPopover}
						title="Are you sure to unsave?"
						handleOnYesClick={handleOnYesClick}
						handleOnNoClick={() => setAnchorElPopover(null)}
					/>
				</div>
				<div className="app__card-details__tags-container__rating-box">
					<Rating
						name="half-rating-read"
						// defaultValue={reviewRating}
						value={reviewRating}
						precision={0.5}
						readOnly
						size="large"
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

import React, { useState } from 'react';
import { timeAgo } from '../../utils';
import { Avatar } from '../../assets';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BasicMenu } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import {
	updateReviewByExerciseId,
	deleteReviewByExerciseId,
} from '../../redux/slices/reviewSlice';

import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Rating,
} from '@mui/material';

import './Review.scss';

const Review = ({ review }) => {
	const dispatch = useDispatch();
	const { userProfile } = useSelector(state => state.user);
	const { selectedExercise } = useSelector(state => state.exercises);

	const [anchorElMenu, setAnchorElMenu] = useState(null);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [reportOpen, setReportOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [currentRating, setCurrentRating] = useState(review.rating);
	const [currentContent, setCurrentContent] = useState(review.description);
	// const [reportReason, setReportReason] = useState('');

	const handleOnAboutClick = e => {
		setAnchorElMenu(e.currentTarget);
	};

	const handleOnReportClick = () => {
		setAnchorElMenu(null);
		setReportOpen(true);
	};

	const handleOnDeleteClick = () => {
		setAnchorElMenu(null);
		setDeleteOpen(true);
	};

	const handleOnEditClick = () => {
		setAnchorElMenu(null);
		setEditOpen(true);
	};

	const handleOnDeleteSubmit = () => {
		setDeleteOpen(false);
		dispatch(
			deleteReviewByExerciseId({
				exerciseId: selectedExercise._id,
				reviewId: review._id,
			}),
		);
	};

	const handleOnEditReset = () => {
		setCurrentContent(review.description);
		setCurrentRating(review.rating);
	};

	const handleOnEditSubmit = () => {
		setEditOpen(false);

		if (
			currentRating <= 0 ||
			currentRating > 5 ||
			currentContent.length <= 0
		) {
			return alert('Please fill all fields');
		}

		const edittedReview = {
			description: currentContent,
			rating: currentRating,
		};
		dispatch(
			updateReviewByExerciseId({
				exerciseId: selectedExercise._id,
				reviewId: review._id,
				review: edittedReview,
			}),
		);
	};

	const handleOnEditClose = () => {
		setEditOpen(false);
		setCurrentContent(review.description);
		setCurrentRating(review.rating);
	};

	// const handleOnReportSubmit = () => {
	// 	setReportOpen(false);
	// 	// console.log(reportReason);
	// };

	const menuItems = [
		{
			label: 'Edit',
			handleOnClick: handleOnEditClick,
		},
		{
			label: 'Delete',
			handleOnClick: handleOnDeleteClick,
		},
		{
			label: 'Report',
			handleOnClick: handleOnReportClick,
		},
	];

	return (
		<div className="app__review">
			{/* <img src={review.owner.avatar} alt="avatar" /> */}
			<img src={Avatar} alt="avatar" className="app__review__avatar" />
			<div className="app__review__info">
				<div className="app__review__info-title">
					<p className="p-text-18 app__review__info__author">
						{review.owner.ownerName}
					</p>
				</div>
				<div className="app__review__info-subtitle">
					<Rating
						name="size-large"
						defaultValue={0}
						size="large"
						value={review.rating}
						readOnly
						className="app__review__rating"
					/>
					<p className="caption-text app__review__info__date">
						{timeAgo.formatByString(review.createdAt)}
					</p>
				</div>
				<div className="app__review__info-description">
					<p className="p-text-18">{review.description}</p>
				</div>
			</div>
			<div className="app__review__actions">
				<BasicMenu
					items={
						userProfile?._id === review?.owner?.ownerId
							? menuItems
							: [menuItems[2]]
					}
					anchorEl={anchorElMenu}
					setAnchorEl={setAnchorElMenu}
				>
					<BsThreeDotsVertical onClick={handleOnAboutClick} />
				</BasicMenu>
			</div>

			{/* Edit Dialog */}
			<Dialog
				open={editOpen}
				onClose={() => setEditOpen(false)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogContent>
					<div className="dialog-content">
						<textarea
							name="comment"
							id=""
							rows="4"
							placeholder="Comment (Maximum 100 characters)"
							value={currentContent}
							onChange={e => setCurrentContent(e.target.value)}
							maxLength="150"
						/>
						<div className="dialog-content__rating-container">
							<Rating
								name="size-large"
								defaultValue={0}
								size="large"
								value={currentRating}
								onChange={(event, value) =>
									setCurrentRating(value)
								}
							/>
						</div>
					</div>
				</DialogContent>
				<DialogActions>
					<div
						onClick={handleOnEditReset}
						className="dialog-action-button"
					>
						<p className="p-text-18">Reset</p>
					</div>
					<div
						onClick={handleOnEditSubmit}
						className="dialog-action-button"
					>
						<p className="p-text-18">Comment</p>
					</div>
					<div
						onClick={handleOnEditClose}
						className="dialog-action-button"
					>
						<p className="p-text-18">Close</p>
					</div>
				</DialogActions>
			</Dialog>

			{/* Delete Dialog */}
			<Dialog
				open={deleteOpen}
				onClose={() => setDeleteOpen(false)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{'Are you sure to delete the comment?'}
				</DialogTitle>
				<DialogActions>
					<div
						onClick={handleOnDeleteSubmit}
						className="dialog-action-button"
					>
						<p className="p-text-18">Agree</p>
					</div>
					<div
						onClick={() => setDeleteOpen(false)}
						className="dialog-action-button"
					>
						<p className="p-text-18">Disagree</p>
					</div>
				</DialogActions>
			</Dialog>

			{/* Report Dialog */}
			<Dialog
				open={reportOpen}
				onClose={() => setReportOpen(false)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{'Select a reason to report this comment:'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Not Available
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<div
					// onClick={handleOnReportSubmit}
					// className="dialog-action-button"
					>
						<p className="p-text-18">Agree</p>
					</div>
					<div
						onClick={() => setReportOpen(false)}
						className="dialog-action-button"
					>
						<p className="p-text-18">Disagree</p>
					</div>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Review;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
	CardDetails,
	// Video,
	// HorizontalScrollbar,
	Loader,
	HorizontalCard,
	VerticalScrollbarWithTimeout,
	Review,
} from '../../components';
import { Divider } from '../../components/Header/Header';
import {
	fetchExercisesByTargetMuscle,
	fetchExercisesByEquiment,
	fetchExerciseById,
} from '../../redux/slices/exerciseSlice';

import { fetchVideosByTerm } from '../../redux/slices/videoSlice';
import {
	fetchAllReviewsByExerciseId,
	createReviewByExerciseId,
} from '../../redux/slices/reviewSlice';
import { Rating } from '@mui/material';

import './ExerciseDetail.scss';

const tags = [
	{
		name: 'Videos',
		value: 'recommendedVideos',
	},
	{
		name: 'Target Muscle',
		value: 'similarTargetMuscleExercises',
	},
	{
		name: 'Equipment',
		value: 'similarEquipmentExercises',
	},
];

const ExerciseDetail = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const {
		selectedExercise,
		targetMuscleExercises,
		equipmentExercises,
		loading: exerciseLoading,
	} = useSelector(state => state.exercises);
	const {
		// videos,
		loading: videoLoading,
	} = useSelector(state => state.videos);
	const { isAuth } = useSelector(state => state.isAuth);
	const { reviews } = useSelector(state => state.reviews);

	const [selectedTag, setSelectedTag] = useState(tags[0].value);
	const [commentValue, setCommentValue] = useState('');
	const [ratingValue, setRatingValue] = useState(0);

	useEffect(() => {
		setSelectedTag(tags[0].value);
		setCommentValue('');
		setRatingValue(0);
		dispatch(fetchExerciseById(id));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	useEffect(() => {
		if (selectedExercise) {
			dispatch(fetchAllReviewsByExerciseId(selectedExercise._id));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedExercise]);

	useEffect(() => {
		if (selectedExercise.target) {
			dispatch(fetchExercisesByTargetMuscle(selectedExercise.target));
		}
		if (selectedExercise.equipment) {
			dispatch(fetchExercisesByEquiment(selectedExercise.equipment));
		}
		if (selectedExercise.name) {
			dispatch(fetchVideosByTerm(selectedExercise.name));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedExercise]);

	useEffect(() => {
		setCommentValue('');
		setRatingValue(0);
	}, [reviews]);

	const handleOnTagClick = tag => {
		setSelectedTag(tag.value);
	};

	const handleOnCommentClick = () => {
		if (isAuth) {
			if (
				ratingValue > 0 &&
				ratingValue <= 5 &&
				commentValue.length > 0
			) {
				const review = {
					description: commentValue,
					rating: ratingValue,
				};

				dispatch(
					createReviewByExerciseId({
						exerciseId: selectedExercise._id,
						review,
					}),
				);
			} else {
				alert('Please fill all fields');
			}
		} else {
			alert('You must be logged in to comment');
		}
	};

	const handleOnRatingChange = (event, value) => {
		setRatingValue(value);
	};

	// const renderVideos =
	// 	videos &&
	// 	videos.map((video, i) => (
	// 		<Video key={`${video.id.videoId}-${i}`} video={video} />
	// 	));

	const renderTargetMuscleExercises =
		targetMuscleExercises &&
		targetMuscleExercises.map((exercise, i) => (
			<HorizontalCard
				key={`${exercise.id}-${i}`}
				exercise={exercise}
				detailLink={`/exercisedetail/${exercise.id}`}
				isAuth={isAuth}
			/>
		));

	const renderEquipmentExercises =
		equipmentExercises &&
		equipmentExercises
			.slice(0, 11)
			.map((exercise, i) => (
				<HorizontalCard
					key={`${exercise.id}-${i}`}
					exercise={exercise}
					detailLink={`/exercisedetail/${exercise.id}`}
					isAuth={isAuth}
				/>
			));

	return (
		<div className="app__container">
			<div className="app__section app__exercise-detail">
				<div className="detail-container">
					<div className="card-detail-container">
						<CardDetails data={selectedExercise} />
						<Divider />
						<div className="card-detail-container__comment-title">
							<h2
								className="subHead-text"
								style={{ marginRight: '16px' }}
							>
								<b>{reviews ? reviews.length : 0}</b> Comment
							</h2>
							<p className="p-text-18">(One Person One Review)</p>
						</div>

						<div className="card-detail-container__comment-container">
							<textarea
								name="comment"
								id=""
								rows="4"
								placeholder="Comment (Maximum 100 characters)"
								value={commentValue}
								onChange={e => setCommentValue(e.target.value)}
								maxLength="150"
							/>
							<div className="card-detail-container__comment-container__action-container">
								<div className="exercise-detail__rating-box">
									<Rating
										name="size-large"
										defaultValue={0}
										size="large"
										value={ratingValue}
										onChange={handleOnRatingChange}
									/>
								</div>

								<div
									onClick={() => setCommentValue('')}
									className="p-text-18"
								>
									Clear
								</div>
								<div
									onClick={handleOnCommentClick}
									className="p-text-18"
								>
									Comment
								</div>
							</div>
						</div>
						<Divider />
						<div className="card-detail-container__comment-reviews">
							{reviews &&
								reviews.map(
									(review, i) =>
										review && (
											<Review
												review={review}
												key={`${review}-${i}`}
											/>
										),
								)}
						</div>
					</div>

					<div className="video-container">
						<div className="tag-container">
							{tags.map(tag => (
								<div
									key={tag.value}
									className={`tag-container__tag-box ${
										selectedTag === tag.value
											? 'app--darkskinbg'
											: 'app--skinbg'
									}`}
									onClick={() => handleOnTagClick(tag)}
								>
									<p className="p-text-16">{tag.name}</p>
								</div>
							))}
						</div>
						{selectedTag === 'recommendedVideos' &&
							(!videoLoading ? (
								// <div className="video-container">
								// 	{renderVideos}
								// </div>
								<Loader flex={1} />
							) : (
								<Loader flex={1} />
							))}
						{selectedTag === 'similarTargetMuscleExercises' &&
							(!exerciseLoading.targetMuscleloading ? (
								<VerticalScrollbarWithTimeout
									items={renderTargetMuscleExercises}
								/>
							) : (
								<Loader flex={1} />
							))}
						{selectedTag === 'similarEquipmentExercises' &&
							(!exerciseLoading.equipmentLoading ? (
								<VerticalScrollbarWithTimeout
									items={renderEquipmentExercises}
								/>
							) : (
								<Loader flex={1} />
							))}
					</div>
				</div>
				{/* <div className="horizontal-scrollbar-container">
					<h2 className="subHead-text">
						Similar Target Muscle Exercises
					</h2>
					{!exerciseLoading.targetMuscleloading ? (
						<HorizontalScrollbar
							items={
								targetMuscleExercises &&
								targetMuscleExercises.slice(0, 11)
							}
						/>
					) : (
						<Loader />
					)}
				</div>
				<div className="horizontal-scrollbar-container">
					<h2 className="subHead-text">
						Similar Equipment Exercises
					</h2>
					{!exerciseLoading.equipmentLoading ? (
						<HorizontalScrollbar
							items={
								equipmentExercises &&
								equipmentExercises.slice(0, 11)
							}
						/>
					) : (
						<Loader />
					)}
				</div> */}
			</div>
		</div>
	);
};

export default ExerciseDetail;

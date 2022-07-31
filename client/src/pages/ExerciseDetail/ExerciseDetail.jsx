import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	useParams,
	//  useLocation
} from 'react-router-dom';
import {
	CardDetails,
	// Video,
	Loader,
	HorizontalCard,
	Review,
	BasicVerticalScrollbar,
} from '../../components';
import { Divider } from '../../components/Header/Header';
import {
	fetchExercisesByTargetMuscle,
	fetchExercisesByEquiment,
	fetchExerciseById,
} from '../../redux/slices/exerciseSlice';

// import { fetchVideosByTerm } from '../../redux/slices/videoSlice';
import {
	fetchReviewsWithPagination,
	createReviewByExerciseId,
	fetchReviewsLengthByExerciseId,
	resetReviews,
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
	// const { pathname } = useLocation();
	const {
		selectedExercise,
		targetMuscleExercises,
		equipmentExercises,
		loading: exerciseLoading,
	} = useSelector(state => state.exercises);
	// const {
	// 	videos,
	// 	loading: videoLoading,
	// } = useSelector(state => state.videos);
	const { isAuth } = useSelector(state => state.isAuth);
	const { reviews, allReviewsLength, loading } = useSelector(
		state => state.reviews,
	);

	const [selectedTag, setSelectedTag] = useState(tags[0].value);
	const [commentValue, setCommentValue] = useState('');
	const [ratingValue, setRatingValue] = useState(0);

	const [displayTargetMuscleExercises, setDisplayTargetMuscleExercises] =
		useState([]);

	const [displayEquipmentExercises, setDisplayEquipmentExercises] = useState(
		[],
	);

	useEffect(() => {
		dispatch(resetReviews());

		setSelectedTag(tags[0].value);
		setCommentValue('');
		setRatingValue(0);
		dispatch(fetchExerciseById(id));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		id,
		// pathname
	]);

	useEffect(
		() => {
			dispatch(fetchReviewsLengthByExerciseId(selectedExercise._id));
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[selectedExercise?._id],
	);

	useEffect(() => {
		if (targetMuscleExercises.length > 0) {
			setDisplayTargetMuscleExercises(targetMuscleExercises.slice(0, 5));
		}
	}, [targetMuscleExercises]);

	useEffect(() => {
		if (equipmentExercises.length > 0) {
			setDisplayEquipmentExercises(equipmentExercises.slice(0, 5));
		}
	}, [equipmentExercises]);

	useEffect(() => {
		if (selectedExercise.target) {
			dispatch(fetchExercisesByTargetMuscle(selectedExercise.target));
		}

		if (selectedExercise.equipment) {
			dispatch(fetchExercisesByEquiment(selectedExercise.equipment));
		}

		// if (selectedExercise.name) {
		// 	dispatch(fetchVideosByTerm(selectedExercise.name));
		// }

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedExercise._id]);

	useEffect(() => {
		setCommentValue('');
		setRatingValue(0);
	}, [allReviewsLength]);

	const handleOnTagClick = tag => {
		setSelectedTag(tag.value);
	};

	const handleOnCommentClick = () => {
		if (!isAuth) {
			return alert('You must be logged in to comment');
		}

		if (ratingValue <= 0 || ratingValue > 7 || commentValue.length <= 0) {
			return alert('Please fill all fields');
		}

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
	};

	const handleOnRatingChange = (event, value) => {
		setRatingValue(value);
	};

	const handleOnClearClick = () => {
		setCommentValue('');
		setRatingValue(0);
	};

	// const renderVideos =
	// 	videos &&
	// 	videos.map((video, i) => (
	// 		<Video key={`${video.id.videoId}-${i}`} video={video} />
	// 	));

	const renderReviews = reviews.map((review, i) => (
		<Review key={`${review.id}-${i}`} review={review} />
	));

	const handleLoadMoreReviews = () => {
		if (loading) return;

		dispatch(
			fetchReviewsWithPagination({
				exerciseId: selectedExercise._id,
				page: reviews.length / 7 + 1,
				limit: 7,
			}),
		);
	};

	const handleLoadMoreTargetMuscleExercises = () => {
		if (exerciseLoading.targetMuscleloading) return;

		setDisplayTargetMuscleExercises(preState => [
			...preState,
			...targetMuscleExercises.slice(
				preState.length,
				preState.length + 5,
			),
		]);
	};

	const handleLoadMoreEquipmentExercises = () => {
		if (exerciseLoading.equipmentLoading) return;

		setDisplayEquipmentExercises(preState => [
			...preState,
			...equipmentExercises.slice(preState.length, preState.length + 5),
		]);
	};

	const renderTargetMuscleExercises = displayTargetMuscleExercises.map(
		(exercise, i) => {
			return (
				<HorizontalCard
					key={`${exercise.id}-${i}`}
					exercise={exercise}
					detailLink={`/exercisedetail/${exercise.id}`}
					isAuth={isAuth}
				/>
			);
		},
	);

	const renderEquipmentExercises = displayEquipmentExercises.map(
		(exercise, i) => (
			<HorizontalCard
				key={`${exercise.id}-${i}`}
				exercise={exercise}
				detailLink={`/exercisedetail/${exercise.id}`}
				isAuth={isAuth}
			/>
		),
	);

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
								<b>{allReviewsLength}</b> Comment
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
								maxLength="170"
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
									onClick={handleOnClearClick}
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
							{renderReviews && (
								<BasicVerticalScrollbar
									length={allReviewsLength}
									items={renderReviews}
									handleLoadMoreItems={handleLoadMoreReviews}
									loading={loading}
								/>
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
						{/* {selectedTag === 'recommendedVideos' &&
							(!videoLoading ? (
								<div className="video-container">
									{renderVideos}
								</div>
								
							) : (
								<Loader flex={1} />
							))} */}
						{selectedTag === 'recommendedVideos' && (
							<Loader flex={1} />
						)}
						{selectedTag === 'similarTargetMuscleExercises' &&
							(!exerciseLoading.targetMuscleloading ? (
								<BasicVerticalScrollbar
									length={targetMuscleExercises.length}
									items={renderTargetMuscleExercises}
									handleLoadMoreItems={
										handleLoadMoreTargetMuscleExercises
									}
								/>
							) : (
								<Loader flex={1} />
							))}
						{selectedTag === 'similarEquipmentExercises' &&
							(!exerciseLoading.equipmentLoading ? (
								<BasicVerticalScrollbar
									length={equipmentExercises.length}
									items={renderEquipmentExercises}
									handleLoadMoreItems={
										handleLoadMoreEquipmentExercises
									}
								/>
							) : (
								<Loader flex={1} />
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ExerciseDetail;

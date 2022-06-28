import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CardDetails, Video, HorizontalScrollbar, Loader } from '../../components';
import {
	fetchExercisesByTargetMuscle,
	fetchExercisesByEquiment,
	fetchExerciseById,
} from '../../redux/slices/exerciseSlice';

import { fetchVideosByTerm } from '../../redux/slices/videoSlice';

import './ExerciseDetail.scss';

const ExerciseDetail = () => {
	const {
		selectedExercise,
		targetMuscleExercises,
		equipmentExercises,
		loading: exerciseLoading,
	} = useSelector(state => state.exercises);
	const { videos, loading: videoLoading } = useSelector(state => state.videos);
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(fetchExerciseById(id));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

	// useEffect(() => {
	// 	console.log(videos);
	// }, [videos]);

	const renderVideos =
		videos &&
		videos.map((video, i) => <Video key={`${video.id.videoId}-${i}`} video={video} />);

	return (
		<div className="app__container">
			<div className="app__section app__exercise-detail">
				<div className="detail-container">
					<CardDetails className="card-detail-container" data={selectedExercise} />
					{!videoLoading ? (
						<div className="video-container">{renderVideos}</div>
					) : (
						<Loader flex={1} />
					)}
				</div>
				<div className="horizontal-scrollbar-container">
					<h2 className="subHead-text">Similar Target Muscle Exercises</h2>
					{!exerciseLoading.targetMuscleloading ? (
						<HorizontalScrollbar
							items={targetMuscleExercises && targetMuscleExercises.slice(0, 11)}
						/>
					) : (
						<Loader />
					)}
				</div>
				<div className="horizontal-scrollbar-container">
					<h2 className="subHead-text">Similar Equipment Exercises</h2>
					{!exerciseLoading.equipmentLoading ? (
						<HorizontalScrollbar
							items={equipmentExercises && equipmentExercises.slice(0, 11)}
						/>
					) : (
						<Loader />
					)}
				</div>
				{/* <div className="HorizontalScrollbar-container">
					<h2>i am 1</h2>
					<HorizontalScrollbar />
				</div> */}
			</div>
		</div>
	);
};

export default ExerciseDetail;

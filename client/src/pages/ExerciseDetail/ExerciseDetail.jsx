import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CardDetails, Video, HorizontalScrollbar } from '../../components';
import {
	fetchExercisesByTargetMuscle,
	fetchExercisesByEquiment,
	fetchExerciseById,
} from '../../redux/slices/exerciseSlice';

import './ExerciseDetail.scss';

const ExerciseDetail = () => {
	const { selectedExercise, targetMuscleExercises, equipmentExercises } = useSelector(
		state => state.exercises,
	);
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedExercise]);

	return (
		<div className="app__container">
			<div className="app__section app__exercise-detail">
				<div className="detail-container">
					<CardDetails className="card-detail-container" data={selectedExercise} />
					<div className="video-container">
						<Video />
						<Video />
						<Video />
					</div>
				</div>
				<div className="horizontal-scrollbar-container">
					<h2 className="subHead-text">Similar Target Muscle Exercises</h2>
					<HorizontalScrollbar
						items={targetMuscleExercises && targetMuscleExercises.slice(0, 11)}
					/>
				</div>
				<div className="horizontal-scrollbar-container">
					<h2 className="subHead-text">Similar Equipment Exercises</h2>
					<HorizontalScrollbar
						items={equipmentExercises && equipmentExercises.slice(0, 11)}
					/>
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

import React, { useEffect, useState } from 'react';
import { BasicCard } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchExercisesByTag,
	fetchTagList,
} from '../../redux/slices/exerciseSlice';

import './LoveExercises.scss';

const LoveExercises = () => {
	const dispatch = useDispatch();
	const { exercises, loading } = useSelector(state => state.exercises);
	const { userProfile } = useSelector(state => state.user);
	const { isAuth } = useSelector(state => state.isAuth);
	const [loveExercises, setLoveExercises] = useState([]);

	useEffect(() => {
		if (!exercises.length > 0) {
			dispatch(fetchExercisesByTag('all'));
			dispatch(fetchTagList());
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [exercises.length]);

	useEffect(() => {
		if (userProfile) {
			const userLoveExercises = exercises.filter(exercise =>
				userProfile.loveExercises.includes(exercise._id),
			);
			setLoveExercises(userLoveExercises);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userProfile, exercises.length]);

	// console.log(loveExercises);

	const renderCard = loveExercises
		.slice(0, 8)
		.map(exercise => (
			<BasicCard
				key={`${exercise.name}-${exercise.id}`}
				exercise={exercise}
				detailLink={`/exercisedetail/${exercise.id}`}
				isAuth={isAuth}
			/>
		));

	return (
		<div className="app__container">
			{!loading.exerciseLoading ? (
				<div className="app__section app__love-exercise">
					{renderCard}
				</div>
			) : (
				<div className="app__section app__love-exercise">
					<h2 className="subHead-text">Loading...</h2>
				</div>
			)}
		</div>
	);
};

export default LoveExercises;

import React, { useState, useEffect } from 'react';
import { BasicCard } from '../../components/';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchExercisesByTag,
	fetchTagList,
} from '../../redux/slices/exerciseSlice';

import './Home.scss';

const Home = () => {
	const { exercises, loading } = useSelector(state => state.exercises);
	const { isAuth } = useSelector(state => state.isAuth);
	const { userProfile } = useSelector(state => state.user);
	const [unSaveExercise, setUnSaveExercise] = useState(exercises);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!exercises.length > 0) {
			dispatch(fetchExercisesByTag('all'));
			dispatch(fetchTagList());
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [exercises.length]);

	useEffect(() => {
		if (userProfile) {
			const userUnsaveExercises = exercises.filter(
				exercise => !userProfile.loveExercises.includes(exercise._id),
			);
			setUnSaveExercise(userUnsaveExercises);
		} else {
			setUnSaveExercise(exercises);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userProfile, exercises.length]);

	const renderCard = unSaveExercise
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
				<div className="app__section app__home">{renderCard}</div>
			) : (
				<div className="app__section app__home">
					<h2 className="subHead-text">Loading...</h2>
				</div>
			)}
		</div>
	);
};

export default Home;

import React, { useState, useEffect } from 'react';
import { BasicCard, Pagination, Error } from '../../components/';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchExercisesByTag,
	setCurrentPage,
} from '../../redux/slices/exerciseSlice';

import './Home.scss';

const Home = () => {
	const dispatch = useDispatch();
	const { currentPage, exercises, loading, error } = useSelector(
		state => state.exercises,
	);
	const { isAuth } = useSelector(state => state.isAuth);
	const { userProfile } = useSelector(state => state.user);

	const [unSaveExercises, setUnSaveExercises] = useState(exercises); // home page only show unsaved exercises
	const [displayedExercises, setDisplayedExercises] = useState([]);

	useEffect(() => {
		dispatch(fetchExercisesByTag('all'));
		dispatch(setCurrentPage(1));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [currentPage]);

	useEffect(() => {
		if (!userProfile) return setUnSaveExercises(exercises);

		const userUnsaveExercises = exercises.filter(
			exercise => !userProfile.loveExercises.includes(exercise._id),
		);
		setUnSaveExercises(userUnsaveExercises);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userProfile, exercises]);

	useEffect(() => {
		if (unSaveExercises.length <= 0) return setDisplayedExercises([]);

		const displayedExercises = unSaveExercises.slice(
			(currentPage - 1) * 8,
			currentPage * 8,
		);
		setDisplayedExercises(displayedExercises);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [unSaveExercises, currentPage]);

	const renderCard = displayedExercises.map(exercise => (
		<BasicCard
			key={`${exercise.name}-${exercise.id}`}
			exercise={exercise}
			detailLink={`/exercisedetail/${exercise.id}`}
			isAuth={isAuth}
		/>
	));

	return (
		<div className="app__container">
			{error.exerciseError ? (
				<div className="app__section app__home">
					<Error />
				</div>
			) : !loading.exerciseLoading ? (
				<div className="app__section app__home">
					<div className="app__home-card-container">{renderCard}</div>
					{unSaveExercises && (
						<Pagination
							count={Math.ceil(unSaveExercises.length / 8)}
						/>
					)}
				</div>
			) : (
				<div className="app__section app__home">
					<h2 className="subHead-text">Loading...</h2>
				</div>
			)}
		</div>
	);
};

export default Home;

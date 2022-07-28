import React, { useState, useEffect } from 'react';
import { BasicCard, Pagination } from '../../components/';
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
	const [unSaveExercise, setUnSaveExercise] = useState(exercises); // home page only show unsaved exercises
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const [displayedExercises, setDisplayedExercises] = useState([]);

	useEffect(() => {
		dispatch(fetchExercisesByTag('all'));
		dispatch(fetchTagList());

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

	useEffect(() => {
		if (unSaveExercise.length > 0) {
			const displayedExercises = unSaveExercise.slice(
				(currentPage - 1) * 8,
				currentPage * 8,
			);
			setDisplayedExercises(displayedExercises);
		} else {
			setDisplayedExercises([]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [unSaveExercise, currentPage]);

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
			{!loading.exerciseLoading ? (
				<div className="app__section app__home">
					<div className="app__home-card-container">{renderCard}</div>
					<Pagination
						count={Math.ceil(unSaveExercise.length / 8)}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
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

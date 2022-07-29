import React, { useEffect, useState } from 'react';
import { BasicCard, Pagination } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchExercisesByTag,
	fetchTagList,
	setCurrentPage,
} from '../../redux/slices/exerciseSlice';

import './LoveExercises.scss';

const LoveExercises = () => {
	const dispatch = useDispatch();
	const { currentPage, exercises, loading } = useSelector(
		state => state.exercises,
	);
	const { userProfile } = useSelector(state => state.user);
	const { isAuth } = useSelector(state => state.isAuth);
	const [loveExercises, setLoveExercises] = useState([]);
	const [displayedExercises, setDisplayedExercises] = useState([]);

	useEffect(() => {
		if (!exercises.length > 0) {
			dispatch(fetchExercisesByTag('all'));
			dispatch(fetchTagList());
		}
		dispatch(setCurrentPage(1));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [currentPage]);

	useEffect(() => {
		if (userProfile) {
			const userLoveExercises = exercises.filter(exercise =>
				userProfile.loveExercises.includes(exercise._id),
			);
			setLoveExercises(userLoveExercises);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userProfile, exercises]);

	useEffect(() => {
		if (loveExercises.length > 0) {
			const displayedExercises = loveExercises.slice(
				(currentPage - 1) * 8,
				currentPage * 8,
			);
			setDisplayedExercises(displayedExercises);
		} else {
			setDisplayedExercises([]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loveExercises, currentPage]);

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
				<div className="app__section app__love-exercise">
					<div className="app__love-exercise__card-container">
						{renderCard}
					</div>

					<Pagination count={Math.ceil(loveExercises.length / 8)} />
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

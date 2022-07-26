import React, { useEffect } from 'react';
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

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchExercisesByTag('all'));
		dispatch(fetchTagList());

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderCard = exercises
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

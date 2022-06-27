import React, { useEffect } from 'react';
import { Card } from '../../components/';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExercisesByTag, fetchTagList } from '../../redux/slices/exerciseSlice';

import './Home.scss';

const Home = ({ isAuth }) => {
	const { exercises, tagList } = useSelector(state => state.exercises);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchExercisesByTag('all'));
		dispatch(fetchTagList());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		console.log(tagList);
	}, [tagList]);

	// console.log(exercises);

	return (
		<div className="app__container">
			<div className="app__section app__home">
				{exercises.slice(0, 8).map((exercise, i) => (
					<Link
						key={`${exercise.name}-${exercise.id}`}
						to={`/exercisedetail/${exercise.id}`}
					>
						<Card exercise={exercise} />
					</Link>
				))}
			</div>
		</div>
	);
};

export default Home;

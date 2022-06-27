import React from 'react';
import { FaHeart } from 'react-icons/fa';

import './CardDetails.scss';

const CardDetails = ({ data }) => {
	const { bodyPart, gifUrl, name, target, equipment } = data;

	return (
		<div className="app__card-details">
			<img src={gifUrl} alt="sample" />
			<div className="tags-container">
				<div className={`tag-container__box app--lightgreenbg`}>
					<p className="p-text-16">{bodyPart}</p>
				</div>
				<div className={`tag-container__box app--lightpurplebg`}>
					<p className="p-text-16">{target}</p>
				</div>
				<div className={`tag-container__box app--lightyellowbg`}>
					<p className="p-text-16">{equipment}</p>
				</div>
				<FaHeart />
			</div>
			<p className="p-text-18">
				Exercises keep you strong.{' '}
				<span style={{ textTransform: 'capitalize' }}>{name}</span> is one of the best{' '}
				<br /> exercises to train your {target}. It will help you improve your <br /> mood
				and gain energy.
			</p>
		</div>
	);
};

export default CardDetails;

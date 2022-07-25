import React from 'react';
import { FaHeart } from 'react-icons/fa';
import './BasicCard.scss';

const BasicCard = ({ exercise }) => {
	const { bodyPart, gifUrl, name } = exercise;
	return (
		<div className="app__card">
			<div className="image-container">
				<img src={gifUrl} alt="img" loading="lazy" />
			</div>
			<div className="tag-container">
				<div className={`tag-container__box app--lightpurplebg`}>
					<p className="caption-text">{bodyPart}</p>
				</div>
				{/* <div className={`tag-container__box app--lightpurplebg`}>
					<p className="caption-text">{target}</p>
				</div> */}

				<FaHeart />
			</div>
			<p className="p-text-18">{name}</p>
		</div>
	);
};

export default BasicCard;

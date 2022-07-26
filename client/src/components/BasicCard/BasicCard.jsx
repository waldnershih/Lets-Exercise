import React, { useState } from 'react';
// import { FaHeart } from 'react-icons/fa';
import './BasicCard.scss';
import { Link } from 'react-router-dom';

const BasicCard = ({ exercise, detailLink, isAuth }) => {
	const { bodyPart, gifUrl, name } = exercise;
	const [isSave, setIsSave] = useState(false);

	const handleOnSave = () => {
		if (isAuth) {
			console.log('Saved!');
			setIsSave(true);
		} else {
			console.log('Please login to save!');
		}
	};

	const handleOnUnsave = () => {
		console.log('Unsaved!');
		setIsSave(false);
	};

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

				{/* <FaHeart /> */}
			</div>
			<p className="p-text-18">{name}</p>
			<div className="action-container">
				{isSave ? (
					<p className="p-text-16" onClick={handleOnUnsave}>
						Unsave
					</p>
				) : (
					<p className="p-text-16" onClick={handleOnSave}>
						Save
					</p>
				)}

				{detailLink && (
					<Link to={detailLink}>
						<p className="p-text-16">Detail</p>
					</Link>
				)}
			</div>
		</div>
	);
};

export default BasicCard;

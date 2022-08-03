import React from 'react';
import { Link } from 'react-router-dom';
import './Schedule.scss';

const Schedule = () => {
	return (
		<div className="app__schedule">
			<div className="app__schedule-container">
				<h1 className="head-text">Developing Features</h1>
				<Link to="/">
					<div>
						<p className="p-text">Go Home</p>
					</div>
				</Link>
			</div>
			<p className="p-copyright">
				&copy; All rights reserved – Waldner 2022
			</p>
		</div>
	);
};

export default Schedule;

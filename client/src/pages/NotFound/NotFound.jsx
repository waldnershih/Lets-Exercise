import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
	return (
		<div className="app__notfound">
			<div className="app__notfound-container">
				<h1 className="head-text">Not Found - 404</h1>
				<Link to="/">
					<div>
						<p className="p-text">Go Home</p>
					</div>
				</Link>
			</div>
			<p className="p-copyright">&copy; All rights reserved – HsuanYu 2022</p>
		</div>
	);
};

export default NotFound;

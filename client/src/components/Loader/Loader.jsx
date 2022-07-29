import React from 'react';

import './Loader.scss';

const Loader = ({ flex }) => {
	return (
		<div className="app__loader-container">
			<h2 className="subHead-text" style={{ flex }}>
				Loading...
			</h2>
		</div>
	);
};

export default Loader;

import React from 'react';

import './Error.scss';

const Error = ({ message }) => {
	return (
		<div className="app__error">
			<p className="p-text-18">
				{message ? message : 'Data is unavailable'}
			</p>
		</div>
	);
};

export default Error;

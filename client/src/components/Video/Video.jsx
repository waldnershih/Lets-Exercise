import React, { useState, useEffect } from 'react';

import './Video.scss';

const Video = ({ video }) => {
	const [titleLength, setTitleLength] = useState(0);
	useEffect(() => {
		setTitleLength(video.snippet.title.length);
	}, [video.snippet.title]);

	return (
		<a
			href={`https://www.youtube.com/watch?v=${video?.id?.videoId}`}
			target="_blank"
			rel="noreferrer"
		>
			<div className="app__video">
				<img
					src={video.snippet.thumbnails.medium.url}
					alt={video.snippet.title}
				/>
				<div className="content">
					<p className="caption-text">
						{titleLength < 40
							? video.snippet.title
							: `${video.snippet.title.substring(0, 40)}...`}
					</p>
				</div>
			</div>
		</a>
	);
};

export default Video;

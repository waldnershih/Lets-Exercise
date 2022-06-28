import React from 'react';

import './Video.scss';

const Video = ({ video }) => {
	return (
		<a
			href={`https://www.youtube.com/watch?v=${video?.id?.videoId}`}
			target="_blank"
			rel="noreferrer"
		>
			<div className="app__video">
				<img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
				<div className="content">
					<h2 className="subHead-text">{video.snippet.title}</h2>
				</div>
			</div>
		</a>
	);
};

export default Video;

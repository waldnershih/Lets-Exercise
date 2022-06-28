const baseVideoUrl = new URL('https://www.googleapis.com/youtube/v3/search');
const videoParams = {
	part: 'snippet',
	type: 'video',
	maxResult: 5,
	key: process.env.REACT_APP_YOUTUBE_API_KEY,
};
// baseVideoUrl.search = new URLSearchParams(params).toString();

const youtubeOptions = {
	method: 'GET',
};

export { baseVideoUrl, youtubeOptions, videoParams };

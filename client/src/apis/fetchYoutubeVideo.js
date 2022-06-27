const baseYoutubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

export const youtubeOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
		'X-RapidAPI-Key': process.env.REACT_APP_X_RAPID_API_KEY,
	},
};

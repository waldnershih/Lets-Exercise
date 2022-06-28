import { exerciseOptions, baseExerciseUrl } from './fetchExercise';
import { baseVideoUrl, youtubeOptions, videoParams } from './fetchYoutubeVideo';

const fetchData = async (url, options) => {
	try {
		const response = await fetch(url, options);
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
};

export { baseExerciseUrl, exerciseOptions, fetchData, youtubeOptions, baseVideoUrl, videoParams };

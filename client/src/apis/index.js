import { baseExerciseUrl, exerciseOptions } from './fetchExercise';
import { baseVideoUrl, youtubeOptions, videoParams } from './fetchYoutubeVideo';
import { baseUserUrl, userOptions } from './fetchUser';
import { baseReviewsUrl, reviewsOptions } from './fetchReviews';

const fetchData = async (url, options, type = 'selfServer') => {
	options.method = 'GET';

	if (type === 'selfServer') {
		const token = localStorage.getItem('token');

		if (token) {
			options.headers.Authorization = `${token}`;
		} else {
			delete options.headers.Authorization;
		}
	}

	try {
		const response = await fetch(url, options);
		if (response.ok) {
			return await response.json();
		}

		throw response;
	} catch (err) {
		const error = await err.text();
		throw error;
	}
};

const postData = async (url, options) => {
	options.method = 'POST';

	const token = localStorage.getItem('token');
	if (token) {
		options.headers.Authorization = `${token}`;
	} else {
		delete options.headers.Authorization;
	}

	try {
		const response = await fetch(url, options);
		if (response.ok) {
			return await response.json();
		}

		throw response;
	} catch (err) {
		const error = await err.text();
		throw error;
	}
};

const putData = async (url, options) => {
	options.method = 'PUT';

	const token = localStorage.getItem('token');
	if (token) {
		options.headers.Authorization = `${token}`;
	} else {
		delete options.headers.Authorization;
	}

	try {
		const response = await fetch(url, options);
		if (response.ok) {
			return await response.json();
		}

		throw response;
	} catch (err) {
		const error = await err.text();
		throw error;
	}
};

const patchData = async (url, options) => {
	options.method = 'PATCH';

	const token = localStorage.getItem('token');
	if (token) {
		options.headers.Authorization = `${token}`;
	} else {
		delete options.headers.Authorization;
	}

	try {
		const response = await fetch(url, options);
		if (response.ok) {
			return await response.json();
		}

		throw response;
	} catch (err) {
		const error = await err.text();
		throw error;
	}
};

const deleteData = async (url, options) => {
	options.method = 'DELETE';

	const token = localStorage.getItem('token');
	if (token) {
		options.headers.Authorization = `${token}`;
	}

	try {
		const response = await fetch(url, options);
		if (response.ok) {
			return await response.json();
		}

		throw response;
	} catch (err) {
		const error = await err.text();
		throw error;
	}
};

export {
	fetchData,
	postData,
	putData,
	patchData,
	deleteData,
	baseExerciseUrl,
	exerciseOptions,
	youtubeOptions,
	baseVideoUrl,
	videoParams,
	baseUserUrl,
	userOptions,
	baseReviewsUrl,
	reviewsOptions,
};

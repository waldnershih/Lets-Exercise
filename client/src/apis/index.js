import { baseExerciseUrl, exerciseOptions } from './fetchExercise';
import { baseVideoUrl, youtubeOptions, videoParams } from './fetchYoutubeVideo';
import { baseUserUrl, userOptions } from './fetchUser';
import { baseReviewsUrl, reviewsOptions } from './fetchReviews';

// const baseUrl = 'https://localhost:5001';
const baseUrl = '/serverapi';
// const baseUrl = process.env.REACT_APP_SERVER_URL;

const fetchData = async (url, options, type = 'selfServer') => {
	options.method = 'GET';

	let concatUrl = url;

	if (type === 'selfServer') {
		const token = localStorage.getItem('token');
		concatUrl = `${baseUrl}${url}`;

		if (token) {
			options.headers.Authorization = `${token}`;
		} else {
			delete options.headers.Authorization;
		}
	}

	try {
		const response = await fetch(concatUrl, options);
		console.log(response);
		if (response.ok) {
			const data = await response.json();
			return data;
		}
		throw response;
	} catch (err) {
		if (
			err.message === 'Timeout' ||
			err.message === 'Failed to fetch' ||
			err.message === 'Network error'
		) {
			throw err.message;
		}
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
		const response = await fetch(`${baseUrl}${url}`, options);
		if (response.ok) {
			return await response.json();
		}

		throw response;
	} catch (err) {
		if (
			err.message === 'Timeout' ||
			err.message === 'Failed to fetch' ||
			err.message === 'Network error'
		) {
			throw err.message;
		}

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
		const response = await fetch(`${baseUrl}${url}`, options);
		if (response.ok) {
			return await response.json();
		}

		throw response;
	} catch (err) {
		if (
			err.message === 'Timeout' ||
			err.message === 'Failed to fetch' ||
			err.message === 'Network error'
		) {
			throw err.message;
		}
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
		const response = await fetch(`${baseUrl}${url}`, options);
		if (response.ok) {
			return await response.json();
		}

		throw response;
	} catch (err) {
		if (
			err.message === 'Timeout' ||
			err.message === 'Failed to fetch' ||
			err.message === 'Network error'
		) {
			throw err.message;
		}
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
		const response = await fetch(`${baseUrl}${url}`, options);
		if (response.ok) {
			return await response.json();
		}

		throw response;
	} catch (err) {
		if (
			err.message === 'Timeout' ||
			err.message === 'Failed to fetch' ||
			err.message === 'Network error'
		) {
			throw err.message;
		}
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

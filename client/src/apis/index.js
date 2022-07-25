import { baseExerciseUrl, exerciseOptions } from './fetchExercise';
import { baseVideoUrl, youtubeOptions, videoParams } from './fetchYoutubeVideo';
import { baseUserUrl, userOptions } from './fetchUser';

const fetchData = async (url, options) => {
	options.method = 'GET';

	const token = localStorage.getItem('token');

	if (token) {
		options.headers.Authorization = `${token}`;
	}

	try {
		const response = await fetch(url, options);
		if (response.ok) {
			return await response.json();
		}

		return;
	} catch (err) {
		console.log(err);
	}
};

const postData = async (url, options) => {
	options.method = 'POST';

	const token = localStorage.getItem('token');
	if (token) {
		options.headers.Authorization = `${token}`;
	}

	try {
		const response = await fetch(url, options);
		if (response.ok) {
			return await response.json();
		}

		return;
	} catch (err) {
		console.log(err);
	}
};

const putData = async (url, options) => {
	options.method = 'PUT';

	const token = localStorage.getItem('token');
	if (token) {
		options.headers.Authorization = `${token}`;
	}

	try {
		const response = await fetch(url, options);
		if (response.ok) {
			return await response.json();
		}

		return;
	} catch (err) {
		console.log(err);
	}
};

const patchData = async (url, options) => {
	options.method = 'PATCH';

	const token = localStorage.getItem('token');
	if (token) {
		options.headers.Authorization = `${token}`;
	}

	try {
		const response = await fetch(url, options);
		if (response.ok) {
			return await response.json();
		}

		return;
	} catch (err) {
		console.log(err);
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

		return;
	} catch (err) {
		console.log(err);
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
};

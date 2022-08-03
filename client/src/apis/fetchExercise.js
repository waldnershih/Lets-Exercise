// export const baseExerciseUrl = 'https://exercisedb.p.rapidapi.com';

// export const exerciseOptions = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
// 		'X-RapidAPI-Key': process.env.REACT_APP_X_RAPID_API_KEY,
// 	},
// };

export const baseExerciseUrl = '/exercises';
export const exerciseOptions = {
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers':
			'Origin, X-Requested-With, Content-Type, Accept',
	},
};

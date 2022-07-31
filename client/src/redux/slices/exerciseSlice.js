import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData, exerciseOptions, baseExerciseUrl } from '../../apis';

const initialExercisesState = {
	exercises: [],
	targetMuscleExercises: [],
	equipmentExercises: [],
	tagList: [],
	selectedExercise: {
		id: '',
		bodyPart: '',
		gifUrl: '',
		name: '',
		target: '',
		equipment: '',
	},
	reviewRating: 0,
	currentPage: 1,
	loading: {
		exerciseLoading: false,
		targetMuscleloading: false,
		equipmentLoading: false,
		tagListLoading: false,
		ratingLoading: false,
	},
	error: {
		exerciseError: '',
		targetMuscleError: '',
		equipmentError: '',
		tagListError: '',
		ratingError: '',
	},
};

export const fetchExercisesByTag = createAsyncThunk(
	'exercises/fetchExercisesByTag',
	async tag => {
		const exercisesUrl = `${baseExerciseUrl}`;
		try {
			if (tag === 'all') {
				return await fetchData(exercisesUrl, exerciseOptions);
			}
			return await fetchData(
				`${exercisesUrl}/bodyPart/${tag}`,
				exerciseOptions,
			);
		} catch (error) {
			throw error;
		}
	},
);

export const fetchExercisesByName = createAsyncThunk(
	'exercises/fetchExercisesByName',
	async name => {
		const exercisesUrl = `${baseExerciseUrl}`;
		try {
			const exercisesData = await fetchData(
				exercisesUrl,
				exerciseOptions,
			);
			const searchedExercises = exercisesData.filter(
				exercise =>
					exercise.name.toLowerCase().includes(name) ||
					exercise.target.toLowerCase().includes(name) ||
					exercise.equipment.toLowerCase().includes(name) ||
					exercise.bodyPart.toLowerCase().includes(name),
			);
			return searchedExercises;
		} catch (error) {
			throw error;
		}
	},
);

export const fetchExercisesByTargetMuscle = createAsyncThunk(
	'exercises/fetchExercisesByTargetMuscle',
	async target => {
		const targetMuscleExerciseUrl = `${baseExerciseUrl}/target/${target}`;
		try {
			return await fetchData(targetMuscleExerciseUrl, exerciseOptions);
		} catch (error) {
			throw error;
		}
	},
);

export const fetchExercisesByEquiment = createAsyncThunk(
	'exercises/fetchExercisesByEquiment',
	async equipment => {
		const equimentExercisesUrl = `${baseExerciseUrl}/equipment/${equipment}`;
		try {
			return await fetchData(equimentExercisesUrl, exerciseOptions);
		} catch (error) {
			throw error;
		}
	},
);

export const fetchExerciseById = createAsyncThunk(
	'exercises/fetchExerciseById',
	async id => {
		const exerciseDetailUrl = `${baseExerciseUrl}/exercise/${id}`;
		try {
			return await fetchData(exerciseDetailUrl, exerciseOptions);
		} catch (error) {
			throw error;
		}
	},
);

export const fetchTagList = createAsyncThunk(
	'exercises/fetchTagList',
	async () => {
		const tagListUrl = `${baseExerciseUrl}/bodyPartList`;
		try {
			const tagList = await fetchData(tagListUrl, exerciseOptions);
			return ['all', ...tagList];
		} catch (error) {
			throw error;
		}
	},
);

export const fetchReviewRatingByExerciseId = createAsyncThunk(
	'exercises/fetchReviewRatingByExerciseId',
	async exerciseId => {
		const reviewRatingUrl = `${baseExerciseUrl}/exercise/${exerciseId}/reviewRating`;
		try {
			return await fetchData(reviewRatingUrl, exerciseOptions);
		} catch (error) {
			throw error;
		}
	},
);

export const exerciseSlice = createSlice({
	name: 'exercises',
	initialState: initialExercisesState,
	reducers: {
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
	},
	extraReducers: {
		// fetchExercisesByTag
		[fetchExercisesByTag.pending]: (state, _) => {
			state.loading.exerciseLoading = true;
		},
		[fetchExercisesByTag.fulfilled]: (state, action) => {
			state.loading.exerciseLoading = false;
			state.exercises = action.payload;
		},
		[fetchExercisesByTag.rejected]: (state, action) => {
			state.loading.exerciseLoading = false;
			state.error.exerciseError = action.error.message;
		},

		// fetchExercisesByName
		[fetchExercisesByName.pending]: (state, _) => {
			state.loading.exerciseLoading = true;
		},
		[fetchExercisesByName.fulfilled]: (state, action) => {
			state.loading.exerciseLoading = false;
			state.exercises = action.payload;
		},
		[fetchExercisesByName.rejected]: (state, action) => {
			state.loading.exerciseLoading = false;
			state.error.exerciseError = action.error.message;
		},

		// fetchExercisesByTargetMuscle
		[fetchExercisesByTargetMuscle.pending]: (state, _) => {
			state.loading.targetMuscleloading = true;
		},
		[fetchExercisesByTargetMuscle.fulfilled]: (state, action) => {
			state.loading.targetMuscleloading = false;
			state.targetMuscleExercises = action.payload;
		},
		[fetchExercisesByTargetMuscle.rejected]: (state, action) => {
			state.loading.targetMuscleloading = false;
			state.error.targetMuscleError = action.error.message;
		},

		// fetchExercisesByEquiment
		[fetchExercisesByEquiment.pending]: (state, _) => {
			state.loading.equipmentLoading = true;
		},
		[fetchExercisesByEquiment.fulfilled]: (state, action) => {
			state.loading.equipmentLoading = false;
			state.equipmentExercises = action.payload;
		},
		[fetchExercisesByEquiment.rejected]: (state, action) => {
			state.loading.equipmentLoading = false;
			state.error.equipmentError = action.error.message;
		},

		// fetchExerciseById
		[fetchExerciseById.pending]: (state, _) => {
			state.loading.exerciseLoading = true;
		},
		[fetchExerciseById.fulfilled]: (state, action) => {
			state.loading.exerciseLoading = false;
			state.selectedExercise = action.payload;
		},
		[fetchExerciseById.rejected]: (state, action) => {
			state.loading.exerciseLoading = false;
			state.error.exerciseError = action.error.message;
		},

		// fetchTagList
		[fetchTagList.pending]: (state, _) => {
			state.loading.tagListLoading = true;
		},
		[fetchTagList.fulfilled]: (state, action) => {
			state.loading.tagListLoading = false;
			state.tagList = action.payload;
		},
		[fetchTagList.rejected]: (state, action) => {
			state.loading.tagListLoading = false;
			state.error.exerciseError = action.error.message;
		},

		// fetchReviewRatingByExerciseId
		[fetchReviewRatingByExerciseId.pending]: (state, _) => {
			state.loading.reviewRatingLoading = true;
		},
		[fetchReviewRatingByExerciseId.fulfilled]: (state, action) => {
			state.loading.reviewRatingLoading = false;
			state.reviewRating = action.payload;
		},
		[fetchReviewRatingByExerciseId.rejected]: (state, action) => {
			state.loading.reviewRatingLoading = false;
			state.error.exerciseError = action.error.message;
		},
	},
});

export const { setCurrentPage } = exerciseSlice.actions;

export const exerciseReducer = exerciseSlice.reducer;

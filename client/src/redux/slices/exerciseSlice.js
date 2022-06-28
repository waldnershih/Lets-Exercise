import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData, exerciseOptions, baseExerciseUrl } from '../../apis';

const initialExercisesState = {
	exercises: [],
	targetMuscleExercises: [],
	equipmentExercises: [],
	tagList: [],
	selectedExercise: { id: '', bodyPart: '', gifUrl: '', name: '', target: '', equipment: '' },
	loading: {
		exerciseLoading: false,
		targetMuscleloading: false,
		equipmentLoading: false,
		tagListLoading: false,
	},
	error: {
		exerciseError: '',
		targetMuscleError: '',
		equipmentError: '',
		tagListError: '',
	},
};

export const fetchExercisesByTag = createAsyncThunk('exercises/fetchExercisesByTag', async tag => {
	const exercisesUrl = `${baseExerciseUrl}/exercises`;
	try {
		if (tag === 'all') {
			return await fetchData(exercisesUrl, exerciseOptions);
		}
		return await fetchData(`${exercisesUrl}/bodyPart/${tag}`, exerciseOptions);
	} catch (error) {
		throw error;
	}
});

export const fetchExercisesByName = createAsyncThunk(
	'exercises/fetchExercisesByName',
	async name => {
		const exercisesUrl = `${baseExerciseUrl}/exercises`;
		try {
			const exercisesData = await fetchData(exercisesUrl, exerciseOptions);
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
		const targetMuscleExerciseUrl = `${baseExerciseUrl}/exercises/target/${target}`;
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
		const equimentExercisesUrl = `${baseExerciseUrl}/exercises/equipment/${equipment}`;
		try {
			return await fetchData(equimentExercisesUrl, exerciseOptions);
		} catch (error) {
			throw error;
		}
	},
);

export const fetchExerciseById = createAsyncThunk('exercises/fetchExerciseById', async id => {
	const exerciseDetailUrl = `${baseExerciseUrl}/exercises/exercise/${id}`;
	try {
		return await fetchData(exerciseDetailUrl, exerciseOptions);
	} catch (error) {
		throw error;
	}
});

export const fetchTagList = createAsyncThunk('exercises/fetchTagList', async () => {
	const tagListUrl = `${baseExerciseUrl}/exercises/bodyPartList`;
	try {
		const tagList = await fetchData(tagListUrl, exerciseOptions);
		return ['all', ...tagList];
	} catch (error) {
		throw error;
	}
});

export const exerciseSlice = createSlice({
	name: 'exercises',
	initialState: initialExercisesState,
	reducers: {},
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
			state.loading = false;
			state.error.exerciseError = action.error.message;
		},

		// fetchTagList
		[fetchTagList.pending]: (state, _) => {
			state.loading.exerciseLoading = true;
		},
		[fetchTagList.fulfilled]: (state, action) => {
			state.loading.exerciseLoading = false;
			state.tagList = action.payload;
		},
		[fetchTagList.rejected]: (state, action) => {
			state.loading = false;
			state.error.exerciseError = action.error.message;
		},
	},
});

export const exerciseReducer = exerciseSlice.reducer;

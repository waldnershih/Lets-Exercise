import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	fetchData,
	postData,
	putData,
	deleteData,
	reviewsOptions,
	baseReviewsUrl,
} from '../../apis';

const initialReviewState = {
	reviews: [],
	selectedReview: null,
	loading: false,
	error: '',
	success: true,
};

export const fetchAllReviewsByExerciseId = createAsyncThunk(
	'reviews/fetchAllReviewsByExerciseId',
	async exerciseId => {
		const reviewsUrl = `${baseReviewsUrl}/${exerciseId}/reviews`;
		delete reviewsOptions.body;
		try {
			const response = await fetchData(
				reviewsUrl,
				reviewsOptions,
				'reviews',
			);
			return response;
		} catch (error) {
			throw error;
		}
	},
);

export const createReviewByExerciseId = createAsyncThunk(
	'reviews/createReviewByExerciseId',
	// data: {exerciseId, review}
	async data => {
		const { exerciseId, review } = data;
		const reviewsUrl = `${baseReviewsUrl}/${exerciseId}/reviews`;
		reviewsOptions.body = JSON.stringify(review);
		try {
			const response = await postData(reviewsUrl, reviewsOptions);
			return response;
		} catch (error) {
			throw error;
		}
	},
);

export const fetchReviewByExerciseId = createAsyncThunk(
	'reviews/fetchReviewByExerciseId',
	// data: {exerciseId, reviewId}
	async data => {
		const { exerciseId, reviewId } = data;
		const reviewsUrl = `${baseReviewsUrl}/${exerciseId}/reviews/review/${reviewId}`;
		delete reviewsOptions.body;
		try {
			const response = await fetchData(reviewsUrl, reviewsOptions);
			return response;
		} catch (error) {
			throw error;
		}
	},
);

export const updateReviewByExerciseId = createAsyncThunk(
	'reviews/updateReviewByExerciseId',
	// data: {exerciseId, reviewId, review}
	async data => {
		console.log(data);
		const { exerciseId, reviewId, review } = data;
		const reviewsUrl = `${baseReviewsUrl}/${exerciseId}/reviews/review/${reviewId}`;
		reviewsOptions.body = JSON.stringify(review);
		try {
			const response = await putData(reviewsUrl, reviewsOptions);
			return response;
		} catch (error) {
			throw error;
		}
	},
);

export const deleteReviewByExerciseId = createAsyncThunk(
	'reviews/deleteReviewByExerciseId',
	// data: {exerciseId, reviewId}
	async data => {
		const { exerciseId, reviewId } = data;
		const reviewsUrl = `${baseReviewsUrl}/${exerciseId}/reviews/review/${reviewId}`;
		try {
			const response = await deleteData(reviewsUrl, reviewsOptions);
			return response;
		} catch (error) {
			throw error;
		}
	},
);

export const reviewSlice = createSlice({
	name: 'reviews',
	initialState: initialReviewState,
	reducers: {},
	extraReducers: {
		// fetch reviews by exercise id
		[fetchAllReviewsByExerciseId.pending]: (state, _) => {
			state.loading = true;
			state.success = false;
		},
		[fetchAllReviewsByExerciseId.fulfilled]: (state, action) => {
			state.loading = false;
			state.reviews = action.payload;
			state.success = true;
		},
		[fetchAllReviewsByExerciseId.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
			state.success = false;
		},

		// create review by exercise id
		[createReviewByExerciseId.pending]: (state, _) => {
			state.loading = true;
			state.success = false;
		},
		[createReviewByExerciseId.fulfilled]: (state, action) => {
			state.loading = false;
			state.reviews.push(action.payload);
			state.success = true;
		},
		[createReviewByExerciseId.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
			state.success = false;
		},

		// fetch review by exercise id
		[fetchReviewByExerciseId.pending]: (state, _) => {
			state.loading = true;
			state.success = false;
		},
		[fetchReviewByExerciseId.fulfilled]: (state, action) => {
			state.loading = false;
			state.selectedReview = action.payload;
			state.success = true;
		},
		[fetchReviewByExerciseId.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
			state.success = false;
		},

		// update review by exercise id
		[updateReviewByExerciseId.pending]: (state, _) => {
			state.loading = true;
			state.success = false;
		},
		[updateReviewByExerciseId.fulfilled]: (state, action) => {
			state.loading = false;
			state.reviews = state.reviews.map(review => {
				if (review._id === action.payload._id) {
					return action.payload;
				}
				return review;
			});
			state.success = true;
		},
		[updateReviewByExerciseId.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
			state.success = false;
		},

		// delete review by exercise id
		[deleteReviewByExerciseId.pending]: (state, _) => {
			state.loading = true;
			state.success = false;
		},
		[deleteReviewByExerciseId.fulfilled]: (state, action) => {
			state.loading = false;
			state.reviews = state.reviews.filter(review => {
				return review._id !== action.payload;
			});
			state.success = true;
		},
		[deleteReviewByExerciseId.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
			state.success = false;
		},
	},
});

export const reviewReducer = reviewSlice.reducer;

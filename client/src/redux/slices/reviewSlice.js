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
	allReviewsLength: 0,
	selectedReview: null,
	loading: false,
	error: '',
	success: true,

	lengthLoading: false,
	lengthError: '',
	lengthSuccess: true,
};

export const fetchReviewsLengthByExerciseId = createAsyncThunk(
	'reviews/fetchReviewsLengthByExerciseId',
	async exerciseId => {
		const url = `${baseReviewsUrl}/${exerciseId}/reviews/length`;
		delete reviewsOptions.params;
		delete reviewsOptions.body;
		const response = await fetchData(url, reviewsOptions);

		return response;
	},
);

export const fetchAllReviewsByExerciseId = createAsyncThunk(
	'reviews/fetchAllReviewsByExerciseId',
	async exerciseId => {
		const reviewsUrl = `${baseReviewsUrl}/${exerciseId}/reviews`;
		delete reviewsOptions.body;
		try {
			const response = await fetchData(reviewsUrl, reviewsOptions);
			return response;
		} catch (error) {
			throw error;
		}
	},
);

export const fetchReviewsWithPagination = createAsyncThunk(
	'reviews/fetchReviewsWithPagination',
	// {limit, page} = query
	async ({ exerciseId, limit, page }) => {
		const reviewsUrl = `${baseReviewsUrl}/${exerciseId}/reviews?limit=${limit}&page=${page}`;
		delete reviewsOptions.body;
		try {
			const response = await fetchData(reviewsUrl, reviewsOptions);
			return response ? response : null;
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
	reducers: {
		resetReviews: (state, _) => {
			state.reviews = [];
		},
	},
	extraReducers: {
		// fetch reviews length
		[fetchReviewsLengthByExerciseId.pending]: (state, _) => {
			state.lengthLoading = true;
			state.lengthSuccess = true;
		},
		// fetch reviews length
		[fetchReviewsLengthByExerciseId.fulfilled]: (state, action) => {
			state.lengthLoading = false;
			state.lengthSuccess = true;
			state.allReviewsLength = action.payload;
		},
		// fetch reviews length
		[fetchReviewsLengthByExerciseId.rejected]: (state, action) => {
			state.lengthLoading = false;
			state.lengthSuccess = false;
			state.lengthError = action.error.message;
		},

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

		// fetch reviews with pagination
		[fetchReviewsWithPagination.pending]: (state, _) => {
			state.loading = true;
			state.success = false;
		},
		[fetchReviewsWithPagination.fulfilled]: (state, action) => {
			state.loading = false;
			state.reviews.push(...action.payload);
			state.success = true;
		},
		[fetchReviewsWithPagination.rejected]: (state, action) => {
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
			state.reviews = [action.payload, ...state.reviews];
			state.allReviewsLength += 1;
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
			state.allReviewsLength -= 1;
			state.success = true;
		},
		[deleteReviewByExerciseId.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
			state.success = false;
		},
	},
});

export const { resetReviews } = reviewSlice.actions;

export const reviewReducer = reviewSlice.reducer;

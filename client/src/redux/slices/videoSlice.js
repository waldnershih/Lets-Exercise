import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData, youtubeOptions, baseVideoUrl, videoParams } from '../../apis';

const initialVideoState = {
	videos: [],
	loading: false,
	error: '',
};

export const fetchVideosByTerm = createAsyncThunk('videos/fetchVideosByTerm', async term => {
	videoParams.q = term;
	baseVideoUrl.search = new URLSearchParams(videoParams).toString();
	try {
		const response = await fetchData(baseVideoUrl, youtubeOptions);
		return response.items;
	} catch (error) {
		throw error;
	}
});

export const videoSlice = createSlice({
	name: 'videos',
	initialState: initialVideoState,
	reducers: {},
	extraReducers: {
		// fetch videos by term
		[fetchVideosByTerm.pending]: (state, _) => {
			state.loading = true;
		},
		[fetchVideosByTerm.fulfilled]: (state, action) => {
			state.loading = false;
			state.videos = action.payload;
		},
		[fetchVideosByTerm.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
	},
});

export const videoReducer = videoSlice.reducer;

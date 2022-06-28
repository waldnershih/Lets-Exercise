import { configureStore } from '@reduxjs/toolkit';
import { exerciseReducer } from './slices/exerciseSlice';
import { videoReducer } from './slices/videoSlice';

const store = configureStore({
	reducer: {
		exercises: exerciseReducer,
		videos: videoReducer,
	},
});

export default store;

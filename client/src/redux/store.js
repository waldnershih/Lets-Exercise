import { configureStore } from '@reduxjs/toolkit';
import { exerciseReducer } from './slices/exerciseSlice';

const store = configureStore({
	reducer: {
		exercises: exerciseReducer,
	},
});

export default store;

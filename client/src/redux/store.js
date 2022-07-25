import { configureStore } from '@reduxjs/toolkit';
import { exerciseReducer } from './slices/exerciseSlice';
import { videoReducer } from './slices/videoSlice';
import { userReducer } from './slices/userSlice';
import { isAuthReducer } from './slices/isAuthSlice';

const store = configureStore({
	reducer: {
		exercises: exerciseReducer,
		videos: videoReducer,
		user: userReducer,
		isAuth: isAuthReducer,
	},
});

export default store;

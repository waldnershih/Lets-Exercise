import { createSlice } from '@reduxjs/toolkit';

const initialIsAuthState = {
	isAuth: false,
	loading: false,
	error: '',
};

export const isAuthSlice = createSlice({
	name: 'isAuth',
	initialState: initialIsAuthState,
	reducers: {
		setIsAuth: (state, action) => {
			state.isAuth = action.payload;
		},
	},
	extraReducers: {},
});

export const { setIsAuth } = isAuthSlice.actions;

export const isAuthReducer = isAuthSlice.reducer;

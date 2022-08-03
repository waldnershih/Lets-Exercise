import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	fetchData,
	postData,
	patchData,
	deleteData,
	baseUserUrl,
	userOptions,
} from '../../apis';

const initialUsertate = {
	userProfile: null,
	userToken: localStorage.getItem('token') || '',
	loading: false,
	error: '',
	success: false,

	loginLoading: false,
	loginError: '',
	loginSuccess: false,
};

export const registerUser = createAsyncThunk(
	'user/registerUser',
	async data => {
		userOptions.body = JSON.stringify(data);
		try {
			const response = await postData(
				`${baseUserUrl}/register`,
				userOptions,
			);

			localStorage.setItem('token', response.token);
			// localStorage.setItem('userId', JSON.stringify(response.user._id));
			localStorage.setItem(
				'expiresIn',
				JSON.stringify(response.expiresIn),
			);

			return response.user;
		} catch (error) {
			throw error;
		}
	},
);

export const loginUser = createAsyncThunk('user/loginUser', async data => {
	userOptions.body = JSON.stringify(data);

	try {
		const response = await postData(`${baseUserUrl}/login`, userOptions);

		localStorage.setItem('token', response.token);
		// localStorage.setItem('userId', JSON.stringify(response.user._id));
		localStorage.setItem('expiresIn', JSON.stringify(response.expiresIn));

		return response.user;
	} catch (error) {
		throw error;
	}
});

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
	localStorage.removeItem('token');
	// localStorage.removeItem('userId');
	localStorage.removeItem('expiresIn');
	return null;
});

export const fetchUserProfile = createAsyncThunk(
	'user/fetchUserProfile',
	async () => {
		delete userOptions.body;
		try {
			const response = await fetchData(
				`${baseUserUrl}/profile`,
				userOptions,
			);
			return response;
		} catch (error) {
			throw error;
		}
	},
);

export const patchUserProfile = createAsyncThunk(
	'user/patchUserProfile',
	async data => {
		userOptions.body = JSON.stringify(data);

		try {
			const response = await patchData(
				`${baseUserUrl}/profile`,
				userOptions,
			);

			console.log(response);

			return response;
		} catch (error) {
			throw error;
		}
	},
);

export const deleteUserProfile = createAsyncThunk(
	'user/deleteUserProfile',
	async () => {
		try {
			const response = await deleteData(
				`${baseUserUrl}/profile`,
				userOptions,
			);
			return response;
		} catch (error) {
			throw error;
		}
	},
);

export const userSlice = createSlice({
	name: 'user',
	initialState: initialUsertate,
	reducers: {
		clearLoginError: state => {
			state.loginError = '';
		},
		clearLoginSuccess: state => {
			state.loginSuccess = false;
		},
	},
	extraReducers: {
		// login user
		[loginUser.pending]: (state, _) => {
			state.loginLoading = true;
			state.loginSuccess = false;
			state.loginError = '';
		},
		[loginUser.fulfilled]: (state, action) => {
			// state.userProfile = action.payload;
			state.userToken = localStorage.getItem('token');
			state.loginLoading = false;
			state.loginSuccess = true;
			state.loginError = '';
		},
		[loginUser.rejected]: (state, action) => {
			state.loginLoading = false;
			state.loginSuccess = false;
			state.loginError = action.error.message;
		},
		// logout user
		[logoutUser.pending]: (state, _) => {
			state.loading = true;
			state.success = false;
		},
		[logoutUser.fulfilled]: (state, action) => {
			state.userToken = '';
			state.loading = false;
			state.success = true;
			state.userProfile = null;
			state.error = '';
			state.loginLoading = false;
			state.loginSuccess = false;
			state.loginError = '';
		},
		[logoutUser.rejected]: (state, action) => {
			state.error = action.error.message;
			state.loading = false;
			state.success = false;
		},

		// register user
		[registerUser.pending]: (state, _) => {
			state.loginLoading = true;
			state.loginSuccess = false;
			state.loginError = '';
		},
		[registerUser.fulfilled]: (state, action) => {
			// state.userProfile = action.payload;
			state.userToken = localStorage.getItem('token');
			state.loginLoading = false;
			state.loginSuccess = true;
			state.loginError = '';
		},
		[registerUser.rejected]: (state, action) => {
			state.loginLoading = false;
			state.loginSuccess = false;
			state.loginError = action.error.message;
		},
		// fetch user by id
		[fetchUserProfile.pending]: (state, _) => {
			state.loading = true;
		},
		[fetchUserProfile.fulfilled]: (state, action) => {
			state.userProfile = action.payload;
			state.loading = false;

			state.error = '';
		},
		[fetchUserProfile.rejected]: (state, action) => {
			state.error = action.error.message;
			state.loading = false;
		},
		// patch user by id
		[patchUserProfile.pending]: (state, _) => {
			state.loading = true;
			state.success = false;
		},
		[patchUserProfile.fulfilled]: (state, action) => {
			state.userProfile = action.payload;
			state.loading = false;
			state.success = true;
			state.error = '';
		},
		[patchUserProfile.rejected]: (state, action) => {
			state.error = action.error.message;
			state.success = false;
			state.loading = false;
		},
		// delete user by id
		[deleteUserProfile.pending]: (state, _) => {
			state.loading = true;
		},
		[deleteUserProfile.fulfilled]: (state, _) => {
			state.userProfile = {};
			state.loading = false;
			state.error = '';
		},
		[deleteUserProfile.rejected]: (state, action) => {
			state.error = action.error.message;
			state.loading = false;
		},
	},
});

export const { clearLoginError, clearLoginSuccess } = userSlice.actions;

export const userReducer = userSlice.reducer;

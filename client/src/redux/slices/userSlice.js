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
	reducers: {},
	extraReducers: {
		// login user
		[loginUser.pending]: (state, _) => {
			state.loading = true;
			state.success = false;
		},
		[loginUser.fulfilled]: (state, action) => {
			// state.userProfile = action.payload;
			state.userToken = localStorage.getItem('token');
			state.loading = false;
			state.success = true;
			state.error = '';
		},
		[loginUser.rejected]: (state, action) => {
			state.error = action.error;
			state.loading = false;
			state.success = false;
		},
		// logout user
		[logoutUser.pending]: (state, _) => {
			state.loading = true;
		},
		[logoutUser.fulfilled]: (state, action) => {
			// state.userProfile = action.payload;
			state.loading = false;
			state.userProfile = null;
			state.userToken = '';
			state.error = '';
		},
		[logoutUser.rejected]: (state, action) => {
			state.error = action.error;
			state.loading = false;
		},

		// register user
		[registerUser.pending]: (state, _) => {
			state.loading = true;
			state.success = false;
		},
		[registerUser.fulfilled]: (state, action) => {
			// state.userProfile = action.payload;
			state.userToken = localStorage.getItem('token');
			state.loading = false;
			state.success = true;

			state.error = '';
		},
		[registerUser.rejected]: (state, action) => {
			state.error = action.error;
			state.loading = false;
			state.success = false;
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
			state.error = action.error;
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
			state.error = action.error;
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
			state.error = action.error;
			state.loading = false;
		},
	},
});

export const userReducer = userSlice.reducer;

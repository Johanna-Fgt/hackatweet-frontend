import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: { token: null, username: null, firstname: null, likedTweets: [] },
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			state.value.token = action.payload.token;
			state.value.firstname = action.payload.firstname;
			state.value.username = action.payload.username;
			state.value.likedTweets = action.payload.likedTweets;
		},
		logout: (state) => {
			state.value.token = null;
			state.value.firstname = null;
			state.value.username = null;
			state.value.likedTweets = [];
		},
		setLikedTweets: (state, action) => {
			state.value.likedTweets = action.payload;
		},
	},
});

export const { login, logout, setLikedTweets } = userSlice.actions;
export default userSlice.reducer;

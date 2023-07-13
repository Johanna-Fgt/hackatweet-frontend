import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	tweets: [],
};

export const tweetsSlice = createSlice({
	name: 'tweets',
	initialState,
	reducers: {
		addTweets: (state, action) => {
			state.tweets.push(action.payload);
		},
		removeTweets: (state, action) => {
			state.tweets = state.tweets.filter(
				(tweet) => tweet.description !== action.payload.description
			);
		},
	},
});

export const { addTweets, removeTweets } = tweetsSlice.actions;
export default tweetsSlice.reducer;

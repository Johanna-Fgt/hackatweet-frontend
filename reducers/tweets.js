import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	tweets: [],
	hashtags: [],
};

export const tweetsSlice = createSlice({
	name: 'tweets',
	initialState,
	reducers: {
		getAllTweets: (state, action) => {
			const allHashtags = action.payload.map((t) => !!t.hashtag && t.hashtag); // [ ['','',''],['',''],[''] ]
			allHashtags.forEach((element) => {
				for (let i = 0; i < element.length; i++) {
					!state.hashtags.includes(element[i]) &&
						state.hashtags.push(element[i]);
				}
			});
			state.tweets = [...action.payload].reverse();
		},
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

export const { getAllTweets, addTweets, removeTweets } = tweetsSlice.actions;
export default tweetsSlice.reducer;

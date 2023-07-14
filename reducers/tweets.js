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
			state.hashtags = [];
			const allHashtags = action.payload.map((t) => !!t.hashtag && t.hashtag); // [ ['','',''],['',''],[''] ]
			allHashtags.forEach((element) => {
				for (let i = 0; i < element.length; i++) {
					!state.hashtags.includes(element[i]) &&
						state.hashtags.push(element[i]);
				}
			});

			state.tweets = [...action.payload].reverse();
		},
	},
});

export const { getAllTweets } = tweetsSlice.actions;
export default tweetsSlice.reducer;

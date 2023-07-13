import { useState } from 'react';
import styles from '../styles/LastTweets.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTweets } from '../reducers/tweets';

const LastTweets = () => {
	const dispatch = useDispatch();
	const { username, firstname, token } = useSelector(
		(state) => state.user.value
	);
	const [newTweetDesc, setNewTextDesc] = useState('');

	const handleTweet = () => {
		const URL = 'http://localhost:3000/tweets/new';
		const config = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				description: newTweetDesc,
				hashtag: 'test',
				token,
			}),
		};

		fetch(URL, config)
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					dispatch(
						addTweets({
							firstname,
							username,
							description: newTweetDesc,
							hashtag: 'test',
							date: data.date,
						})
					);
					setNewTextDesc('');
				}
			});
	};
	return (
		<div className={styles.container}>
			<h2>Home</h2>
			<div>
				<input
					type="text"
					placeholder="What's up?"
					onChange={(e) =>
						newTweetDesc.length < 280 && setNewTextDesc(e.target.value)
					}
					value={newTweetDesc}
				/>
				<span>{newTweetDesc.length}/280</span>
				<button type="submit" className={styles.btn} onClick={handleTweet}>
					Tweet
				</button>
			</div>
		</div>
	);
};

export default LastTweets;

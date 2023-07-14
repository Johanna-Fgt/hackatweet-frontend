import styles from '../styles/LastTweets.module.css';
import { useState } from 'react';
import { getTimeToDeparture } from '../utils/time';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const LastTweets = (props) => {
	const { username, token } = useSelector((state) => state.user.value);
	const tweets = useSelector((state) => state.tweets.tweets);
	const [newTweetDesc, setNewTextDesc] = useState('');

	const createTweet = () => {
		const pattern = /#\S+/g;
		const hashtag = newTweetDesc.match(pattern);
		// const URL = 'http://localhost:3000/tweets/new';
		const URL = 'https://hackatweet-backend-mu.vercel.app/tweets/new';
		const config = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				description: newTweetDesc,
				hashtag,
				token,
			}),
		};

		fetch(URL, config)
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					props.getTweets();
					setNewTextDesc('');
				}
			});
	};

	const updateTweet = (id) => {
		// const URL = `http://localhost:3000/tweets/update/${id}`;
		const URL = `https://hackatweet-backend-mu.vercel.app/tweets/update/${id}`;
		const config = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token }),
		};

		fetch(URL, config)
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					props.getTweets();
				}
			});
	};

	const deleteTweet = (id) => {
		// const URL = `http://localhost:3000/tweets/delete/${id}`;
		const URL = `https://hackatweet-backend-mu.vercel.app/tweets/delete/${id}`;
		const config = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token }),
		};

		fetch(URL, config)
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					props.getTweets();
				}
			});
	};

	return (
		<div className={styles.container}>
			<div className={styles['newtweet-container']}>
				<h2>Home</h2>
				<textarea
					maxLength={280}
					placeholder="What's up?"
					onChange={(e) => setNewTextDesc(e.target.value)}
					value={newTweetDesc}
				/>
				<div className={styles['newtweet-details']}>
					<span>{newTweetDesc.length}/280</span>
					<button type="submit" className={styles.btn} onClick={createTweet}>
						Tweet
					</button>
				</div>
			</div>

			<div className={styles['alltweets-container']}>
				{tweets?.map((tweet, i) => (
					<div key={i} className={styles['tweet-container']}>
						<div className={styles['user-container']}>
							<div className={styles.person}></div>
							<span className={styles.firstname}>{tweet.firstname}</span>
							<div className={styles.username}>
								<span>@{tweet.username}</span>
								<span className={styles.date}>
									{getTimeToDeparture(tweet.date)}
								</span>
							</div>
						</div>
						<p>
							{tweet.description.split(' ').map((t, i) =>
								t.match(/#\S+/) ? (
									<span key={i} className={styles.hashtag}>
										{t}
									</span>
								) : (
									` ${t} `
								)
							)}
						</p>
						<div className={styles['actions-container']}>
							<FontAwesomeIcon
								icon={faHeart}
								className={styles.icon}
								style={tweet.isLikedBy.includes(token) ? { color: 'red' } : {}}
								onClick={() => updateTweet(tweet.id)}
							/>
							<span
								style={tweet.isLikedBy.includes(token) ? { color: 'red' } : {}}>
								{tweet.isLikedBy.length}
							</span>
							{tweet.username === username && (
								<FontAwesomeIcon
									icon={faTrashCan}
									className={styles.icon}
									onClick={() => deleteTweet(tweet.id)}
								/>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default LastTweets;

import { useState } from 'react';
import styles from '../styles/LastTweets.module.css';
import { getTimeToDeparture } from '../utils/time';
import { useDispatch, useSelector } from 'react-redux';
import { faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LastTweets = (props) => {
	const dispatch = useDispatch();
	const { username, token } = useSelector((state) => state.user.value);
	const tweets = useSelector((state) => state.tweets.tweets);
	const [newTweetDesc, setNewTextDesc] = useState('');

	const handleTweet = () => {
		const pattern = /#\S+/g;
		const hashtag = newTweetDesc.match(pattern);
		const URL = 'http://localhost:3000/tweets/new';
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
					<button type="submit" className={styles.btn} onClick={handleTweet}>
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
							<FontAwesomeIcon icon={faHeart} />
							<span>{tweet.isLikedCount}</span>
							{tweet.username === username && (
								<FontAwesomeIcon icon={faTrashCan} />
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default LastTweets;

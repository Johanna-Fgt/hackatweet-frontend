import styles from '../styles/LastTweets.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllTweets } from '../reducers/tweets';
import { setLikedTweets } from '../reducers/user';
import { getTimeToDeparture } from '../utils/time';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const HashTweets = (props) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const hashtagUrl = router.query.hashtag;
	const { username, token, likedTweets } = useSelector(
		(state) => state.user.value
	);
	const tweets = useSelector((state) => state.tweets.tweets);
	const [searchValue, setSearchValue] = useState('');

	const getTweets = () => {
		const URL = 'https://hackatweet-backend-mu.vercel.app/tweets';
		// const URL = 'http://localhost:3000/tweets';
		fetch(URL)
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					const tweets = data.tweets.map((tweet) => ({
						id: tweet._id,
						description: tweet.description,
						date: tweet.date,
						username: tweet.author.username,
						firstname: tweet.author.firstname,
						hashtag: tweet.hashtag,
						isLikedBy: tweet.isLikedBy,
					}));
					dispatch(getAllTweets(tweets));
				}
			});
	};

	const updateTweet = (id) => {
		const URL = `https://hackatweet-backend-mu.vercel.app/tweets/update/${id}`;
		// const URL = `http://localhost:3000/tweets/update/${id}`;
		const config = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token }),
		};

		fetch(URL, config)
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					getTweets();
				}
			});
	};

	const deleteTweet = (id) => {
		const URL = `https://hackatweet-backend-mu.vercel.app/tweets/delete/${id}`;
		// const URL = `http://localhost:3000/tweets/delete/${id}`;
		const config = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token }),
		};

		fetch(URL, config)
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					getTweets();
				}
			});
	};

	useEffect(() => {
		setSearchValue(`${hashtagUrl}`);
	}, [hashtagUrl]);

	return (
		<div className={styles.container}>
			<div className={styles['newtweet-container']}>
				<h2>Hashtag</h2>
				<span>
					<input
						onChange={(e) => setSearchValue(e.target.value)}
						value={searchValue}
					/>
				</span>
			</div>

			<div className={styles['alltweets-container']}>
				{tweets
					?.filter((t) => t.description.includes(searchValue))
					.map((tweet, i) => (
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
									style={
										tweet.isLikedBy?.includes(token) ? { color: 'red' } : {}
									}
									onClick={() => updateTweet(tweet.id)}
								/>
								<span
									style={
										tweet.isLikedBy?.includes(token) ? { color: 'red' } : {}
									}>
									{tweet.isLikedBy?.length}
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

export default HashTweets;

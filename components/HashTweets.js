import { useEffect, useState } from 'react';
import styles from '../styles/LastTweets.module.css';
import { getTimeToDeparture } from '../utils/time';
import { useDispatch, useSelector } from 'react-redux';
import { faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setLikedTweets } from '../reducers/user';
import { useRouter } from 'next/router';

const HashTweets = (props) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const hashtagUrl = router.query.hashtag;
	const { username, token, likedTweets } = useSelector(
		(state) => state.user.value
	);
	const tweets = useSelector((state) => state.tweets.tweets);
	const [searchValue, setSearchValue] = useState('');

	const updateTweet = (id) => {
		const URL = `http://localhost:3000/tweets/update/${id}`;
		const config = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token }),
		};

		fetch(URL, config)
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					dispatch(setLikedTweets(data.likedTweets));
					props.getTweets();
				}
			});
	};

	const deleteTweet = (id) => {
		const URL = `http://localhost:3000/tweets/delete/${id}`;
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

	const searchTweet = () => {};

	useEffect(() => {
		setSearchValue(`${hashtagUrl}`);
	}, [hashtagUrl]);

	return (
		<div className={styles.container}>
			<div className={styles['newtweet-container']}>
				<h2>Hashtag</h2>
				<input
					onChange={(e) => {
						setSearchValue(e.target.value);
						searchTweet();
					}}
					value={searchValue}
				/>
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
									style={
										likedTweets?.includes(tweet.id) ? { color: 'red' } : {}
									}
									onClick={() => {
										updateTweet(tweet.id);
									}}
								/>
								<span>{tweet.isLikedCount}</span>
								{tweet.username === username && (
									<FontAwesomeIcon
										icon={faTrashCan}
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

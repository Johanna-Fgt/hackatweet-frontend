import styles from '../styles/Home.module.css';
import Tweet from './Tweet';
import Trends from './Trends';
import LastTweets from './LastTweets';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllTweets } from '../reducers/tweets';

function Home() {
	const dispatch = useDispatch();

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

	useEffect(() => {
		getTweets();
	}, []);

	return (
		<main className={styles.main}>
			<Tweet />
			<LastTweets getTweets={getTweets} />
			<Trends />
		</main>
	);
}

export default Home;

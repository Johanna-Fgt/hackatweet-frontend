import { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import LastTweets from './LastTweets';
import Trends from './Trends';
import Tweet from './Tweet';
import { useDispatch } from 'react-redux';
import { getAllTweets } from '../reducers/tweets';

function Home() {
	const dispatch = useDispatch();

	const getTweets = () => {
		const URL = 'http://localhost:3000/tweets';

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
						isLikedCount: tweet.isLikedCount,
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

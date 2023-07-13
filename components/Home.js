import styles from '../styles/Home.module.css';
import LastTweets from './LastTweets';
import Trends from './Trends';
import Tweet from './Tweet';

function Home() {
	return (
		<main className={styles.main}>
			<Tweet />
			<LastTweets />
			<Trends />
		</main>
	);
}

export default Home;

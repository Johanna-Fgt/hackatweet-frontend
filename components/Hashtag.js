import styles from '../styles/Home.module.css';
import HashTweets from './HashTweets';
import Trends from './Trends';
import Tweet from './Tweet';

const Hashtag = () => {
	return (
		<div className={styles.main}>
			<Tweet />
			<HashTweets />
			<Trends />
		</div>
	);
};

export default Hashtag;

import { useSelector } from 'react-redux';
import styles from '../styles/Trends.module.css';
import Link from 'next/link';

const Trends = () => {
	const { tweets, hashtags } = useSelector((state) => state.tweets);
	return (
		<div className={styles.container}>
			<h2>Trends</h2>
			<ul>
				{hashtags?.map((h, i) => (
					<li key={i}>
						{/* <Link href={`/${h}`}> */}
						<span className={styles.hashtag}>{h}</span>
						<span className={styles.number}>
							{tweets.filter((t) => t.hashtag?.includes(h)).length}{' '}
							{tweets.filter((t) => t.hashtag?.includes(h)).length > 1
								? 'Tweets'
								: 'Tweet'}
						</span>
						{/* </Link> */}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Trends;

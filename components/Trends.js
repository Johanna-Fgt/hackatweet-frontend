import styles from '../styles/Trends.module.css';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const Trends = () => {
	const router = useRouter();
	const { tweets, hashtags } = useSelector((state) => state.tweets);
	return (
		<div className={styles.container}>
			<h2>Trends</h2>
			<ul>
				{hashtags?.map((h, i) => (
					<li
						key={i}
						onClick={() =>
							router.push({
								pathname: `/hashtag/[hashtag]`,
								query: { hashtag: h.match(/[^\s#]+/g) },
							})
						}>
						<span className={styles.hashtag}>{h}</span>
						<span className={styles.number}>
							{tweets.filter((t) => t.hashtag?.includes(h)).length}{' '}
							{tweets.filter((t) => t.hashtag?.includes(h)).length > 1
								? 'Tweets'
								: 'Tweet'}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Trends;

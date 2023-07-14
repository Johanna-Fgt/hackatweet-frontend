import { useSelector } from 'react-redux';
import styles from '../styles/Trends.module.css';
import Link from 'next/link';

const Trends = () => {
	const { tweets, hashtags } = useSelector((state) => state.tweets);
	return (
		<div className={styles.container}>
			<h2>Trends</h2>
			{hashtags?.map((h, i) => (
				<ul key={i}>
					<li>
						{/* <Link href={`/${h}`}> */}
						<span>{h}</span>
						<span>
							{tweets.filter((t) => t.hashtag?.includes(h)).length} Tweets
						</span>
						{/* </Link> */}
					</li>
				</ul>
			))}
		</div>
	);
};

export default Trends;

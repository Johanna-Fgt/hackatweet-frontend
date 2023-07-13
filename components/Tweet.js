import styles from '../styles/Tweet.module.css';
import Link from 'next/link';
import { logout } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';

const Tweet = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);

	return (
		<div className={styles.container}>
			<Link href="/">
				<span className={styles.picture}></span>
			</Link>

			<div className={styles.connect}>
				<div className={styles.user}>
					<div className={styles.person}></div>
					<div>
						<span className={styles.firstname}>{user.firstname}</span>
						<span className={styles.username}>@{user.username}</span>
					</div>
				</div>
				<button
					className={styles.btn}
					type="button"
					onClick={() => dispatch(logout())}>
					Logout
				</button>
			</div>
		</div>
	);
};

export default Tweet;

import styles from '../styles/Sign.module.css';
import { Modal } from 'antd';
import { useState } from 'react';
import { login } from '../reducers/user';
import { useDispatch } from 'react-redux';

const SignIn = () => {
	const dispatch = useDispatch();
	const [signInUsername, setSignInUsername] = useState('');
	const [signInPassword, setSignInPassword] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleConnection = () => {
		const URL = 'https://hackatweet-backend-mu.vercel.app/users/signin';
		// const URL = 'http://localhost:3000/users/signin';
		const config = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: signInUsername,
				password: signInPassword,
			}),
		};

		fetch(URL, config)
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					dispatch(
						login({
							firstname: data.firstname,
							username: data.username,
							token: data.token,
						})
					);
					setSignInUsername('');
					setSignInPassword('');
					setIsModalVisible(false);
				}
			});
	};

	let modalContent = (
		<div className={styles.registerContainer}>
			<button type="button" onClick={() => setIsModalVisible(!isModalVisible)}>
				X
			</button>
			<div className={styles.registerSection}>
				<h2>Connect to Hackatweet</h2>

				<input
					type="text"
					placeholder="Username"
					onChange={(e) => setSignInUsername(e.target.value)}
					value={signInUsername}
				/>
				<input
					type="password"
					placeholder="Password"
					onChange={(e) => setSignInPassword(e.target.value)}
					value={signInPassword}
				/>
				<button className={styles.btn} onClick={handleConnection}>
					Sign in
				</button>
			</div>
		</div>
	);

	return (
		<div className={styles.signin}>
			<button
				className={styles.btn}
				type="button"
				onClick={() => setIsModalVisible(!isModalVisible)}>
				Sign in
			</button>
			{isModalVisible && (
				<Modal
					getContainer="#react-modals"
					className={styles.modal}
					open={isModalVisible}
					closable={false}
					footer={null}>
					{modalContent}
				</Modal>
			)}
		</div>
	);
};

export default SignIn;

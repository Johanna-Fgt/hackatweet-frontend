import styles from '../styles/Sign.module.css';
import { Modal } from 'antd';
import { useState } from 'react';
import { login } from '../reducers/user';
import { useDispatch } from 'react-redux';

const SignUp = () => {
	const dispatch = useDispatch();
	const [signUpFirstname, setSignUpFirstname] = useState('');
	const [signUpUsername, setSignUpUsername] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleRegister = () => {
		const URL = 'http://localhost:3000/users/signup';
		const config = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				firstname: signUpFirstname,
				username: signUpUsername,
				password: signUpPassword,
			}),
		};
		fetch(URL, config)
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					dispatch(
						login({
							firstname: signUpFirstname,
							username: signUpUsername,
							token: data.token,
						})
					);
					setSignUpFirstname('');
					setSignUpUsername('');
					setSignUpPassword('');
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
				<p>Create your Hackatweet account</p>
				<input
					type="text"
					placeholder="Firstname"
					onChange={(e) => setSignUpFirstname(e.target.value)}
					value={signUpFirstname}
				/>
				<input
					type="text"
					placeholder="Username"
					onChange={(e) => setSignUpUsername(e.target.value)}
					value={signUpUsername}
				/>
				<input
					type="password"
					placeholder="Password"
					onChange={(e) => setSignUpPassword(e.target.value)}
					value={signUpPassword}
				/>
				<button onClick={handleRegister}>Sign up</button>
			</div>
		</div>
	);

	return (
		<div className={styles.signup}>
			<button
				className={styles.btn}
				type="button"
				onClick={() => setIsModalVisible(!isModalVisible)}>
				Sign up
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

export default SignUp;

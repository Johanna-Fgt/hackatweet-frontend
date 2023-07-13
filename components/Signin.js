import styles from '../styles/Login.module.css';
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
		fetch('http://localhost:3000/users/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: signInUsername,
				password: signInPassword,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					dispatch(login({ username: signInUsername, token: data.token }));
					setSignInUsername('');
					setSignInPassword('');
					setIsModalVisible(false);
				}
			});
	};
	return <></>;
};

export default SignIn;

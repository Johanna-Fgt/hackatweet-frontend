import styles from '../styles/Login.module.css';
import SignUp from './SignUp';
import SignIn from './Signin';

function Login() {
	return (
		<div className={styles.login}>
			<div className={styles.picture}></div>

			<div className={styles[`logo-container`]}>
				<span></span>
				<h1 className={styles.title}>See what's happening</h1>
				<p className={styles.lead}>Join Hackatweet today.</p>
				<SignUp />
				<p className={styles.question}>Already have an account?</p>
				<SignIn />
			</div>
		</div>
	);
}

export default Login;

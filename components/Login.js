import styles from '../styles/Login.module.css';
import SignUp from './SignUp';
import SignIn from './Signin';

function Login() {
	return (
		<div className={styles.login}>
			<div className={styles.picture}>
				<span>ICONE</span>
			</div>

			<div className={styles.logoContainer}>
				<span>ICONE</span>
				<h1 className={styles.title}>See what's happening</h1>
				<p className={styles.lead}>Join Hackatweet today.</p>
				<SignUp />
				<span>Already have an account?</span>
				<SignIn />
			</div>
		</div>
	);
}

export default Login;

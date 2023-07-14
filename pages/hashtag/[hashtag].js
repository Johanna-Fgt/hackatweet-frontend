import Login from '../components/Login';
import Has from '../components/Has';
import { useSelector } from 'react-redux';

function Index() {
	const user = useSelector((state) => state.user.value);

	return <>{!user.token ? <Login /> : <></>}</>;
}

export default Index;

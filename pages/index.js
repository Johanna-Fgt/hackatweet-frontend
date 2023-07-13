import Login from '../components/Login';
import Home from '../components/Home';
import { useSelector } from 'react-redux';

function Index() {
	const user = useSelector((state) => state.user.value);

	return <>{!user.token ? <Login /> : <Home />}</>;
}

export default Index;

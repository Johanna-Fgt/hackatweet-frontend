import Hashtag from '../../components/Hashtag';
import Login from '../../components/Login';
import { useSelector } from 'react-redux';

function Index() {
	const user = useSelector((state) => state.user.value);

	return <>{user.token ? <Hashtag /> : <Login />}</>;
}

export default Index;

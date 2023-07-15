import Login from '../components/Login';
import Home from '../components/Home';
import Head from 'next/head';
import { useSelector } from 'react-redux';

function Index() {
	const user = useSelector((state) => state.user.value);

	return (
		<>
			<Head>
				<title>Hackatweet</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="title" content="Hackatweet" />
				<meta
					name="description"
					content="Second hackathon des éléves de la Capsule !"
				/>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />

				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://metatags.io" />
				<meta property="og:title" content="Hackatweet" />
				<meta
					property="og:description"
					content="Second hackathon des éléves de la Capsule !"
				/>
				<meta
					property="og:image"
					content="https://metatags.io/images/meta-tags.png"
				/>

				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://metatags.io" />
				<meta property="twitter:title" content="Hackatweet" />
				<meta
					property="twitter:description"
					content="Second hackathon des éléves de la Capsule !"
				/>
				<meta
					property="twitter:image"
					content="https://metatags.io/images/meta-tags.png"
				/>
			</Head>
			{!user.token ? <Login /> : <Home />}
		</>
	);
}

export default Index;

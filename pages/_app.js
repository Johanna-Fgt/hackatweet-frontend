import '../styles/globals.css';
import Head from 'next/head';
//REDUX
import { Provider } from 'react-redux';
import user from '../reducers/user';
import tweets from '../reducers/tweets';
//Persist Store
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const reducers = combineReducers({ user, tweets });

const persistConfig = { key: 'hackatweet', storage };

const store = configureStore({
	reducer: persistReducer(persistConfig, reducers),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

function App({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<Head>
					<title>Hackatweet</title>
					<link rel="icon" href="/favicon.ico" />
					<meta name="title" content="Hackatweet" />
					<meta
						name="description"
						content="Second hackathon des éléves de la Capsule !"
					/>
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>

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
				<Component {...pageProps} />
			</PersistGate>
		</Provider>
	);
}

export default App;

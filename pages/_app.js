import '../styles/globals.css';
import Script from 'next/script';

function MyApp({Component, pageProps}) {
	<Script
		id="Adsense-id"
		data-ad-client="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9361134933535166"
		async
		strategy="afterInteractive"
		onError={(e) => {
			console.error('Script failed to load', e);
		}}
		src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
	/>;
	return <Component {...pageProps} />;
}

export default MyApp;

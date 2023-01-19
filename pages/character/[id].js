import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';
import Script from 'next/script';

const defaultEndpoint = 'https://rickandmortyapi.com/api/character';

export async function getServerSideProps({query}) {
	const {id} = query;
	const res = await fetch(`${defaultEndpoint}/${id}`);
	const data = await res.json();
	return {
		props: {
			data,
		},
	};
}

export default function Character({data}) {
	const {name, image, gender, location, origin, species, status} = data;
	return (
		<div className={styles.container}>
			<Head>
				<title>{name}</title>
				<meta name="description" content="Rick and Morty Wiki" />
			</Head>
			<Script
				id="Adsense-id"
				data-ad-client="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9361134933535166"
				async
				strategy="afterInteractive"
				onError={(e) => {
					console.error('Script failed to load', e);
				}}
				src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
			/>
			;
			<main className={styles.main}>
				<h1 className={styles.title}>{name}</h1>
				<div className="profile">
					<div className="profile-image">
						<img src={image} alt={name} />
					</div>
					<div className="profile-details">
						<h2>Character Details</h2>
						<ul>
							<li>
								<strong>Name:</strong> {name}
							</li>
							<li>
								<strong>Status:</strong> {status}
							</li>
							<li>
								<strong>Gender:</strong> {gender}
							</li>
							<li>
								<strong>Species:</strong> {species}
							</li>
							<li>
								<strong>Location:</strong> {location?.name}
							</li>
							<li>
								<strong>Originally From:</strong> {origin?.name}
							</li>
						</ul>
					</div>
				</div>
				<p className="back">
					<Link href="/">
						<a>Back to All Characters</a>
					</Link>
				</p>
			</main>
		</div>
	);
}

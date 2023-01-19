import Head from 'next/head';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Script from 'next/script';

const defaultEndpoint = 'https://rickandmortyapi.com/api/character';

export async function getServerSideProps() {
	const res = await fetch(defaultEndpoint);
	const data = await res.json();
	return {
		props: {
			data,
		},
	};
}

export default function Home({data}) {
	const {info, results: defaultResults = []} = data;
	const [results, updateResults] = useState(defaultResults);
	const [page, updatePage] = useState({
		...info,
		current: defaultEndpoint,
	});

	const {current} = page;

	useEffect(() => {
		if (current === defaultEndpoint) return;

		async function request() {
			const res = await fetch(current);
			const nextData = await res.json();

			updatePage({
				current,
				...nextData.info,
			});

			if (!nextData.info?.prev) {
				updateResults(nextData.results);
				return;
			}

			updateResults((prev) => {
				return [...prev, ...nextData.results];
			});
		}

		request();
	}, [current]);

	function handleLoadMore() {
		updatePage((prev) => {
			return {
				...prev,
				current: page?.next,
			};
		});
	}

	function handleOnSubmitSearch(e) {
		e.preventDefault();

		const {currentTarget = {}} = e;
		const fields = Array.from(currentTarget?.elements);
		const fieldQuery = fields.find((field) => field.name === 'query');

		const value = fieldQuery.value || '';
		const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`;

		updatePage({
			current: endpoint,
		});
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Wubba Lubba Dubb Dub!</title>
				<meta name="description" content="Rick and Morty Wiki" />
				<link rel="icon" href="/favicon.ico" />
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
				<h1 className={styles.title}>Wubba Lubba Dubb dub!</h1>
				<form className="search" onSubmit={handleOnSubmitSearch}>
					<input name="query" type="search" />
					<button>Search</button>
				</form>

				<ul className={styles.grid}>
					{results.map((result) => {
						const {id, name, image} = result;
						return (
							<li key={id} className="card">
								<Link href="/character/[id]" as={`/character/${id}`}>
									<a>
										<img src={image} alt={`${name} Thumbnail`} />
										<h3>{name}</h3>
									</a>
								</Link>
							</li>
						);
					})}
				</ul>
				<p>
					<button onClick={handleLoadMore}>Load More</button>
				</p>
			</main>
			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer">
					Powered by{' '}
					<span className={styles.logo}>
						<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
					</span>
				</a>
			</footer>
		</div>
	);
}

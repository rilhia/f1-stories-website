import Image from 'next/image';
import Link from 'next/link';
import {
	storyblokEditable,
	StoryblokServerRichText,
} from '@storyblok/react/rsc';
import { formatRaceDate, formatRaceTime } from '@/lib/format';
import ResultsTable from './ResultsTable';

const Race = ({ blok }) => (
	<article {...storyblokEditable(blok)}>
		<div className="container race-page">
			{blok.image?.filename ? (
				<Image
					src={blok.image.filename}
					alt={blok.image.alt || ''}
					width={1600}
					height={900}
					priority
					sizes="(min-width: 920px) 880px, 100vw"
					className="race-image"
				/>
			) : null}

			<header className="race-header">
				<Link href="/#races" className="back-link">
					All races
				</Link>
				<h1 className="race-title">{blok.name}</h1>
				<p className="race-meta">
					<span>{formatRaceDate(blok.date_time)}</span>
					<span className="race-time">
						{formatRaceTime(blok.date_time)}
					</span>
				</p>
			</header>

			{blok.body ? (
				<div className="richtext">
					<StoryblokServerRichText document={blok.body} />
				</div>
			) : null}
			<ResultsTable results={blok.results_table} />
		</div>
	</article>
);

export default Race;

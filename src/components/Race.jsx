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
		<section className="race-hero">
			{blok.image?.filename ? (
				<Image
					src={blok.image.filename}
					alt={blok.image.alt || ''}
					fill
					priority
					sizes="100vw"
					className="race-hero__image"
				/>
			) : null}
			<div className="race-hero__shade" />
			<div className="container race-hero__content">
				<Link href="/#races" className="back-link">
					All races
				</Link>
				<h1 className="race-hero__title">{blok.name}</h1>
				<p className="race-hero__meta">
					<span>{formatRaceDate(blok.date_time)}</span>
					<span className="race-hero__time">
						{formatRaceTime(blok.date_time)}
					</span>
				</p>
			</div>
		</section>

		<div className="container race-content">
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

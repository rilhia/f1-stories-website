import { storyblokEditable } from '@storyblok/react/rsc';
import { getRacesSoFar } from '@/lib/races';
import RaceCard from './RaceCard';

/**
 * Lists every race that has already taken place, newest first.
 * The races come straight from Storyblok, so the grid never needs hand-editing.
 */
const RaceGrid = async ({ blok }) => {
	const races = await getRacesSoFar();
	return (
		<section className="race-grid" id="races" {...storyblokEditable(blok)}>
			<div className="container">
				<h2 className="section-title">
					{blok.section_title || 'Races so far'}
				</h2>
				{races.length === 0 ? (
					<p className="empty">No races have been added yet.</p>
				) : (
					<ul className="race-grid__list">
						{races.map((race) => (
							<RaceCard key={race.uuid} story={race} />
						))}
					</ul>
				)}
			</div>
		</section>
	);
};

export default RaceGrid;

import Image from 'next/image';
import Link from 'next/link';
import { formatRaceDate, formatRaceTime } from '@/lib/format';

const RaceCard = ({ story }) => {
	const { content } = story;
	return (
		<li className="race-card">
			<Link href={`/${story.full_slug}`} className="race-card__link">
				<div className="race-card__media">
					{content.image?.filename ? (
						<Image
							src={content.image.filename}
							alt={content.image.alt || ''}
							fill
							sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
							className="race-card__image"
						/>
					) : (
						<div className="race-card__placeholder" aria-hidden="true">
							F1
						</div>
					)}
				</div>
				<div className="race-card__body">
					<h3 className="race-card__title">{content.name || story.name}</h3>
					<p className="race-card__meta">
						<span>{formatRaceDate(content.date_time)}</span>
						<span className="race-card__time">
							{formatRaceTime(content.date_time)}
						</span>
					</p>
					<span className="race-card__cta" aria-hidden="true">
						View race
					</span>
				</div>
			</Link>
		</li>
	);
};

export default RaceCard;

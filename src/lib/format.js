const TIMEZONE = process.env.SITE_TIMEZONE || 'Europe/London';

/** Storyblok datetime values look like "2026-10-11 13:00" and are stored in UTC. */
export function parseSbDate(value) {
	if (!value) return null;
	const date = new Date(
		`${value.replace(' ', 'T')}${value.length <= 16 ? ':00' : ''}Z`,
	);
	return Number.isNaN(date.getTime()) ? null : date;
}

export function formatRaceDate(value) {
	const date = parseSbDate(value);
	if (!date) return '';
	return new Intl.DateTimeFormat('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: TIMEZONE,
	}).format(date);
}

export function formatRaceTime(value) {
	const date = parseSbDate(value);
	if (!date) return '';
	return new Intl.DateTimeFormat('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		timeZone: TIMEZONE,
		timeZoneName: 'short',
	}).format(date);
}

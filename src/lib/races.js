import { getStoryblokApi, storyVersion } from '@/lib/storyblok';

/**
 * Every race that has already happened, most recent first.
 * "Season so far" is worked out from the date_time field, so new races
 * appear on the front page automatically once their date has passed.
 */
export async function getRacesSoFar() {
	const now = new Date().toISOString().slice(0, 16).replace('T', ' ');
	const { data } = await getStoryblokApi().get('cdn/stories', {
		version: storyVersion,
		starts_with: 'races/',
		content_type: 'race',
		sort_by: 'content.date_time:desc',
		per_page: 100,
		filter_query: { date_time: { 'lt-date': now } },
	});
	return data.stories;
}

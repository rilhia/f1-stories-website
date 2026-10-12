import Page from '@/components/Page';
import Hero from '@/components/Hero';
import RaceGrid from '@/components/RaceGrid';
import Race from '@/components/Race';
import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

/**
 * Which version of the content to load. Drafts are used while developing so
 * the Visual Editor shows unpublished changes. Production shows published
 * content only. Set STORYBLOK_VERSION to "draft" or "published" to override.
 */
export const storyVersion =
	process.env.STORYBLOK_VERSION ||
	(process.env.NODE_ENV === 'production' ? 'published' : 'draft');

export const getStoryblokApi = storyblokInit({
	accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
	use: [apiPlugin],
	components: {
		page: Page,
		hero: Hero,
		race_grid: RaceGrid,
		race: Race,
	},
	apiOptions: {
		/** Set the correct region for your space. Learn more: https://www.storyblok.com/docs/packages/storyblok-js#example-region-parameter */
		region: process.env.STORYBLOK_REGION || 'eu',
		/** The following code is only required when creating a Storyblok space directly via the Blueprints feature. */
		endpoint: process.env.STORYBLOK_API_BASE_URL
			? `${new URL(process.env.STORYBLOK_API_BASE_URL).origin}/v2`
			: undefined,
	},
});

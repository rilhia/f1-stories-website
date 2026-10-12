import { cache } from 'react';
import { notFound } from 'next/navigation';
import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi, storyVersion } from '@/lib/storyblok';

// Cached so the page and its metadata share a single API call.
const fetchStory = cache(async (slug) => {
	const fullSlug = slug ? slug.join('/') : 'home';
	try {
		const { data } = await getStoryblokApi().get(`cdn/stories/${fullSlug}`, {
			version: storyVersion,
		});
		return data.story;
	} catch (error) {
		if (error?.status === 404) return null;
		throw error;
	}
});

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const story = await fetchStory(slug);
	if (!story || !slug) return {};
	return { title: story.content.name || story.name };
}

export default async function Page({ params }) {
	const { slug } = await params;
	const story = await fetchStory(slug);
	if (!story) notFound();

	return <StoryblokStory story={story} />;
}

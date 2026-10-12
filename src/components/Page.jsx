import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

const Page = ({ blok }) => (
	<div {...storyblokEditable(blok)}>
		{blok.body?.map((nestedBlok) => (
			<StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
		))}
	</div>
);

export default Page;

import Image from 'next/image';
import { storyblokEditable } from '@storyblok/react/rsc';

const Hero = ({ blok }) => (
	<section className="hero" {...storyblokEditable(blok)}>
		{blok.image?.filename ? (
			<Image
				src={blok.image.filename}
				alt={blok.image.alt || ''}
				fill
				priority
				sizes="100vw"
				className="hero__image"
			/>
		) : null}
		<div className="hero__shade" />
		<div className="container hero__content">
			<span className="eyebrow">Season so far</span>
			{blok.title ? <h1 className="hero__title">{blok.title}</h1> : null}
			{blok.heading ? <p className="hero__intro">{blok.heading}</p> : null}
		</div>
	</section>
);

export default Hero;

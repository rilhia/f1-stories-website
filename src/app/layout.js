import { Barlow_Condensed, Titillium_Web } from 'next/font/google';
import './globals.css';
import StoryblokProvider from '@/components/StoryblokProvider';
import SiteHeader from '@/components/SiteHeader';

export const metadata = {
	title: { default: 'F1 Stories', template: '%s | F1 Stories' },
	description: 'Race by race coverage of the Formula 1 season so far.',
};

const display = Barlow_Condensed({
	subsets: ['latin'],
	weight: ['600', '700', '800'],
	variable: '--font-display',
});

const body = Titillium_Web({
	subsets: ['latin'],
	weight: ['400', '600', '700'],
	variable: '--font-body',
});

export default function RootLayout({ children }) {
	return (
		<StoryblokProvider>
			<html lang="en" className={`${display.variable} ${body.variable}`}>
				<body>
					<SiteHeader />
					<main>{children}</main>
					<footer className="site-footer">
						<div className="container">
							F1 Stories. An unofficial fan project.
						</div>
					</footer>
				</body>
			</html>
		</StoryblokProvider>
	);
}

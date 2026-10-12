import Link from 'next/link';

const SiteHeader = () => (
	<header className="site-header">
		<div className="container site-header__inner">
			<Link href="/" className="brand" aria-label="F1 Stories home">
				<span className="brand__mark">F1</span>
				<span className="brand__name">Stories</span>
			</Link>
			<nav aria-label="Main">
				<Link href="/#races" className="nav-link">
					Races
				</Link>
			</nav>
		</div>
	</header>
);

export default SiteHeader;

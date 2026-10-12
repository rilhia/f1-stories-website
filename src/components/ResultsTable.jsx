import { storyblokEditable } from '@storyblok/react/rsc';

const ResultsTable = ({ results }) => {
	if (!results?.length) return null;

	// Editors can add rows in any order, so always sort by the position field.
	const rows = [...results].sort(
		(a, b) => Number(a.position) - Number(b.position),
	);

	return (
		<section className="results" aria-labelledby="results-heading">
			<h2 id="results-heading" className="section-title">
				Results
			</h2>
			<div className="results__scroll">
				<table className="results__table">
					<thead>
						<tr>
							<th scope="col">Pos</th>
							<th scope="col">Driver</th>
							<th scope="col">Team</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((row) => (
							<tr key={row._uid} {...storyblokEditable(row)}>
								<td className="results__pos">{row.position}</td>
								<td className="results__driver">{row.driver}</td>
								<td>{row.team}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
};

export default ResultsTable;

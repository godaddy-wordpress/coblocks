/**
 * WordPress dependencies
 */
const { SVG, Path, G } = wp.components;

/**
 * Block user interface icons
 */
const icons = {};

icons.service43 = (
	<SVG height="32" viewBox="0 0 56 32" width="56" xmlns="http://www.w3.org/2000/svg">
		<G fill="currentColor" fillRule="evenodd">
			<Path d="m0 3h24v19.253906h-24z" />
			<Path className="service-svg-moving-path" d="m0 24h16v.8785807 1.1214193h-16z" />
			<Path className="service-svg-moving-path" d="m0 28h16v.8785807 1.1214193h-16z" />
			<Path d="m32 3h24v19.253906h-24z" />
			<Path className="service-svg-moving-path" d="m32 24h16v.8785807 1.1214193h-16z" />
			<Path className="service-svg-moving-path" d="m32 28h16v.8785807 1.1214193h-16z" />
		</G>
	</SVG>
);

icons.service169 = (
	<SVG height="32" viewBox="0 0 56 32" width="56" xmlns="http://www.w3.org/2000/svg">
		<G fill="currentColor" fillRule="evenodd">
			<Path d="m0 5h24v14h-24z" />
			<Path d="m32 5h24v14h-24z" />
			<Path className="service-svg-moving-path" d="m0 21h16v.8785807 1.1214193h-16z" />
			<Path className="service-svg-moving-path" d="m32 21h16v.8785807 1.1214193h-16z" />
			<Path className="service-svg-moving-path" d="m0 25h16v.8785807 1.1214193h-16z" />
			<Path className="service-svg-moving-path" d="m32 25h16v.8785807 1.1214193h-16z" />
		</G>
	</SVG>
);

icons.serviceSquare = (
	<SVG height="32" viewBox="0 0 56 32" width="56" xmlns="http://www.w3.org/2000/svg">
		<G fill="currentColor" fillRule="evenodd">
			<Path d="m0 0h24v24h-24z" />
			<Path d="m32 0h24v24h-24z" />
			<Path className="service-svg-moving-path" d="m0 26h16v.8785807 1.1214193h-16z" />
			<Path className="service-svg-moving-path" d="m32 26h16v.8785807 1.1214193h-16z" />
			<Path className="service-svg-moving-path" d="m0 30h16v.8785807 1.1214193h-16z" />
			<Path className="service-svg-moving-path" d="m32 30h16v.8785807 1.1214193h-16z" />
		</G>
	</SVG>
);

icons.serviceCircle = (
	<SVG height="32" viewBox="0 0 56 32" width="56" xmlns="http://www.w3.org/2000/svg">
		<G fill="currentColor" fillRule="evenodd">
			<circle cx="12" cy="12" r="12" />
			<Path className="service-svg-moving-path" d="m0 26h16v.8785807 1.1214193h-16z" />
			<Path className="service-svg-moving-path" d="m32 26h16v.8785807 1.1214193h-16z" />
			<Path className="service-svg-moving-path" d="m0 30h16v.8785807 1.1214193h-16z" />
			<Path className="service-svg-moving-path" d="m32 30h16v.8785807 1.1214193h-16z" />
			<circle cx="44" cy="12" r="12" />
		</G>
	</SVG>
);

export default icons;

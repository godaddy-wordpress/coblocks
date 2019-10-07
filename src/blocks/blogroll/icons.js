/**
 * WordPress dependencies
 */
const { SVG, Path, G } = wp.components;

/**
 * Block user interface icons
 */
const icons = {};

icons.listPositionLeft  = <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><Path d="m11 15v-10h-10v10zm2-6h6v-2h-6zm0 4h6v-2h-6z" /></SVG>;
icons.listPositionRight = <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><Path d="m19 15v-10h-10v10zm-18-6h6v-2h-6zm0 4h6v-2h-6z" /></SVG>;

icons.layoutGridIcon = (
	<SVG
		height="26"
		viewBox="0 0 56 26"
		width="56"
		xmlns="http://www.w3.org/2000/svg"
	>
		<G fill="currentColor" fillRule="evenodd">
			<Path d="m5 6h13v.87858073 1.12141927h-13z" />
			<Path d="m8 18h6v.8785807 1.1214193h-6z" />
			<Path d="m0 10h23v.8785807 1.1214193h-23z" />
			<Path d="m3 14h17v.8785807 1.1214193h-17z" />
			<Path d="m38 6h13v.87858073 1.12141927h-13z" />
			<Path d="m41 18h6v.8785807 1.1214193h-6z" />
			<Path d="m33 10h23v.8785807 1.1214193h-23z" />
			<Path d="m36 14h17v.8785807 1.1214193h-17z" />
		</G>
	</SVG>
);

icons.layoutListIcon = (
	<SVG
		height="26"
		viewBox="0 0 56 26"
		width="56"
		xmlns="http://www.w3.org/2000/svg"
	>
		<G fill="currentColor" fillRule="evenodd">
			<Path d="m14 0h18v.87858073 1.12141927h-18z" />
			<Path d="m14 4h28v.87858073 1.12141927h-28z" />
			<Path d="m14 8h20v.87858073 1.12141927h-20z" />
			<Path d="m14 16h18v.8785807 1.1214193h-18z" />
			<Path d="m14 20h28v.8785807 1.1214193h-28z" />
			<Path d="m14 24h20v.8785807 1.1214193h-20z" />
		</G>
	</SVG>
);

icons.layoutCarouselIcon = (
	<SVG
		height="26"
		viewBox="0 0 56 26"
		width="56"
		xmlns="http://www.w3.org/2000/svg"
	>
		<G fill="currentColor" fillRule="evenodd">
			<Path d="m14 0h18v.87858073 1.12141927h-18z" />
			<Path d="m14 4h28v.87858073 1.12141927h-28z" />
			<Path d="m14 8h20v.87858073 1.12141927h-20z" />
			<Path d="m14 16h18v.8785807 1.1214193h-18z" />
			<Path d="m14 20h28v.8785807 1.1214193h-28z" />
			<Path d="m14 24h20v.8785807 1.1214193h-20z" />
		</G>
	</SVG>
);

export default icons;

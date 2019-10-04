/**
 * WordPress dependencies
 */
const { SVG, Path, G } = wp.components;

/**
 * Block user interface icons
 */
const icons = {};

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

icons.layoutGridIconWithImages = (
	<SVG
		height="26"
		viewBox="0 0 56 26"
		width="56"
		xmlns="http://www.w3.org/2000/svg"
	>
		<G fillRule="evenodd">
			<Path d="m0 0h24v14h-24z" />
			<Path d="m3 16h18v.8785807 1.1214193h-18z" />
			<Path d="m1 20h22v.8785807 1.1214193h-22z" />
			<Path d="m4 24h16v.8785807 1.1214193h-16z" />
			<Path d="m32 0h24v14h-24z" />
			<Path d="m35 16h18v.8785807 1.1214193h-18z" />
			<Path d="m33 20h22v.8785807 1.1214193h-22z" />
			<Path d="m36 24h16v.8785807 1.1214193h-16z" />
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

icons.layoutListIconWithImages = (
	<SVG
		height="26"
		viewBox="0 0 56 26"
		width="56"
		xmlns="http://www.w3.org/2000/svg"
	>
		<G fill="currentColor" fillRule="evenodd">
			<Path d="m10 0h10v10h-10z" />
			<Path d="m22 0h14v.87858073 1.12141927h-14z" />
			<Path d="m22 4h22v.87858073 1.12141927h-22z" />
			<Path d="m22 8h16v.87858073 1.12141927h-16z" />
			<Path d="m10 16h10v10h-10z" />
			<Path d="m22 16h14v.8785807 1.1214193h-14z" />
			<Path d="m22 20h22v.8785807 1.1214193h-22z" />
			<Path d="m22 24h16v.8785807 1.1214193h-16z" />
		</G>
	</SVG>
);

export default icons;

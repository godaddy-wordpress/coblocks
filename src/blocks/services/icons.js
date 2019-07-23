/**
 * WordPress dependencies
 */
const { SVG, Path, G } = wp.components;

/**
 * Block user interface icons
 */
const icons = {};

icons.services = (
	<SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<G fill="currentColor" fill-rule="nonzero">
			<Path d="m3 3h18v10h-18z"/>
			<Path d="m3 15h14v2h-14z"/>
			<Path d="m3 19h14v2h-14z" />
		</G>
	</SVG>
);

export default icons;

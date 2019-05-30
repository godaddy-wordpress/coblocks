/**
 * WordPress dependencies
 */
const { SVG, Path, G } = wp.components;

/**
 * Block user interface icons
 */
const icons = {};

icons.carousel =
	<SVG className="components-coblocks-svg" role="img" focusable="false" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
		<G transform="translate(3 3)"><Path d="m11 0h-4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm0 16h-4v-14h4z" /><Path d="m18 0h-1c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h1s0-.9 0-2v-14c0-1.1 0-2 0-2zm0 16h-1v-14h1z" /><Path d="m3 0h-1c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h1s0-.9 0-2v-14c0-1.1 0-2 0-2zm0 16h-1v-14h1z" transform="matrix(-1 0 0 1 3 0)" /></G>
	</SVG>;

export default icons;

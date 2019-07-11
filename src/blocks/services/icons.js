/**
 * WordPress dependencies
 */
const { SVG, Path, G } = wp.components;

/**
 * Block user interface icons
 */
const icons = {};

icons.services = (
	<SVG
		className="components-coblocks-svg"
		viewBox="0 0 24 24"
		height="24"
		width="24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<Path
			d="m12 4v-2h-4v2zm-10 2v11h16v-11zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2h-16c-1.11 0-2-.89-2-2l.01-11c0-1.11.88-2 1.99-2h4v-2c0-1.11.89-2 2-2h4c1.11 0 2 .89 2 2v2z"
			fill="currentColor"
			transform="translate(2 2)"
		/>
	</SVG>
);

export default icons;

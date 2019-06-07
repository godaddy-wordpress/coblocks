/**
 * WordPress dependencies
 */
const { SVG, Path, G } = wp.components;

const icons = {};

icons.stacked =
	<SVG className="components-coblocks-svg" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
		<G fill="currentColor" fillFule="nonzero"><Path d="m19 3c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2h-14c-1.1 0-2-.9-2-2v-9c0-1.1.9-2 2-2zm0 11v-9h-14v9zm-4.3730469-6 3.3730469 5h-12l3.07006836-3.81713867 2.21564594 2.57547197z" /><Path d="m19 18h-14c-1.1 0-2 .9-2 2v1h18v-1c0-1.1-.9-2-2-2zm0 3h-14v-1h14z" /></G>
	</SVG>;

export default icons;

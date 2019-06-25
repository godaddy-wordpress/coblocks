/**
 * WordPress dependencies
 */
const { SVG, Path, G } = wp.components;

const icons = {};

icons.carousel =
	<SVG className="components-coblocks-svg" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
		<G fill="currentColor" fillRule="evenodd"><G fillRule="nonzero"><Path d="m18 4h-12c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2zm0 14h-12v-12h12z" /><Path d="m21 6v12c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm0 10v-8z" /><Path d="m1 6v12c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm0 10v-8z" transform="matrix(-1 0 0 -1 4 24)" /></G><Path d="m13.7857143 11-2.5 4.51-1.7857143-3.01-2.5 4.5h10z" /></G>
	</SVG>;

export default icons;

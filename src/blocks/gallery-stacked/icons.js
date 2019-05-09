/**
 * WordPress dependencies
 */
const { SVG, Path, G } = wp.components;

/**
 * Block user interface icons
 */
const icons = {};

icons.stacked =
<SVG className="components-coblocks-svg" role="img" focusable="false" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
	<G transform="translate(3 3)"><Path d="m16 0h-14c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2zm0 8h-14v-6h14z"/><Path d="m16 12h-14c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2zm0 4h-14v-2h14z"/></G>
</SVG>

export default icons;

/**
 * WordPress dependencies
 */
const { SVG, Path, G } = wp.components;

/**
 * Block user interface icons
 */
const icons = {};

icons.hero =
<SVG className="dashicon components-coblocks-svg" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><Path d="m16 0h-14c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm0 16h-14v-3h14z" transform="translate(3 3)"/></SVG>

icons.grid =
<SVG height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><G transform="matrix(-1 0 0 1 18 2)"><Path d="m12 7h3.9566119v-6h-3.9566119z"/><Path d="m6 7h4v-6h-4z"/><Path d="m0 7h3.95661186v-6h-3.95661186z"/><Path d="m.02169407 15h3.95661186v-6h-3.95661186z"/><Path d="m6.02169407 15h4.00000003v-6h-4.00000003z"/><Path d="m12.0216941 15h3.9566118v-6h-3.9566118z"/></G></SVG>

export default icons;



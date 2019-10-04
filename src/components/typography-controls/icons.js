/**
 * WordPress dependencies
 */
const { SVG, Path, G } = wp.components;

const icons = {};

icons.typography =
	<SVG height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
		<G fill="currentColor" fillRule="nonzero">
			<Path d="m3 16v2h14v-2z" />
			<Path d="m9.11555556 2-4.88888889 12.4444444h2l.99555555-2.6666666h5.55555558l.9955555 2.6666666h2l-4.88-12.4444444zm-1.22666667 8 2.11555551-5.62666667 2.1155556 5.62666667z" />
		</G>
	</SVG>;

export default icons;

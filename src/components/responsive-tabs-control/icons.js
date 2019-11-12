/**
 * WordPress dependencies
 */
import { SVG, Path } from '@wordpress/components';

/**
 * Custom icons
 */
const icons = {};

icons.mobile =
	<SVG aria-hidden className="dashicon" role="img" focusable="false" height="15" viewBox="0 0 15 15" width="15" xmlns="http://www.w3.org/2000/svg">
		<Path d="m8.25 0h-6c-.825 0-1.5.61363636-1.5 1.36363636v10.27272724c0 .75.675 1.3636364 1.5 1.3636364h6c.825 0 1.5-.6136364 1.5-1.3636364v-10.27272724c0-.75-.675-1.36363636-1.5-1.36363636zm-.5 11h-5v-9h5z" transform="translate(2.25 1)" />
	</SVG>;

icons.desktopChrome =
	<SVG aria-hidden className="dashicon dashicon--desktop-chrome" role="img" focusable="false" height="15" viewBox="0 0 15 15" width="15" xmlns="http://www.w3.org/2000/svg">
		<Path d="m13.5 0h-12c-.8325 0-1.5.61363636-1.5 1.36363636v12.27272724c0 .75.6675 1.3636364 1.5 1.3636364h12l-.5-2h-11v-10h11v10l.5 2c.825 0 1.5-.6136364 1.5-1.3636364v-12.27272724c0-.75-.6675-1.36363636-1.5-1.36363636z" />
	</SVG>;

export default icons;

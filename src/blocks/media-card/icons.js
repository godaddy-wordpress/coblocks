/**
 * WordPress dependencies
 */
import { Path, SVG, G } from '@wordpress/components';

const icons = {};

icons.mediaCardLeft =
	<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false"><path d="M4 18h6V6H4v12zm9-10v1.5h7V8h-7zm0 7.5h7V14h-7v1.5z"></path></svg>;

icons.mediaCardRight =
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false"><path d="M14 6v12h6V6h-6zM4 9.5h7V8H4v1.5zm0 6h7V14H4v1.5z"></path></svg>;

icons.mediaContainer =
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><Path d="M18 2l2 4h-2l-2-4h-3l2 4h-2l-2-4h-1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2zm2 12H10V4.4L11.8 8H20z" /><Path d="M14 20H4V10h3V8H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3h-2z" /><Path d="M5 19h8l-1.59-2H9.24l-.84 1.1L7 16.3 5 19z" /></SVG>;

export default icons;

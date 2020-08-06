/**
 * WordPress dependencies
 */
import { Path, SVG, G } from '@wordpress/components';

const icons = {};

icons.mediaCardLeft =
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><Path d="M4 18h6V6H4v12zm9-10v1.5h7V8h-7zm0 7.5h7V14h-7v1.5z"></Path></SVG>;

icons.mediaCardRight =
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><Path d="M14 6v12h6V6h-6zM4 9.5h7V8H4v1.5zm0 6h7V14H4v1.5z"></Path></SVG>;

icons.mediaContainer =
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><Path d="m5 9.75h8c.6904 0 1.25.5596 1.25 1.25v8c0 .6904-.5596 1.25-1.25 1.25h-8c-.69036 0-1.25-.5596-1.25-1.25v-8c0-.6904.55964-1.25 1.25-1.25z" stroke="currentColor" stroke-width="1.5" fill="none"/><Path d="m7.67706 16.8438v-3.6876l3.07294 1.8438z" fill="currentColor" /><G stroke="currentColor" stroke-width="1.5" fill="none"><Path d="m17.0039 14.25h1.9961c.6904 0 1.25-.5596 1.25-1.25v-8c0-.69036-.5597-1.25-1.25-1.25h-7.9649c-.6904 0-1.25002.55964-1.25002 1.25v1.98437" /><Path d="m10.75 9.83333 2.875-3.11458 2.5938 2.46875 1.5-1.6875 2.5312 2.33333" stroke-linejoin="round" /></G></SVG>

export default icons;

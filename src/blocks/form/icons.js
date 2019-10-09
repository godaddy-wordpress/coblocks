/**
 * WordPress dependencies
 */
import { SVG, Path, G } from '@wordpress/components';

/**
 * Block user interface icons
 */
const icons = {};

icons.name =
	<SVG xmlns="http://www.w3.org/2000/svg">
		<Path fill="none" d="M0 0h24v24H0V0z" /><Path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
	</SVG>;

icons.email =
	<SVG xmlns="http://www.w3.org/2000/svg" >
		<Path fill="none" d="M0 0h24v24H0V0z" /><Path d="M12 1.95c-5.52 0-10 4.48-10 10s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57v-1.43c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57v-1.43c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
	</SVG>;

icons.textarea =
	<SVG xmlns="http://www.w3.org/2000/svg">
		<G fill="none" fillRule="evenodd"><path d="m0 0h24v24h-24z" /><path d="m4 11h16v2h-16zm0-4h16v2h-16zm0 8h10v2h-10z" fill="currentColor" fillRule="nonzero" /></G>
	</SVG>;

icons.error =
	<SVG xmlns="http://www.w3.org/2000/svg">
		<Path fill="none" d="M0 0h24v24H0V0z" /><Path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
	</SVG>;

icons.date =
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<Path d="m7 11h2v2h-2zm14-5v14c0 1.1-.9 2-2 2h-14c-1.11 0-2-.9-2-2l.01-14c0-1.1.88-2 1.99-2h1v-2h2v2h8v-2h2v2h1c1.1 0 2 .9 2 2zm-16 2h14v-2h-14zm14 12v-10h-14v10z" />
	</SVG>;

icons.telephone =
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<Path d="m6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1v3.49c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02z" fill-rule="evenodd" />
	</SVG>;

icons.radio =
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<Path d="m12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
	</SVG>;

export default icons;

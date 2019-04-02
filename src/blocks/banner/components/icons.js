/**
 * WordPress dependencies
 */
const { SVG, Path, G } = wp.components;

/**
 * Block user interface icons
 */
const icons = {};

icons.banner =
<SVG className="dashicon components-coblocks-svg" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><G fill="none" fill-rule="evenodd"><Path d="m0 0h24v24h-24z"/><G fill="currentColor"><Path d="m20 4h-16c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2zm0 14h-16v-12h16z" fill-rule="nonzero"/><Path d="m6 13h5v2h-5z"/><Path d="m15 11h3v2h-3z"/><Path d="m6 9h7v2h-7z"/></G></G></SVG>

icons.bannerLeft =
<svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g transform="translate(2 1)"><path d="m9 0c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2h-7c-1.1 0-2-.9-2-2v-14c0-1.1.9-2 2-2zm2 2.5h-3c-1.80029297 0-2.81677246 1.20318604-3 2.4788208v8.1696777c0 1.2033081 1.70123291 2.3515015 2.49108887 2.3515015h3.50891113z"/><path d="m14.5 4c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2h-7c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2zm0 8v-6h-7v6z" transform="matrix(0 1 -1 0 20 -2)"/></g></svg>

icons.bannerRight =
<svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(-1 0 0 1 18 1)"><path d="m9 0c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2h-7c-1.1 0-2-.9-2-2v-14c0-1.1.9-2 2-2zm2 2.5h-3c-1.80029297 0-2.81677246 1.20318604-3 2.4788208v8.1696777c0 1.2033081 1.70123291 2.3515015 2.49108887 2.3515015h3.50891113z"/><path d="m14.5 4c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2h-7c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2zm0 8v-6h-7v6z" transform="matrix(0 1 -1 0 20 -2)"/></g></svg>

export default icons;



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
<svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g fill-rule="evenodd"><path d="m2 5h9v10h-9z"/><path d="m13 9h5v2h-5z"/></g></svg>

icons.bannerRight =
<svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g fill-rule="evenodd"><path d="m9 5h9v10h-9z"/><path d="m2 9h5v2h-5z"/></g></svg>

icons.bannerCenter =
<svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g fill-rule="evenodd"><path d="m5 4.5h10v7h-10z"/><path d="m7.5 13.5h5v2h-5z"/></g></svg>

export default icons;

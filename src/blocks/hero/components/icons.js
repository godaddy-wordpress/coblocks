/**
 * WordPress dependencies
 */
const { SVG, Path, G } = wp.components;

/**
 * Block user interface icons
 */
const icons = {};

icons.hero =
<SVG className="dashicon components-coblocks-svg" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m16 0h-14c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm0 16h-14v-3h14z" transform="translate(3 3)"/></SVG>

icons.style =
<SVG height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	<Path d="m9 0c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5h1.77c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3-4c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3 4c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" transform="translate(3 3)"/>
</SVG>;

icons.colOne =
<svg height="28" viewBox="0 0 40 28" width="40" xmlns="http://www.w3.org/2000/svg"><path d="m38.0833333 0h-36.16666663c-1.05416667 0-1.91666667.9-1.91666667 2v24c0 1.1.8625 2 1.91666667 2h36.16666663c1.0541667 0 1.9166667-.9 1.9166667-2v-24c0-1.1-.8625-2-1.9166667-2zm0 26h-36.16666663v-24h36.16666663zm-34.0833333-22h14v7h-14z"/></svg>
icons.colTwo =
<svg height="28" viewBox="0 0 40 28" width="40" xmlns="http://www.w3.org/2000/svg"><path d="m38.0833333 0h-36.16666663c-1.05416667 0-1.91666667.9-1.91666667 2v24c0 1.1.8625 2 1.91666667 2h36.16666663c1.0541667 0 1.9166667-.9 1.9166667-2v-24c0-1.1-.8625-2-1.9166667-2zm0 26h-36.16666663v-24h36.16666663zm-22.5833333-22h9v2h-9zm-1 8.0233154h5v2h-5zm6 0h5v2h-5zm-7.5-4.0233154h14v3h-14z"/></svg>

icons.colThree =
<svg height="28" viewBox="0 0 40 28" width="40" xmlns="http://www.w3.org/2000/svg"><path d="m38.0833333 0h-36.16666663c-1.05416667 0-1.91666667.9-1.91666667 2v24c0 1.1.8625 2 1.91666667 2h36.16666663c1.0541667 0 1.9166667-.9 1.9166667-2v-24c0-1.1-.8625-2-1.9166667-2zm0 26h-36.16666663v-24h36.16666663zm-11.0833333-22h9v2h-9zm-2 9h5v2h-5zm6 0h5v2h-5zm-9-5h14v3h-14z"/></svg>

icons.colFour =
<svg className="dashicon" height="26" viewBox="0 0 50 26" width="50" xmlns="http://www.w3.org/2000/svg"><g fill-rule="evenodd"><path d="m48.0833333 0h-46.16666663c-1.05416667 0-1.91666667.9-1.91666667 2v22c0 1.1.8625 2 1.91666667 2h46.16666663c1.0541667 0 1.9166667-.9 1.9166667-2v-22c0-1.1-.8625-2-1.9166667-2zm0 24h-46.16666663v-22h46.16666663z" fill-rule="nonzero"/><path d="m12 2h2v22h-2z"/><path d="m24 2h2v22h-2z"/><path d="m36 2h2v22h-2z"/></g></svg>


export default icons;



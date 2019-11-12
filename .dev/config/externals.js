/**
 * Utility methods for use when generating build configuration objects.
 */
const { join } = require( 'path' );

/**
 * Given a string, returns a new string with dash separators converted to
 * camel-case equivalent. This is not as aggressive as `_.camelCase`, which
 * which would also upper-case letters following numbers.
 *
 * @param {string} string Input dash-delimited string.
 *
 * @return {string} Camel-cased string.
 */
const camelCaseDash = string => string.replace( /-([a-z])/g, ( match, letter ) => letter.toUpperCase() );

/**
 * Define externals to load components through the wp global.
 */
const externals = [
	'blocks',
	'block-editor',
	'components',
	'compose',
	'data',
	'date',
	'editor',
	'edit-post',
	'element',
	'hooks',
	'i18n',
	'plugins',
	'utils',
].reduce(
	( externals, name ) => ( {
		...externals,
		[ `@wordpress/${ name }` ]: `wp.${ camelCaseDash( name ) }`,
	} ),
	{
		wp: 'wp',
		react: 'React', // React itself is there in Gutenberg.
		jquery: 'jQuery', // import $ from 'jquery' // Use the WordPress version after enqueuing it.
		'react-dom': 'ReactDOM',
		lodash: 'lodash', // Lodash is there in Gutenberg.
	}
);

module.exports = externals;

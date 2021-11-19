/**
 * WordPress dependencies
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

/**
 * External dependencies
 */
const RtlCssPlugin = require( 'rtlcss-webpack-plugin' );
const path = require( 'path' );

const scripts = [
	'coblocks-accordion-carousel',
	'coblocks-accordion-polyfill',
	'coblocks-animation',
	'coblocks-checkbox-required',
	'coblocks-datepicker',
	'coblocks-events',
	'coblocks-fromEntries',
	'coblocks-google-maps',
	'coblocks-google-recaptcha',
	'coblocks-lightbox',
	'coblocks-masonry',
	'coblocks-slick-initializer-front',
	'coblocks-slick-initializer',
];

// If you want to add a new chunk simply increase the lenght of the array.
// This function produces based on array length { 'coblocks-1': 'src/blocks-1.js' }
// Don't forget to increment the range in includes/class-coblocks-block-assets.php if you increase it here.
const coblocksChunks = Array.from( { length: 8 }, ( _, i ) => i + 1 )
	.reduce(
		( a, i ) => ( { ...a, [ `coblocks-${ i }` ]: path.resolve( process.cwd(), `src/blocks-${ i }.js` ) } ),
		{}
	);

module.exports = {
	...defaultConfig,
	entry: {
		...coblocksChunks,
		'coblocks-extensions': path.resolve( process.cwd(), 'src/extensions.js' ),

		...scripts.reduce( ( memo, script ) => {
			memo[ `js/${ script }` ] = path.resolve( process.cwd(), 'src', 'js', `${ script }.js` );
			return memo;
		}, {} ),

		// Vendors
		'js/vendors/flickity': path.resolve( process.cwd(), 'node_modules/flickity/dist/flickity.pkgd.js' ),
		'js/vendors/slick': path.resolve( process.cwd(), 'node_modules/slick-carousel/slick/slick.js' ),
	},

	output: {
		...defaultConfig.output,
		path: path.resolve( process.cwd(), 'dist/' ),
		publicPath: 'auto',
	},

	plugins: [
		...defaultConfig.plugins,
		new RtlCssPlugin( {
			filename: '[name]-rtl.css',
		} ),
	],
};

// Set parallelism to 1 in CircleCI.
if ( process.env.CI ) {
	module.exports.parallelism = 1;
}

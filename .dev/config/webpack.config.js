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

module.exports = {
	...defaultConfig,
	entry: {
		coblocks: path.resolve( process.cwd(), 'src/blocks.js' ),

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

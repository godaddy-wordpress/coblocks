/**
 * WordPress dependencies
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

/**
 * External dependencies
 */
const RtlCssPlugin = require( 'rtlcss-webpack-plugin' );
const path = require( 'path' );
const fs = require( 'fs' );

const scripts = [
	'coblocks-accordion-polyfill',
	'coblocks-animation',
	'coblocks-checkbox-required',
	'coblocks-counter-script',
	'coblocks-events-script',
	'coblocks-fromEntries',
	'coblocks-google-maps',
	'coblocks-google-recaptcha',
	'coblocks-lightbox',
	'coblocks-masonry',
	'coblocks-post-carousel-script',
	'coblocks-services-script',
	'coblocks-tinyswiper-initializer',
	'coblocks-gist-script',
];

const coblocksEntries = fs.readdirSync( path.resolve( process.cwd(), 'src' ) ).filter( ( file ) => file.startsWith( 'blocks-' ) );

const coblocksChunks = coblocksEntries.reduce(
	( a, file ) => ( { ...a, [ 'co' + file.replace( '.js', '' ) ]: path.resolve( process.cwd(), `src/${ file }` ) } ),
	{}
);

module.exports = {
	...defaultConfig,
	entry: {
		...coblocksChunks,
		'coblocks-extensions': path.resolve( process.cwd(), 'src/extensions.js' ),
		'coblocks-plugin-deactivation': path.resolve( process.cwd(), 'src/components/coblocks-deactivate-modal/index.js' ),
		'style-coblocks-animation': path.resolve( process.cwd(), 'src/styles/coblocks-animation.scss' ),

		...scripts.reduce( ( memo, script ) => {
			memo[ `js/${ script }` ] = path.resolve( process.cwd(), 'src', 'js', `${ script }.js` );
			return memo;
		}, {} ),

		// Vendors
		'js/vendors/tiny-swiper': path.resolve( process.cwd(), 'node_modules/tiny-swiper/lib/index.js' ),
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

/**
 * WordPress dependencies
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

/**
 * External dependencies
 */
const RtlCssPlugin = require( 'rtlcss-webpack-plugin' );
const path = require( 'path' );

defaultConfig.module.rules[ 1 ].use[ 1 ].options = {
	...defaultConfig.module.rules[ 1 ].use[ 1 ].options,
	url: false,
};

module.exports = {
	...defaultConfig,
	entry: {
		coblocks: path.resolve( process.cwd(), 'src/blocks.js' ),

		// Front-End Scripts
		'js/coblocks-animation': path.resolve( process.cwd(), 'src/js/coblocks-animation.js' ),
		'js/coblocks-accordion-polyfill': path.resolve( process.cwd(), 'src/js/coblocks-accordion-polyfill.js' ),
		'js/coblocks-accordion-carousel': path.resolve( process.cwd(), 'src/js/coblocks-accordion-carousel.js' ),
		'js/coblocks-checkbox-required': path.resolve( process.cwd(), 'src/js/coblocks-checkbox-required.js' ),
		'js/coblocks-datepicker': path.resolve( process.cwd(), 'src/js/coblocks-datepicker.js' ),
		'js/coblocks-events': path.resolve( process.cwd(), 'src/js/coblocks-events.js' ),
		'js/coblocks-fromEntries': path.resolve( process.cwd(), 'src/js/coblocks-fromEntries.js' ),
		'js/coblocks-google-maps': path.resolve( process.cwd(), 'src/js/coblocks-google-maps.js' ),
		'js/coblocks-google-recaptcha': path.resolve( process.cwd(), 'src/js/coblocks-google-recaptcha.js' ),
		'js/coblocks-lightbox': path.resolve( process.cwd(), 'src/js/coblocks-lightbox.js' ),
		'js/coblocks-masonry': path.resolve( process.cwd(), 'src/js/coblocks-masonry.js' ),
		'js/coblocks-slick-initializer': path.resolve( process.cwd(), 'src/js/coblocks-slick-initializer.js' ),
		'js/coblocks-slick-initializer-front': path.resolve( process.cwd(), 'src/js/coblocks-slick-initializer-front.js' ),

		// Vendors
		'js/vendors/flickity': path.resolve( process.cwd(), 'node_modules/flickity/dist/flickity.pkgd.js' ),
		'js/vendors/slick': path.resolve( process.cwd(), 'node_modules/slick-carousel/slick/slick.js' ),
	},

	output: {
		filename: '[name].js',
		path: path.resolve( process.cwd(), 'dist/' ),
	},

	stats: {
		children: false,
		modules: false,
		warnings: false,
	},

	plugins: [
		...defaultConfig.plugins,
		new RtlCssPlugin( {
			filename: '[name]-rtl.css',
		} ),
	],
};

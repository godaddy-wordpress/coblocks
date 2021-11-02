/**
 * WordPress dependencies
 */
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

/**
 * Internal dependencies
 */
const postcssConfig = require( './postcss.config' );
const { hasBabelConfig } = require( './utils' );

/**
 * External dependencies
 */
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const RtlCssPlugin = require( 'rtlcss-webpack-plugin' );
const path = require( 'path' );
const FixStyleOnlyEntriesPlugin = require( 'webpack-fix-style-only-entries' );
const nodeSassGlobImporter = require( 'node-sass-glob-importer' );

const isProduction = process.env.NODE_ENV === 'production';
const isDebugMode = process.env.DEBUG_MODE === 'on';

module.exports = {
	entry: {
		coblocks: path.resolve( process.cwd(), 'src/blocks.js' ),

		// Styles
		'coblocks-editor': path.resolve( process.cwd(), 'src/styles/editor.scss' ),
		'coblocks-style': path.resolve( process.cwd(), 'src/styles/style.scss' ),

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
		'js/coblocks-tinyswiper-initializer': path.resolve( process.cwd(), 'src/js/coblocks-tinyswiper-initializer.js' ),

		// Vendors
		'js/vendors/flickity': path.resolve( process.cwd(), 'node_modules/flickity/dist/flickity.pkgd.js' ),
		'js/vendors/slick': path.resolve( process.cwd(), 'node_modules/slick-carousel/slick/slick.js' ),
		// 'js/vendors/tiny-swiper': path.resolve( process.cwd(), 'node_modules/tiny-swiper/lib/index.min.js' ),
	},

	output: {
		filename: '[name].js',
		path: path.resolve( process.cwd(), 'dist/' ),
	},

	module: {
		rules: [
			{
				test: /\.svg$/,
				use: [ '@svgr/webpack', 'url-loader' ],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					require.resolve( 'thread-loader' ),
					{
						loader: require.resolve( 'babel-loader' ),
						options: {
							// Babel uses a directory within local node_modules
							// by default. Use the environment variable option
							// to enable more persistent caching.
							cacheDirectory:
								process.env.BABEL_CACHE_DIRECTORY || true,

							// Provide a fallback configuration if there's not
							// one explicitly available in the project.
							...( ! hasBabelConfig() && {
								babelrc: false,
								configFile: false,
								presets: [
									require.resolve(
										'@wordpress/babel-preset-default'
									),
								],
							} ),
						},
					},
				],
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							url: false,
							sourceMap: ! isProduction,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							...postcssConfig,
							sourceMap: ! isProduction,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: ! isProduction,
							sassOptions: {
								importer: nodeSassGlobImporter(),
							},
						},
					},
				],
			},
		],
	},

	stats: {
		children: false,
		modules: false,
		warnings: false,
	},

	plugins: [
		new DependencyExtractionWebpackPlugin( { injectPolyfill: true } ),
		new MiniCssExtractPlugin( {
			filename: '[name].css',
		} ),
		new FixStyleOnlyEntriesPlugin(),
		new RtlCssPlugin( {
			filename: '[name]-rtl.css',
		} ),
	],

	devtool: isDebugMode ? 'source-map' : false,
};

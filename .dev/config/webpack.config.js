const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const postcssConfig = require( './postcss.config' );

const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const RtlCssPlugin = require( 'rtlcss-webpack-plugin' );
const FixStyleOnlyEntriesPlugin = require( 'webpack-fix-style-only-entries' );
const nodeSassGlobImporter = require( 'node-sass-glob-importer' );

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	...defaultConfig,

	entry: {
		coblocks: path.resolve( process.cwd(), 'src/blocks.js' ),

		// Styles
		'coblocks-editor': path.resolve( process.cwd(), 'src/styles/editor.scss' ),
		'coblocks-style': path.resolve( process.cwd(), 'src/styles/style.scss' ),

		// Front-End Scripts
		// wpcom-disabled-start
		// 'js/coblocks-accordion-polyfill': path.resolve( process.cwd(), 'src/js/coblocks-accordion-polyfill.js' ),
		// 'js/coblocks-accordion-carousel': path.resolve( process.cwd(), 'src/js/coblocks-accordion-carousel.js' ),
		// 'js/coblocks-datepicker': path.resolve( process.cwd(), 'src/js/coblocks-datepicker.js' ),
		// 'js/coblocks-events': path.resolve( process.cwd(), 'src/js/coblocks-events.js' ),
		// wpcom-disabled-end
		'js/coblocks-fromEntries': path.resolve( process.cwd(), 'src/js/coblocks-fromEntries.js' ),
		// wpcom-disabled-start
		// 'js/coblocks-google-maps': path.resolve( process.cwd(), 'src/js/coblocks-google-maps.js' ),
		// 'js/coblocks-google-recaptcha': path.resolve( process.cwd(), 'src/js/coblocks-google-recaptcha.js' ),
		// wpcom-disabled-end
		'js/coblocks-lightbox': path.resolve( process.cwd(), 'src/js/coblocks-lightbox.js' ),
		'js/coblocks-masonry': path.resolve( process.cwd(), 'src/js/coblocks-masonry.js' ),
		// wpcom-disabled-start
		// 'js/coblocks-slick-initializer': path.resolve( process.cwd(), 'src/js/coblocks-slick-initializer.js' ),
		// 'js/coblocks-slick-initializer-front': path.resolve( process.cwd(), 'src/js/coblocks-slick-initializer-front.js' ),

		// // Vendors
		// 'js/vendors/flickity': path.resolve( process.cwd(), 'node_modules/flickity/dist/flickity.pkgd.js' ),
		// 'js/vendors/slick': path.resolve( process.cwd(), 'node_modules/slick-carousel/slick/slick.js' ),
		// wpcom-disabled-end
	},

	output: {
		filename: '[name].js',
		path: path.resolve( process.cwd(), 'dist/' ),
	},

	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,

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
		...defaultConfig.stats,
		modules: false,
		warnings: false,
	},

	plugins: [
		...defaultConfig.plugins,

		new FixStyleOnlyEntriesPlugin(),
		new MiniCssExtractPlugin( {
			filename: '[name].css',
		} ),
		new RtlCssPlugin( {
			filename: '[name]-rtl.css',
		} ),
	],
};

const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const postcssConfig = require( './postcss.config' );

const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const FixStyleOnlyEntriesPlugin = require( "webpack-fix-style-only-entries" );
const nodeSassGlobImporter = require( 'node-sass-glob-importer' );

const styleExtractConfig = [
	MiniCssExtractPlugin.loader,
	{
		loader: 'css-loader',
		options: {
			url: false,
		},
	},
	{
		loader: 'postcss-loader',
		options: postcssConfig,
	},
	{
		loader: 'sass-loader',
		options: {
			sassOptions: {
				importer: nodeSassGlobImporter(),
			}
		}
	}
];

module.exports = {
	...defaultConfig,

	entry: {
		'coblocks': path.resolve( process.cwd(), 'src/blocks.js' ),
		'coblocks-editor': path.resolve( process.cwd(), 'src/styles/editor.scss' ),
		'coblocks-style': path.resolve( process.cwd(), 'src/styles/style.scss' ),

		'js/coblocks-accordion-polyfill': path.resolve( process.cwd(), 'src/js/coblocks-accordion-polyfill.js' ),
		'js/coblocks-datepicker': path.resolve( process.cwd(), 'src/js/coblocks-datepicker.js' ),
		'js/coblocks-fromEntries': path.resolve( process.cwd(), 'src/js/coblocks-fromEntries.js' ),
		'js/coblocks-google-maps': path.resolve( process.cwd(), 'src/js/coblocks-google-maps.js' ),
		'js/coblocks-google-recaptcha': path.resolve( process.cwd(), 'src/js/coblocks-google-recaptcha.js' ),
		'js/coblocks-lightbox': path.resolve( process.cwd(), 'src/js/coblocks-lightbox.js' ),
		'js/coblocks-masonry': path.resolve( process.cwd(), 'src/js/coblocks-masonry.js' ),
		'js/coblocks-slick-initializer-front': path.resolve( process.cwd(), 'src/js/coblocks-slick-initializer-front.js' ),
		'js/coblocks-slick-initializer': path.resolve( process.cwd(), 'src/js/coblocks-slick-initializer.js' ),
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
				test: /style\.scss$/,
				use: styleExtractConfig,
			},

			{
				test: /editor\.scss$/,
				use: styleExtractConfig,
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
	],
};

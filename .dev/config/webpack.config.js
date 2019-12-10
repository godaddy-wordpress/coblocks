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
		blocks: path.resolve( process.cwd(), 'src/blocks.js' ),
		editor: path.resolve( process.cwd(), 'src/styles/editor.scss' ),
		style: path.resolve( process.cwd(), 'src/styles/style.scss' ),
	},

	output: {
		filename: '[name].build.js',
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
			filename: 'blocks.[name].build.css',
		} ),
	],
};

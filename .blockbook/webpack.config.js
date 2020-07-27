const path = require( 'path' );
const nodeSassGlobImporter = require( 'node-sass-glob-importer' );
const postcssConfig = require( '../.dev/config/postcss.config.js' );

module.exports = ( baseConfig ) => {
	return {
		...baseConfig,
		output: {
			...baseConfig.output,
			path: path.resolve( process.cwd(), 'blockbook' ),
		},
		devServer: {
			...baseConfig.devServer,
			contentBase: path.resolve( process.cwd(), 'blockbook' ),
		},
		module: {
			...baseConfig.module,
			rules: [
				...baseConfig.module.rules,
				{
					test: /\.scss$/,
					use: [
						{
							loader: 'style-loader',
						},
						{
							loader: 'css-loader',
							options: {
								url: false,
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								...postcssConfig,
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sassOptions: {
									importer: nodeSassGlobImporter(),
								},
							},
						},
					],
				},
			],
		},
	};
};

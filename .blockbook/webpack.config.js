const nodeSassGlobImporter = require( 'node-sass-glob-importer' );
const postcssConfig = require( '../.dev/config/postcss.config.js' );

module.exports = ( baseConfig ) => {
	return {
		...baseConfig,
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

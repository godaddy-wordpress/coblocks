/* eslint-disable sort-keys */
module.exports = {
	preset: '@wordpress/jest-preset-default',
	rootDir: '../../../',

	collectCoverageFrom: [
		'<rootDir>/src/blocks/**/save.js',
		'<rootDir>/src/blocks/**/transforms.js',
		'!<rootDir>/src/blocks/gallery-masonry/v1/*.js',
	],
	moduleNameMapper: {
		'@godaddy-wordpress/coblocks-icons': require.resolve(
			'@wordpress/jest-preset-default/scripts/style-mock.js'
		),
	},
	setupFilesAfterEnv: [
		require.resolve( '@wordpress/jest-preset-default/scripts/setup-globals.js' ),
		'<rootDir>/.dev/tests/jest/setup-globals.js',
	],
	testMatch: [ '**/test/*.spec.js' ],
	transform: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/.dev/tests/jest/assets-transformer.js',
	},
};

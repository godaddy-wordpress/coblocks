/* eslint-disable sort-keys */
module.exports = {
	preset: '@wordpress/jest-preset-default',
	rootDir: '../../../',

	collectCoverageFrom: [
		'<rootDir>/src/blocks/**/save.js',
		'<rootDir>/src/blocks/**/transforms.js',
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
	testEnvironment: '<rootDir>/.dev/tests/jest/custom-test-env.js',
};

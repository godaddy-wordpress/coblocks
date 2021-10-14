module.exports = {
	extends: [
		'plugin:@wordpress/eslint-plugin/recommended-with-formatting',
	],
	env: {
		browser: true,
		'cypress/globals': true,
		jest: true,
	},
	globals: {
		page: true,
	},
	plugins: [
		'cypress',
		'chai-friendly',
	],
	rules: {
		'jest/expect-expect': [
			'error',
			{
				assertFunctionNames: [ 'expect', 'cy.get', 'helpers.checkForBlockErrors' ],
			},
		],
		// Disable issue: https://github.com/godaddy-wordpress/coblocks/issues/2036
		'import/no-extraneous-dependencies': 0,
		// Disable issue: https://github.com/godaddy-wordpress/coblocks/issues/2038
		'import/named': 0,
	},
};

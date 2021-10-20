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
	},
};

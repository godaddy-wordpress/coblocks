module.exports = {
	extends: [
		'plugin:@wordpress/eslint-plugin/recommended-with-formatting',
	],
	env: {
		browser: true,
		'cypress/globals': true,
	},
	plugins: [
		'cypress',
		'chai-friendly',
	],
};

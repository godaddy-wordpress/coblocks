module.exports = {
    extends: [
        'plugin:@wordpress/eslint-plugin/recommended',
    ],
    env: {
        browser: true,
        "cypress/globals": true
    },
    plugins: [
        "cypress",
        "chai-friendly"
    ],
};
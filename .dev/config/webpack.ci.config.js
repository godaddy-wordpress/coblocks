const defaultConfig = require( './webpack.config' );

module.exports = {
	...defaultConfig,

	parallelism: 1,
};

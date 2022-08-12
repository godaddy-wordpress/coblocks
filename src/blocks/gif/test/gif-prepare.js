const { setupPostsForE2E } = require( '../../../utils/testing-utils' );
const { name } = require( '../block.json' );

const gifPrepare = () => ( async () => await setupPostsForE2E( name ) )();

module.exports = {
	gifPrepare,
};

const { setupPostsForE2E } = require( '../../../utils/testing-utils' );
const { name } = require( '../block.json' );

const highlightPrepare = () => ( async () => await setupPostsForE2E( name ) )();

module.exports = {
	highlightPrepare,
};

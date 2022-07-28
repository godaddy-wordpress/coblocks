const { createNewTestPost ,runE2EPrepareScript, updatePostWithContent, prepareChainFunction } = require( '../../../utils/utils' );
const { log } = require('../../../../.dev/performance/logger');
const { name } = require('../block.json');

const postsPrepare = async () => runE2EPrepareScript( name ).then(
            async data => await prepareChainFunction( data, name ),
            err =>  console.error("async error:\n" + err),
        );

module.exports = {
    postsPrepare
}
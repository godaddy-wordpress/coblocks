/**
 * External dependencies
 */
const { spawn } = require( 'child_process' );

/**
 * Internal dependencies
 */
const { log } = require( '../../.dev/performance/logger' );

/**
 * Utility used as a primary function for preparation of e2e migration tests.
 * This function should be used in conjunction with the Block name to properly setup helpers.
 *
 * Example helper configuration for posts block:
 * ```
 * const { setupPostsForE2E } = require( '../../../utils/testing-utils' );
 * const { name } = require('../block.json');
 *
 * const postsPrepare = () => ( async () => await setupPostsForE2E( name ) )();
 *
 * module.exports = {
 *     postsPrepare
 * }
 * ```
 *
 * Within the cypress.config.js file we need to modify setupNodeEvents anonyomus function expression to include the block name helper.
 *
 * Example of cypress.config.js file modification:
 * ```
 * 		setupNodeEvents( on, config ) {
 * 			...
 * 			return ( async () => {
 * 				config.migrationPostList = {
 * 					posts: await postsPrepare(),
 * 				};
 * 				return config;
 * 			} )();
 * 		},
 * ```
 *
 * @function setupPostsForE2E Primary helper to setup e2e tests for migrations.
 * @typedef {NodeJS.ProcessEnv} Env
 * @param {string} blockName Block name.
 */
const setupPostsForE2E = async ( blockName ) => {
	return await runE2EPrepareScript( blockName ).then(
		async ( data ) => await prepareChainFunction( data, blockName ),
		( err ) => log( 'async error:\n' + err ),
	);
};

/**
 * Utility used as a followup to runE2EPrepareScript where we can upload the fixtures to the post.
 *
 * @typedef {NodeJS.ProcessEnv} Env
 * @param {Object} postData  object containing post ID and taxonomy ID.
 * @param {string} blockName Block name.
 */
const prepareChainFunction = async ( postData, blockName ) => {
	let { postId, taxId } = postData;
	if ( postId.trim() === '' ) {
		// Wait for new post ID.
		postId = await createNewTestPost( blockName, taxId );
		// Then parse the integer.
		postId = Number.parseInt( postId ) ?? false;

		// No post ID found so bail.
		if ( ! postId ) {
			log( 'unable to create new site by cli' );
			return;
		}
	}
	// Check for multiple posts with matching custom post type found and just use the first one.
	if ( postId.split( ' ' ).length > 1 ) {
		const postIdArray = postId.split( ' ' );
		postId = postIdArray.shift();
		// Keep first post ID in array and remove all others.
		await removeExcessPosts( postIdArray, blockName );
	}

	// Post exists - update it.
	await updatePostWithContent( postId, blockName, taxId );
	return postId;
};

/**
 * Utility used to remove excess posts.
 *
 * @typedef {NodeJS.ProcessEnv} Env
 * @param {Array} ids Array of post IDs - should be flattened into string for command.
 */
const removeExcessPosts = async ( ids ) => {
	const npxRemove = spawn( 'npx', [ 'wp-env', 'run', 'cli', 'post', 'delete', ids.join( ' ' ), '--force' ] );

	let data = '';
	for await ( const chunk of npxRemove.stdout ) {
		data += chunk;
	}
	let error = '';
	for await ( const chunk of npxRemove.stderr ) {
		error += chunk;
	}
	const exitCode = await new Promise( ( resolve ) => {
		npxRemove.on( 'close', resolve );
	} );

	if ( exitCode ) {
		throw new Error( `subprocess error exit ${ exitCode }, ${ error }` );
	}
	return data;
};

/**
 * Utility used to prepare e2e tests for migrations.
 *
 * @typedef {NodeJS.ProcessEnv} Env
 * @param {string} blockName Block name.
 */
const runE2EPrepareScript = async ( blockName ) => {
	const blockNameWithoutCoblocks = blockName.replace( 'coblocks/', '' );
	const taxonomyId = await handleTaxonomy( blockNameWithoutCoblocks );

	const npxPrepare = spawn( 'npx', [ 'wp-env', 'run', 'cli', 'post', 'list', '--fields=ID', `--category__in=${ taxonomyId }`, '--format=ids' ] );

	let data = '';
	for await ( const chunk of npxPrepare.stdout ) {
		data += chunk;
	}
	let error = '';
	for await ( const chunk of npxPrepare.stderr ) {
		error += chunk;
	}
	const exitCode = await new Promise( ( resolve ) => {
		npxPrepare.on( 'close', resolve );
	} );

	if ( exitCode ) {
		throw new Error( `subprocess error exit ${ exitCode }, ${ error }` );
	}
	return { postId: data ?? '', taxId: taxonomyId };
};

/**
 * Utility used to fetch existing category taxonomies for e2e testing.
 *
 * @typedef {NodeJS.ProcessEnv} Env
 * @param {string} tax Matching string for block relevant category.
 */
const getTaxonomiesByName = async ( tax ) => {
	const npxTermGet = spawn( 'npx',
		[ 'wp-env', 'run', 'cli', 'term', 'get', 'category', tax, '--by=slug', `--format=json` ] );

	let data = '';
	for await ( const chunk of npxTermGet.stdout ) {
		data += chunk;
	}

	const exitCode = await new Promise( ( resolve ) => {
		npxTermGet.on( 'close', resolve );
	} );

	if ( exitCode ) {
		return false;
	}
	return data;
};

/**
 * Utility used to create new category taxonomies for e2e testing.
 *
 * @typedef {NodeJS.ProcessEnv} Env
 * @param {string} tax Matching string for block relevant category.
 */
const createNewCategory = async ( tax ) => {
	const npxTermGet = spawn( 'npx',
		[ 'wp-env', 'run', 'cli', 'term', 'create', 'category', tax, '--porcelain' ] );

	let data = '';
	for await ( const chunk of npxTermGet.stdout ) {
		data += chunk;
	}
	let error = '';
	for await ( const chunk of npxTermGet.stderr ) {
		error += chunk;
	}
	const exitCode = await new Promise( ( resolve ) => {
		npxTermGet.on( 'close', resolve );
	} );

	if ( exitCode ) {
		throw new Error( `subprocess error exit ${ exitCode }, ${ error }` );
	}
	return data;
};

/**
 * Utility used to setup category taxonomies for e2e testing.
 *
 * @typedef {NodeJS.ProcessEnv} Env
 * @param {string} blockSlug Block name with plugin name removed.
 */
const handleTaxonomy = async ( blockSlug ) => {
	// Is there an existing matching category taxonomy?
	const matchingTaxonomy = `${ blockSlug }_test`;

	let taxId = await getTaxonomiesByName( matchingTaxonomy );
	if ( ! taxId ) {
		// Taxonomy does not exist - lets create it before we create posts.
		taxId = Number.parseInt( await createNewCategory( matchingTaxonomy ) );
	}

	if ( ! Number.isInteger( taxId ) ) {
		// Existing taxonomies come in with JSON response.
		taxId = JSON.parse( taxId ).term_id;
	}

	// Return valid taxonomy ID equivalent to matchingTaxonomy.
	return taxId;
};

/**
 * Utility used to create new posts for  e2e.
 *
 * @typedef {NodeJS.ProcessEnv} Env
 * @param {string} blockName Block name.
 * @param {string} taxId     Taxonomy ID.
 */
const createNewTestPost = async ( blockName, taxId ) => {
	const npxCreate = spawn( 'npx',
		[ 'wp-env', 'run', 'cli', 'post', 'create', `--post_category=${ taxId }`, `--post_title="${ blockName }"`, '--porcelain', '-' ],
		{ shell: true } );

	let data = '';
	for await ( const chunk of npxCreate.stdout ) {
		data += chunk;
	}
	let error = '';
	for await ( const chunk of npxCreate.stderr ) {
		error += chunk;
	}
	const exitCode = await new Promise( ( resolve ) => {
		npxCreate.on( 'close', resolve );
	} );

	if ( exitCode ) {
		throw new Error( `subprocess error exit ${ exitCode }, ${ error }` );
	}
	return data;
};

/**
 * Utility used to populate e2e test posts with fixtures.
 *
 * @typedef {NodeJS.ProcessEnv} Env
 * @param {string} postId    The post ID.
 * @param {string} blockName Block name.
 * @param {string} taxId     Taxonomy ID.
 *
 */
const updatePostWithContent = async ( postId, blockName, taxId ) => {
	const blockNameWithoutCoblocks = blockName.replace( 'coblocks/', '' );
	const npxUpdate = spawn(
		`cat ./src/blocks/${ blockNameWithoutCoblocks }/test/${ blockNameWithoutCoblocks }.html | npx`,
		[ 'wp-env', 'run', 'cli', 'post', 'update', `${ postId }`, `--post_category=${ taxId }`, `--post_title="${ blockName }"`, '-' ],
		{ shell: true }	);

	let data = '';
	for await ( const chunk of npxUpdate.stdout ) {
		data += chunk;
	}
	let error = '';
	for await ( const chunk of npxUpdate.stderr ) {
		error += chunk;
	}
	const exitCode = await new Promise( ( resolve ) => {
		npxUpdate.on( 'close', resolve );
	} );

	if ( exitCode ) {
		throw new Error( `subprocess error exit ${ exitCode }, ${ error }` );
	}
	return data;
};

module.exports = {
	createNewTestPost,
	prepareChainFunction,
	removeExcessPosts,
	runE2EPrepareScript,
	setupPostsForE2E,
	updatePostWithContent,
};

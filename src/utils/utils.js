/**
 * External dependencies
 */
const inquirer = require( 'inquirer' );
const fs = require( 'fs' );
const { childProcess, spawn } = require( 'child_process' );
const { v4: uuid } = require( 'uuid' );
const path = require( 'path' );
const os = require( 'os' );

/**
 * Internal dependencies
 */
const { log, formats } = require( '../../.dev/performance/logger' );

/**
 * Utility used as a followup to runE2EPrepareScript where we can upload the fixtures to the post.
 *
 * @typedef {NodeJS.ProcessEnv} Env
 * @param {string} postId
 * @param {string} blockName Block name.
 */
const prepareChainFunction = async ( postId, blockName ) => {
	if ( postId.trim() === '' ) {
		// Wait for new post ID.
		postId = await createNewTestPost( blockName );
		// Parse post ID by splitting by keyword.
		postId = postId?.split( 'Created post ' );
		// Then parse the integer.
		postId = Number.parseInt( postId[ postId.length - 1 ] ) ?? false;

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
	await updatePostWithContent( postId, blockName );
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
	const npxPrepare = spawn( 'npx', [ 'wp-env', 'run', 'cli', 'post', 'list', `--post_type="${ blockNameWithoutCoblocks }_test"`, '--format=ids' ] );

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
	return data;
};

/**
 * Utility used to create new posts for  e2e.
 *
 * @typedef {NodeJS.ProcessEnv} Env
 * @param {string} blockName Block name.
 */
const createNewTestPost = async ( blockName ) => {
	const blockNameWithoutCoblocks = blockName.replace( 'coblocks/', '' );
	const npxCreate = spawn( `cat ./src/blocks/${ blockNameWithoutCoblocks }/test/${ blockNameWithoutCoblocks }.html | npx`,
		[ 'wp-env', 'run', 'cli', 'post', 'create', `--post_type="${ blockNameWithoutCoblocks }_test"`, '--format=ids', `--post_title="${ blockName }"`, '-' ],
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
 */
const updatePostWithContent = async ( postId, blockName ) => {
	const blockNameWithoutCoblocks = blockName.replace( 'coblocks/', '' );
	const npxUpdate = spawn(
		`cat ./src/blocks/${ blockNameWithoutCoblocks }/test/${ blockNameWithoutCoblocks }.html | npx`,
		[ 'wp-env', 'run', 'cli', 'post', 'update', `${ postId }`, `--post_type="${ blockNameWithoutCoblocks }_test"`, `--post_title="${ blockName }"`, '-' ],
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

/**
 * Utility to run a child script
 *
 * @typedef {NodeJS.ProcessEnv} Env
 * @param {string}  script Script to run.
 * @param {string=} cwd    Working directory.
 * @param {Env=}    env    Additional environment variables to pass to the script.
 */
function runShellScript( script, cwd, env = {} ) {
	return new Promise( ( resolve, reject ) => {
		childProcess.exec(
			script,
			{
				cwd,
				env: {
					HOME: process.env.HOME,
					NO_CHECKS: 'true',
					PATH: process.env.PATH,
					...env,
				},
			},
			function( error, stdout, stderr ) {
				if ( error ) {
					// eslint-disable-next-line no-console
					console.log( stderr );
					reject( error );
				} else {
					resolve( true );
				}
			}

		);
	} );
}

function runShellScriptIgnoreFailing( script, cwd, env = {} ) {
	return new Promise( ( resolve ) => {
		childProcess.exec(
			script,
			{
				cwd,
				env: {
					HOME: process.env.HOME,
					NO_CHECKS: 'true',
					PATH: process.env.PATH,
					...env,
				},
			},
			function( error, _, stderr ) {
				if ( error ) {
					// eslint-disable-next-line no-console
					console.log( stderr );
					// We make the promise resolve even if the script fails
					resolve( true );
				} else {
					resolve( true );
				}
			}
		);
	} );
}

/**
 * Small utility used to read an uncached version of a JSON file
 *
 * @param {string} fileName
 */
function readJSONFile( fileName ) {
	const data = fs.readFileSync( fileName, 'utf8' );
	return JSON.parse( data );
}

/**
 * Asks the user for a confirmation to continue or abort otherwise.
 *
 * @param {string}  message      Confirmation message.
 * @param {boolean} isDefault    Default reply.
 * @param {string}  abortMessage Abort message.
 */
async function askForConfirmation(
	message,
	isDefault = true,
	abortMessage = 'Aborting.'
) {
	const { isReady } = await inquirer.prompt( [
		{
			default: isDefault,
			message,
			name: 'isReady',
			type: 'confirm',
		},
	] );

	if ( ! isReady ) {
		log( formats.error( '\n' + abortMessage ) );
		process.exit( 1 );
	}
}

/**
 * Generates a random temporary path in the OS's tmp dir.
 *
 * @return {string} Temporary Path.
 */
function getRandomTemporaryPath() {
	return path.join( os.tmpdir(), uuid() );
}

module.exports = {
	askForConfirmation,
	createNewTestPost,
	getRandomTemporaryPath,
	prepareChainFunction,
	readJSONFile,
	removeExcessPosts,
	runE2EPrepareScript,
	runShellScript,
	runShellScriptIgnoreFailing,
	updatePostWithContent,
};

/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { createBlock } = wp.blocks;

const transforms = {
	from: [
		{
			type: 'raw',
			priority: 1,
			isMatch: node =>
				node.nodeName === 'P' &&
                /^\s*(https?:\/\/\S+)\s*$/i.test( node.textContent ) &&
                node.textContent.match( /^https?:\/\/(www\.)?gist\.github\.com\/.+/i ),
			transform: node => {
				// Check for a file within the URL.
				const file = node.textContent
					.trim()
					.split( '#' )
					.pop();
				const fileClean = file.replace( 'file-', '#file-' ).replace( '-', '.' );

				return createBlock( 'coblocks/gist', {
					url: node.textContent.trim(),
					file: file.match( /file*/ ) !== null ? fileClean : undefined,
				} );
			},
		},
		{
			type: 'prefix',
			prefix: ':gist',
			transform: function( content ) {
				return createBlock( metadata.name, {
					content,
				} );
			},
		},
	],
};

export default transforms;

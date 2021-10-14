/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	to: [
		{
			type: 'block',
			blocks: [ 'core/embed' ],
			transform: ( { url, file, caption, meta } ) => {
				return createBlock( 'core/embed', {
					providerNameSlug: 'gist',
					type: 'rich',
					url: url + ( file ? '#file-' + file.replace( '.', '-' ) : '' ),
					caption,
					className: ! meta && 'no-meta',
				} );
			},
		},
	],
};

export default transforms;

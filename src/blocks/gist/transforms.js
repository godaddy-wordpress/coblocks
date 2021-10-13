/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	to: [
		{
			type: 'block',
			blocks: [ 'core/embed' ],
			transform: ( { url, file, caption } ) => {
				return createBlock( 'core/embed', {
					url: url + '?file=' + file,
					caption,
				} );
			},
		},
	],
};

export default transforms;

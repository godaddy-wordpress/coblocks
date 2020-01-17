/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies.
 */
import { InnerBlocks } from '@wordpress/block-editor';

const deprecated =
[ {
	attributes: {
		...metadata.attributes,
	},
	save( { attributes, className } ) {
		return (
			<div className={ className } data-columns={ attributes.columns }>
				<InnerBlocks.Content />
			</div>
		);
	},

} ];

export default deprecated;

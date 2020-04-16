/**
 * Internal dependencies
 */
import { attributes } from './block.json';

/**
 * WordPress dependencies.
 */
import { InnerBlocks } from '@wordpress/block-editor';

const deprecated = [
	{
		attributes,
		save: ( { attributes, className } ) => {
			return (
				<div className={ className } data-columns={ attributes.columns } itemScope itemType="http://schema.org/Menu">
					<InnerBlocks.Content />
				</div>
			);
		},
	},
];

export default deprecated;

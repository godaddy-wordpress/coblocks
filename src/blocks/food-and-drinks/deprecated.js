/**
 * Internal dependencies
 */
import { default as currentBlock } from './block.json';

/**
 * WordPress dependencies.
 */
import { InnerBlocks } from '@wordpress/block-editor';

const deprecated = [
	{
		attributes: currentBlock.attributes,
		save: ( deprecatedProps ) => {
			return (
				<div className={ deprecatedProps.className } data-columns={ deprecatedProps.attributes.columns } itemScope itemType="http://schema.org/Menu">
					<InnerBlocks.Content />
				</div>
			);
		},
	},
];

export default deprecated;

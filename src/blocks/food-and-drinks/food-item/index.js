/**
 * Internal dependencies.
 */
import metadata from './block.json';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';

/**
 * Block constants.
 */
const { name, category } = metadata;

const settings = {
	edit: () => null,
	parent: [],
	save: () => null,
	title: metadata.title,
	transforms: {
		to: [
			{
				blocks: [ 'core/column' ],
				transform: ( attributes, innerBlocks ) => {
					console.log( 'food and drink inner item', {
						attributes,
						innerBlocks,
					} );

					const paragraphBlock = createBlock(
						'core/paragraph',
						{
							content: attributes.title,
							placeholder: __( 'Add title…', 'coblocks' ),
						},
						[]
					);

					return createBlock( 'core/column', {}, [
						paragraphBlock,
					] );
				},
				type: 'block',
			},
		],
	},
};

export { name, category, metadata, settings };

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

					const titleBlock = createBlock(
						'core/group',
						{},
						[
							createBlock(
								'core/paragraph',
								{
									content: attributes.title,
									placeholder: __( 'Add title…', 'coblocks' ),
								},
								[]
							),
						]
					);

					const priceBlock = createBlock(
						'core/paragraph',
						{
							content: attributes.price,
							placeholder: __( '$0.99', 'coblocks' ),
						},
						[]
					);

					const descriptionBlock = createBlock(
						'core/paragraph',
						{
							content: attributes.description,
							placeholder: __( 'Add a description…', 'coblocks' ),
						},
						[]
					);

					return createBlock( 'core/column', {}, [
						titleBlock,
						priceBlock,
						descriptionBlock,
					] );
				},
				type: 'block',
			},
		],
	},
};

export { name, category, metadata, settings };

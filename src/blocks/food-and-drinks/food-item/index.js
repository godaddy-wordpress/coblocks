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
				transform: ( attributes ) => {
					const titleBlock = createBlock(
						'core/group',
						{},
						[
							createBlock(
								'core/heading',
								{
									content: attributes.title,
									level: attributes.headingLevel,
									placeholder: __( 'Add title…', 'coblocks' ),
									textAlign: 'center',
								},
								[]
							),
							...(
								// replace this with the correct icons
								attributes.spicy ? (
									[ createBlock(
										'coblocks/icon',
										{
											className: 'is-style-filled',
											contentAlign: 'center',
											height: '14px',
											width: '14px',
										}
									) ]
								) : []
							),
							...(
								// replace this with the correct icons
								attributes.popular ? (
									[ createBlock(
										'coblocks/icon',
										{
											className: 'is-style-filled',
											contentAlign: 'center',
											height: '14px',
											width: '14px',
										}
									) ]
								) : []
							),
							...(
								// replace this with the correct icons
								attributes.spicier ? (
									[ createBlock(
										'coblocks/icon',
										{
											className: 'is-style-filled',
											contentAlign: 'center',
											height: '14px',
											width: '14px',
										}
									) ]
								) : []
							),
							...(
								// replace this with the correct icons
								attributes.vegetarian ? (
									[ createBlock(
										'coblocks/icon',
										{
											className: 'is-style-filled',
											contentAlign: 'center',
											height: '14px',
											width: '14px',
										}
									) ]
								) : []
							),
							...(
								// replace this with the correct icons
								attributes.vegan ? (
									[ createBlock(
										'coblocks/icon',
										{
											className: 'is-style-filled',
											contentAlign: 'center',
											height: '14px',
											width: '14px',
										}
									) ]
								) : []
							),
						]
					);

					const priceBlock = createBlock(
						'core/paragraph',
						{
							align: 'center',
							content: attributes.price,
							placeholder: __( '$0.99', 'coblocks' ),
						},
						[]
					);

					const descriptionBlock = createBlock(
						'core/paragraph',
						{
							align: 'center',
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

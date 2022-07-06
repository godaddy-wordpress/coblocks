/**
 * Internal dependencies.
 */
import metadata from './block.json';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Block constants.
 */
const { name, category } = metadata;

const settings = {
	edit: () => null,
	parent: [ 'coblocks/food-and-drinks' ],
	save: () => <InnerBlocks.Content />,
	title: metadata.title,
	transforms: {
		to: [
			{
				blocks: [ 'core/column' ],
				transform: ( attributes ) => {
					const iconAttributes = {
						className: 'is-style-filled',
						contentAlign: 'center',
						customIconColor: 'inherit',
						height: 20,
						width: 20,
					};

					const titleBlock = createBlock(
						'core/columns',
						{},
						[
							createBlock(
								'core/column',
								{
									width: '80%',
								},
								[
									createBlock(
										'core/heading',
										{
											content: attributes.title,
											level: attributes.headingLevel,
											placeholder: __( 'Add title…', 'coblocks' ),
											textAlign: attributes.showImage ? 'left' : 'center',
										},
										[]
									),
								]
							),
							createBlock(
								'core/column',
								{
									verticalAlignment: 'center',
									width: '20%',
								},
								[
									createBlock(
										'core/group',
										{
											layout: {
												flexWrap: 'nowrap',
												inherit: false,
												type: 'flex',
											},
										},
										[
											...(
												attributes.popular ? (
													[ createBlock(
														'coblocks/icon',
														{
															icon: 'star',
															...iconAttributes,
														}
													) ]
												) : []
											),
											...(
												attributes.spicy ? (
													[ createBlock(
														'coblocks/icon',
														{
															icon: 'spicy',
															...iconAttributes,
														}
													) ]
												) : []
											),
											...(
												attributes.spicier ? (
													[ createBlock(
														'coblocks/icon',
														{
															icon: 'spicy',
															...iconAttributes,
														}
													) ]
												) : []
											),
											...(
												attributes.vegetarian ? (
													[ createBlock(
														'coblocks/icon',
														{
															icon: 'vegetarian',
															...iconAttributes,
														}
													) ]
												) : []
											),
											...(
												attributes.vegan ? (
													[ createBlock(
														'coblocks/icon',
														{
															icon: 'vegan',
															...iconAttributes,
														}
													) ]
												) : []
											),
											...(
												attributes.glutenFree ? (
													[ createBlock(
														'coblocks/icon',
														{
															icon: 'gluten_free',
															...iconAttributes,
														}
													) ]
												) : []
											),
											...(
												attributes.pescatarian ? (
													[ createBlock(
														'coblocks/icon',
														{
															icon: 'fish',
															...iconAttributes,
														}
													) ]
												) : []
											),
											...(
												attributes.vegan ? (
													[ createBlock(
														'coblocks/icon',
														{
															icon: 'vegan',
															...iconAttributes,
														}
													) ]
												) : []
											),
										]
									),
								]
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

					if ( attributes.list === true ) {
						return createBlock(
							'core/column',
							{},
							[
								createBlock( 'core/columns', {}, [
									...(
										attributes.showImage ? (
											[
												createBlock(
													'core/column',
													{
														width: '20%',
													},
													[
														createBlock(
															'core/image',
															{
																url: attributes.url,
															}
														),
													]
												),
											]
										) : []
									),
									createBlock(
										'core/column',
										{
											width: attributes.showImage ? '80%' : '100%',
										},
										[
											createBlock(
												'core/group',
												{},
												[
													titleBlock,
													priceBlock,
												]
											),
											descriptionBlock,
										]
									),
								] ),
							]
						);
					}

					return createBlock( 'core/column', {}, [
						...(
							attributes.showImage ? (
								[ createBlock(
									'core/image',
									{
										url: attributes.url,
									}
								) ]
							) : []
						),
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

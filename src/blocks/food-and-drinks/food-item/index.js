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
	parent: [ 'coblocks/food-and-drinks' ],
	save: () => null,
	title: metadata.title,
	transforms: {
		to: [
			{
				blocks: [ 'core/column' ],
				transform: ( attributes ) => {
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
															className: 'is-style-filled',
															contentAlign: 'center',
															customIconColor: 'inherit',
															height: '14px',
															icon: 'star',
															width: '14px',
														}
													) ]
												) : []
											),
											...(
												attributes.spicy ? (
													[ createBlock(
														'coblocks/icon',
														{
															className: 'is-style-filled',
															contentAlign: 'center',
															customIconColor: 'inherit',
															height: '14px',
															icon: 'spicy',
															width: '14px',
														}
													) ]
												) : []
											),
											...(
												attributes.spicier ? (
													[ createBlock(
														'coblocks/icon',
														{
															className: 'is-style-filled',
															contentAlign: 'center',
															customIconColor: 'inherit',
															height: '14px',
															icon: 'spicy',
															width: '14px',
														}
													) ]
												) : []
											),
											...(
												attributes.vegetarian ? (
													[ createBlock(
														'coblocks/icon',
														{
															className: 'is-style-filled',
															contentAlign: 'center',
															customIconColor: 'inherit',
															height: '14px',
															icon: 'vegetarian',
															width: '14px',
														}
													) ]
												) : []
											),
											...(
												attributes.vegan ? (
													[ createBlock(
														'coblocks/icon',
														{
															className: 'is-style-filled',
															contentAlign: 'center',
															customIconColor: 'inherit',
															height: '14px',
															icon: 'vegan',
															width: '14px',
														}
													) ]
												) : []
											),
											...(
												attributes.glutenFree ? (
													[ createBlock(
														'coblocks/icon',
														{
															className: 'is-style-filled',
															contentAlign: 'center',
															customIconColor: 'inherit',
															height: '14px',
															icon: 'gluten_free',
															width: '14px',
														}
													) ]
												) : []
											),
											...(
												attributes.pescatarian ? (
													[ createBlock(
														'coblocks/icon',
														{
															className: 'is-style-filled',
															contentAlign: 'center',
															customIconColor: 'inherit',
															height: '14px',
															icon: 'fish',
															width: '14px',
														}
													) ]
												) : []
											),
											...(
												attributes.vegan ? (
													[ createBlock(
														'coblocks/icon',
														{
															className: 'is-style-filled',
															contentAlign: 'center',
															customIconColor: 'inherit',
															height: '14px',
															icon: 'vegan',
															width: '14px',
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
							align: attributes.showImage ? 'left' : 'center',
							content: attributes.price,
							placeholder: __( '$0.99', 'coblocks' ),
						},
						[]
					);

					const descriptionBlock = createBlock(
						'core/paragraph',
						{
							align: attributes.showImage ? 'left' : 'center',
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

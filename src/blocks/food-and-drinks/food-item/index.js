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
											textAlign: 'center',
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

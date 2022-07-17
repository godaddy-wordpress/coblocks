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
						iconSize: 'advanced',
						width: 20,
					};

					const createTitleBlock = ( { titleTextAlign = 'center' } ) => {
						return createBlock(
							'core/group',
							{
								layout: {
									flexWrap: 'nowrap',
									justifyContent: 'center',
									type: 'flex',
								},
								style: {
									spacing: {
										blockGap: '10px',
									},
								},
							},
							[
								createBlock(
									'core/heading',
									{
										content: attributes.title,
										level: attributes.headingLevel,
										placeholder: __( 'Add title…', 'coblocks' ),
										textAlign: titleTextAlign,
									},
									[]
								),
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
						);
					};

					if ( attributes.list === true ) {
						return createBlock(
							'core/column',
							{},
							[
								createBlock(
									'core/group',
									{
										layout: {
											flexWrap: 'nowrap',
											justifyContent: 'center',
											type: 'flex',
										},
									},
									[
										...(
											attributes.showImage ? (
												[
													createBlock(
														'core/image',
														{
															url: attributes.url,
														}
													),
												]
											) : []
										),
										createBlock(
											'core/group',
											{},
											[
												createBlock(
													'core/group',
													{
														layout: {
															flexWrap: 'nowrap',
															justifyContent: 'center',
															type: 'flex',
														},
													},
													[
														createTitleBlock( {
															titleTextAlign: 'left',
														} ),
														createBlock(
															'core/paragraph',
															{
																align: 'center',
																content: attributes.price,
																placeholder: __( '$0.99', 'coblocks' ),
															},
															[]
														),
													]
												),
												createBlock(
													'core/paragraph',
													{
														align: 'left',
														content: attributes.description,
														placeholder: __( 'Add a description…', 'coblocks' ),
													},
													[]
												),
											]
										),
									],
								),
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
						createTitleBlock( {
							titleTextAlign: attributes.showImage ? 'left' : 'center',
						} ),
						createBlock(
							'core/paragraph',
							{
								align: 'center',
								content: attributes.price,
								placeholder: __( '$0.99', 'coblocks' ),
							},
							[]
						),
						createBlock(
							'core/paragraph',
							{
								align: 'center',
								content: attributes.description,
								placeholder: __( 'Add a description…', 'coblocks' ),
							},
							[]
						),
					] );
				},
				type: 'block',
			},
		],
	},
};

export { name, category, metadata, settings };

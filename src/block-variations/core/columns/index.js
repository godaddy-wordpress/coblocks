/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockVariation } from '@wordpress/blocks';

/**
 * External dependencies
 */
import { AuthorIcon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import { setIconColorProps } from '../../../utils/helper';

const icon = setIconColorProps( AuthorIcon );

export const BLOCK_VARIATION_COLUMNS_AUTHOR_LAYOUT = {
	attributes: {
		style: {
			spacing: {
				padding: {
					bottom: '2.5rem',
					left: '2.5rem',
					right: '2.5rem',
					top: '2.5rem',
				},
			},
		},
	},
	/* translators: block variation description */
	description: __( 'Blocks layout representing an author block.', 'coblocks' ),
	example: {
		attributes: {},
		innerBlocks: [
			{
				attributes: { width: '25%' },
				innerBlocks: [
					{
						attributes: { url: 'https://s.w.org/images/core/5.3/Sediment_off_the_Yucatan_Peninsula.jpg' },
						innerBlocks: [],
						name: 'core/image',
					},
				],
				name: 'core/column',
			},
			{
				attributes: { width: '75%' },
				innerBlocks: [
					{
						/* translators: placeholder used in block example. */
						attributes: { content: __( 'Author Name', 'coblocks' ) },
						innerBlocks: [],
						name: 'core/heading',
					},
					{
						/* translators: placeholder used in block example. */
						attributes: { content: __( 'Author Biography', 'coblocks' ) },
						innerBlocks: [],
						name: 'core/paragraph',
					},
					{
						attributes: {},
						innerBlocks: [
							{
								/* translators: placeholder used in block example. */
								attributes: {
									style: { color: {
										background: '#000000',
										text: '#FFFFFF',
									} },
									text: __( 'Author Link', 'coblocks' ),
								},
								innerBlocks: [],
								name: 'core/button',
							},
						],
						name: 'core/buttons',
					},
				],
				name: 'core/column',
			},
		],
		name: 'core/columns',
	},
	icon,
	innerBlocks: [
		[ 'core/column', { width: '25%' }, [
			[ 'core/image', {} ],
		] ],
		[ 'core/column', { width: '75%' }, [
			[ 'core/heading', { placeholder: __( 'Author name', 'coblocks' ) } ],
			[ 'core/paragraph', { placeholder: __( 'Author bio', 'coblocks' ) } ],
			[ 'core/buttons', {}, [
				[ 'core/button', { placeholder: __( 'Author link', 'coblocks' ) }, [] ],
			] ],

		] ],
	],
	keywords: [ 'coblocks' ],
	name: 'author-layout',
	/* translators: block variation name */
	title: __( 'Author Block', 'coblocks' ),
};

[
	BLOCK_VARIATION_COLUMNS_AUTHOR_LAYOUT,
].forEach( ( variation ) => registerBlockVariation( 'core/columns', variation ) );

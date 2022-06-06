/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { createBlock, switchToBlockType } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Block constants
 */
const { name, category } = metadata;

const FEATURE_TEMPLATE = [
	[
		'coblocks/icon',
		{
			contentAlign: 'center',
		},
	],
	[
		'core/heading',
		{
			/* translators: content placeholder */
			content: __( 'Feature Title', 'coblocks' ),
			level: 4,
			/* translators: content placeholder */
			placeholder: __( 'Add feature title…', 'coblocks' ),
			textAlign: 'center',
		},
	],
	[
		'core/paragraph',
		{
			align: 'center',
			/* translators: content placeholder */
			content: __( 'This is a feature block that you can use to highlight features.', 'coblocks' ),
			/* translators: content placeholder */
			placeholder: __( 'Add feature content', 'coblocks' ),
		},
	],
];

const templateContainer = [
	FEATURE_TEMPLATE,
	FEATURE_TEMPLATE,
];

function Edit( { clientId } ) {
	const { replaceBlocks } = useDispatch( 'core/block-editor' );
	const { getBlock } = useSelect( ( select ) => select( 'core/block-editor' ) );

	const currentBlock = getBlock( clientId );

	if ( ! currentBlock ) {
		return null;
	}

	replaceBlocks(
		[ clientId ],
		switchToBlockType( currentBlock, 'core/columns' )
	);

	return null;
}

const settings = {
	edit: Edit,
	save: () => <InnerBlocks.Content />,
	title: __( 'Features', 'coblocks' ),
	transforms: {
		to: [
			{
				blocks: [ 'core/columns' ],
				transform: () => {
					return createBlock(
						'core/columns',
						{},
						templateContainer.map( ( innerBlock ) => {
							return createBlock(
								'core/column',
								{},
								innerBlock.map( ( block ) => {
									return createBlock(
										...block
									);
								} )
							);
						} )
					);
				},
				type: 'block',
			},
		],
	},
};

export { name, category, metadata, settings };

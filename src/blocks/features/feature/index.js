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

const TEMPLATE = [
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

function Edit( { clientId } ) {
	const { replaceBlocks } = useDispatch( 'core/block-editor' );
	const { getBlock } = useSelect( ( select ) => select( 'core/block-editor' ) );

	const currentBlock = getBlock( clientId );

	if ( ! currentBlock ) {
		return null;
	}

	replaceBlocks(
		[ clientId ],
		switchToBlockType( currentBlock, 'core/column' )
	);

	return null;
}

// function renderTemplate(attributes) {
// 	return [

// 	]
// }

const settings = {
	edit: Edit,
	parent: [ 'coblocks/features' ],
	save: () => <InnerBlocks.Content />,
	supports: {
		inserter: false,
	},
	title: __( 'Feature', 'coblocks' ),
	transforms: {
		to: [
			{
				blocks: [ 'core/column' ],
				transform: ( attributes, innerBlocks ) => {
					// return <InnerBlocks template={ TEMPLATE } />;
					return createBlock(
						'core/column',
						{},
						innerBlocks.innerBlocks
					);
				},
				type: 'block',
			},
		],
	},
};

export { name, category, metadata, settings };

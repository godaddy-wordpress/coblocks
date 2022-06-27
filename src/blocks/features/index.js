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

const migrateExisting = ( parentAttributes, innerBlocks ) => {
	return innerBlocks.map( ( innerBlock ) => {
		return createBlock(
			'core/column',
			{
				allowedBlocks: [ 'core/paragraph' ],
			},
			innerBlock.innerBlocks.map( ( block ) => {
				const blockAttributes = {
					...block.attributes,
				};

				if ( block.name === 'core/heading' ) {
					blockAttributes.textAlign = parentAttributes.contentAlign;
				}

				if ( block.name === 'core/paragraph' ) {
					blockAttributes.align = parentAttributes.contentAlign;
				}

				if ( block.name === 'coblocks/icon' ) {
					blockAttributes.contentAlign = parentAttributes.contentAlign;
				}

				return createBlock(
					block.name,
					blockAttributes
				);
			} )
		);
	} );
};

const createNewMigration = () => {
	return templateContainer.map( ( innerBlock ) => {
		return createBlock(
			'core/column',
			{
				allowedBlocks: [ 'core/paragraph', 'core/heading', 'coblocks/icon' ],
			},
			innerBlock.map( ( block ) => {
				return createBlock(
					...block,
				);
			} )
		);
	} );
};

const settings = {
	edit: Edit,
	save: () => <InnerBlocks.Content />,
	title: __( 'Features', 'coblocks' ),
	transforms: {
		to: [
			{
				blocks: [ 'core/columns' ],
				transform: ( attributes, innerBlocks ) => {
					return createBlock(
						'core/columns',
						{
							align: attributes.align,
							className: attributes.className,
							template: [ FEATURE_TEMPLATE ],
							templateLock: 'all',
						},
						innerBlocks.length > 0 ? migrateExisting( attributes, innerBlocks ) : createNewMigration()
					);
				},
				type: 'block',
			},
		],
	},
};

export { name, category, metadata, settings };

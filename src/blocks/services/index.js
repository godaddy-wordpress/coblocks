/**
 * External dependencies
 */
import { ServicesIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies.
 */
import deprecated from './deprecated';
import edit from './edit';
import example from './example';
import metadata from './block.json';
import save from './save';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';
import { InnerBlocks } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock, switchToBlockType } from '@wordpress/blocks';

/**
 * Block constants.
 */
const { name, category, attributes } = metadata;

function Edit( { clientId } ) {
	const { replaceBlocks } = useDispatch( 'core/block-editor' );
	const { getBlock } = useSelect( ( select ) => select( 'core/block-editor' ) );

	const currentBlock = getBlock( clientId );

	if ( ! currentBlock ) {
		return null;
	}

	console.log( 'currentBlock', currentBlock );

	replaceBlocks(
		[ clientId ],
		switchToBlockType( currentBlock, 'core/columns' )
	);

	return null;
}

const settings = {
	/* translators: block name */
	title: __( 'Services', 'coblocks' ),
	/* translators: block description */
	description: __( 'Add up to four columns of services to display.', 'coblocks' ),
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'features', 'coblocks' ),
	],
	edit: Edit,
	save: () => <InnerBlocks.Content />,

	transforms: {
		to: [
			{
				blocks: [ 'core/columns' ],
				transform: ( attributes, innerBlocks ) => {
					return createBlock(
						'core/columns',
						{},
						[]
					);
				},
				type: 'block',
			},
		],
	},
};

export { name, category, metadata, settings };

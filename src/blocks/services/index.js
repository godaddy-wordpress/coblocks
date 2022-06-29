/**
 * External dependencies
 */
import { ServicesIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies.
 */
import metadata from './block.json';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';
import { InnerBlocks } from '@wordpress/block-editor';
import { createBlock, switchToBlockType } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Block constants.
 */
const { name, category } = metadata;

const SERVICE_TEMPLATE = [
	[
		'core/image',
		{
			align: 'full',
			allowResize: false,
			alt: '',
			className: 'is-style-service',
		},
	],
	[
		'core/heading',
		{
			/* translators: content placeholder */
			content: __( '', 'coblocks' ),
			level: 4,
			/* translators: content placeholder */
			placeholder: __( 'Write title…', 'coblocks' ),
			textAlign: 'center',
		},
	],
	[
		'core/paragraph',
		{
			align: 'center',
			/* translators: content placeholder */
			content: __( '', 'coblocks' ),
			/* translators: content placeholder */
			placeholder: __( 'Write description…', 'coblocks' ),
		},
	],
];

const templateContainer = [
	SERVICE_TEMPLATE,
	SERVICE_TEMPLATE,
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

const formatColumns = ( innerBlocks, columnAmount ) => {
	const formattedInnerBlocks = [ ...innerBlocks ];
	const formattedServiceBlocks = [];
	const parsedColumnAmount = parseInt( columnAmount );

	// format the total list of inner blocks to match the total column amount for each row
	// if one row has less than the column amount, add empty Service block patterns to match
	// the previous columns blocks.
	let serviceRow = [];

	while ( formattedInnerBlocks.length > 0 ) {
		serviceRow = formattedInnerBlocks.splice( 0, parsedColumnAmount );

		formattedServiceBlocks.push( serviceRow );
	}

	const allRowsMatchLength = formattedServiceBlocks.every( ( col ) => col.length === parsedColumnAmount );

	if ( ! allRowsMatchLength ) {
		const arrayIndexToAlter = formattedServiceBlocks.findIndex( ( row ) => row.length < parsedColumnAmount );

		if ( arrayIndexToAlter !== -1 ) {
			const lenCurrRow = formattedServiceBlocks[ arrayIndexToAlter ].length;

			for ( let j = lenCurrRow; j < parsedColumnAmount; j++ ) {
				formattedServiceBlocks[ arrayIndexToAlter ].push(
					createBlock(
						'coblocks/service',
						{},
						[
							createBlock( 'core/heading', {
								placeholder: __( 'Write title…', 'coblocks' ),
							} ),
							createBlock( 'core/paragraph', {
								placeholder: __( 'Write description…', 'coblocks' ),
							} ),
						]
					)
				);
			}
		}
	}

	return formattedServiceBlocks;
};

const settings = {
	/* translators: block description */
	description: __( 'Add up to four columns of services to display.', 'coblocks' ),
	edit: Edit,
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'features', 'coblocks' ),
	],
	save: () => <InnerBlocks.Content />,
	/* translators: block name */
	title: __( 'Services', 'coblocks' ),
	transforms: {
		to: [
			{
				blocks: [ 'core/columns' ],
				transform: ( attributes, innerBlocks ) => {
					if ( innerBlocks.length === 0 ) {
						return createBlock(
							'core/columns',
							{
								align: attributes.align,
								className: attributes.className,
							},
							templateContainer.map( ( innerBlock ) => (
								createBlock(
									'core/column',
									{},
									innerBlock.map( ( block ) => (
										createBlock(
											...block,
										)
									) )
								)
							) )
						);
					}

					const formattedColumns = formatColumns( innerBlocks, attributes.columns );

					return formattedColumns.map( ( columns ) => {
						return createBlock(
							'core/columns',
							{
								align: attributes.align,
								className: attributes.className,
							},
							columns.map( ( innerBlock ) => switchToBlockType( innerBlock, 'core/column' ) ).flat()
						);
					} );
				},
				type: 'block',
			},
		],
	},
};

export { name, category, metadata, settings };

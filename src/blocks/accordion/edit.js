/**
 * External dependencies
 */
import Inspector from './inspector';
import memoize from 'memize';
import times from 'lodash/times';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks'; 
import { Fragment } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { Button, Tooltip } from '@wordpress/components';
import { Icon, plus } from '@wordpress/icons';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Allowed blocks and template constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change. HEAD
 * The array should contain the name of each block that is allowed.
 * In standout block, the only block we allow is 'core/list'.
 *
 * @constant
 * @type {string[]}
 */
const ALLOWED_BLOCKS = [ 'coblocks/accordion-item' ];

/**
 * Returns the layouts configuration for a given number of accordion items.
 *
 * @param {number} count Number of accordion items.
 * @return {Object[]} Columns layout configuration.
 */
const getCount = memoize( ( count ) => {
	return times( count, () => [ 'coblocks/accordion-item' ] );
} );

/**
 * Block edit function
 *
 * @param {Object} props for the component
 */
const AccordionEdit = ( props ) => {
	const {
		clientId,
		attributes,
		className,
	} = props;

	const { insertBlock } = useDispatch( 'core/block-editor' );

	const {
		getBlocksByClientId,
		getBlockHierarchyRootClientId,
		getSelectedBlockClientId,
		getBlockAttributes,
		isSelected,
	} = useSelect( ( select ) => select( 'core/block-editor' ), [] );

	// Get clientID of the parent block.
	const rootClientId = getBlockHierarchyRootClientId( clientId );
	const selectedRootClientId = getBlockHierarchyRootClientId( getSelectedBlockClientId() );
	const isBlockSelected = isSelected || rootClientId === selectedRootClientId;

	const {
		count,
	} = attributes;

	const items = getBlocksByClientId( clientId );

	const handleEvent = ( ) => {
		if ( items[ 0 ].innerBlocks ) {
			const lastId = items[ 0 ].innerBlocks[ items[ 0 ].innerBlocks.length - 1 ].clientId;
			let copyAttributes = {};

			if ( lastId ) {
				const lastBlockClient = getBlockAttributes( lastId );
				if ( lastBlockClient.backgroundColor ) {
					copyAttributes = Object.assign( copyAttributes, {
						backgroundColor: lastBlockClient.backgroundColor,
					} );
				}

				if ( lastBlockClient.borderColor ) {
					copyAttributes = Object.assign( copyAttributes, {
						borderColor: lastBlockClient.borderColor,
					} );
				}

				if ( lastBlockClient.textColor ) {
					copyAttributes = Object.assign( copyAttributes, {
						textColor: lastBlockClient.textColor,
					} );
				}

				if ( lastBlockClient.customTextColor ) {
					copyAttributes = Object.assign( copyAttributes, {
						customTextColor: lastBlockClient.customTextColor,
					} );
				}
			}

			const created = createBlock( 'coblocks/accordion-item', copyAttributes );
			insertBlock( created, undefined, clientId );
		}
	};

	return (
		<Fragment>
			{ isBlockSelected && (
				<Inspector
					insertBlock={ insertBlock }
					{ ...props }
				/>
			) }
			<div className={ className }>
				<InnerBlocks
					__experimentalCaptureToolbars={ true }
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ getCount( count ) }
				/>
				{ isBlockSelected && (
					<div className="coblocks-block-appender">
						<Tooltip text={ __( 'Add accordion item', 'coblocks' ) }>
							<Button
								className="block-editor-button-block-appender"
								label={ __( 'Add accordion item', 'coblocks' ) }
								onMouseDown={ handleEvent }
							>
								<Icon icon={ plus } />
							</Button>
						</Tooltip>
					</div>
				) }
			</div>
		</Fragment>
	);
};

export default AccordionEdit;

/**
 * External dependencies
 */
import classnames from 'classnames';
import dropRight from 'lodash/dropRight';
import memoize from 'memize';
import times from 'lodash/times';

/**
 * Internal dependencies
 */
import Controls from './controls';
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { withDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

/**
 * Allowed blocks and template constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 *
 * @constant
 * @type {string[]}
 */
const ALLOWED_BLOCKS = [ 'coblocks/pricing-table-item' ];

/**
 * Returns the layouts configuration for a given number of items.
 *
 * @param {number} count Number of pricing table items.
 * @return {Object[]} Tables layout configuration.
 */
const getCount = memoize( ( count ) => {
	return times( count, ( index ) => [ 'coblocks/pricing-table-item', { placeholder: sprintf(
		/* translators: %d: a digit 1-3 */
		__( 'Plan %d', 'coblocks' ),
		parseInt( index + 1 )
	) } ] );
} );

/**
 * Block edit function
 *
 * @param {Object} props
 */
const PricingTableEdit = ( props ) => {
	const {
		attributes,
		className,
		isSelected,
	} = props;

	const {
		count,
		contentAlign,
	} = attributes;

	const classes = classnames(
		className,
		{
			[ `has-text-align-${ contentAlign }` ]: contentAlign,
		}
	);

	return (
		<>
			{ isSelected && (
				<Controls
					{ ...props }
				/>
			) }
			{ isSelected && (
				<Inspector
					{ ...props }
				/>
			) }
			<div
				className={ classes }
			>
				<GutterWrapper { ...attributes }>
					<div className={ classnames( 'wp-block-coblocks-pricing-table__inner',
						{
							'has-columns': count > 1,
							[ `has-${ count }-columns` ]: count,
							'has-responsive-columns': count > 1,
						}
					) }>
						<InnerBlocks
							template={ getCount( count ) }
							allowedBlocks={ ALLOWED_BLOCKS }
							orientation={ count > 1 ? 'horizontal' : 'vertical' }
							__experimentalCaptureToolbars={ true } />
					</div>
				</GutterWrapper>
			</div>
		</>
	);
};

export default withDispatch( ( dispatch, ownProps, registry ) => ( {

	/**
	 * Updates the table count, including necessary revisions to child Pricing Table Item blocks
	 *
	 * @param {number} previousTables Previous table count.
	 * @param {number} newTables      New table count.
	 */
	updateTables( previousTables, newTables ) {
		const { clientId } = ownProps;
		const { replaceInnerBlocks } = dispatch( 'core/block-editor' );
		const { getBlocks } = registry.select( 'core/block-editor' );

		let innerBlocks = getBlocks( clientId );

		const isAddingTable = newTables > previousTables;

		if ( isAddingTable ) {
			innerBlocks = [
				...innerBlocks,
				...times( newTables - previousTables, () => {
					return createBlock( 'coblocks/pricing-table-item', { placeholder:
						/* translators: %d is a placeholder for the nth plan number ( eg. Plan 1, Plan 2 )*/
						sprintf( __( 'Plan %d', 'coblocks' ), parseInt( newTables ) ),
					} );
				} ),
			];
		} else {
			// The removed table will be the last of the inner blocks.
			innerBlocks = dropRight( innerBlocks, previousTables - newTables );
		}

		replaceInnerBlocks( clientId, innerBlocks, false );
	},
} ) )( PricingTableEdit );

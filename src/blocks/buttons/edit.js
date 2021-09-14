/**
 * External dependencies
 */
import classnames from 'classnames';
import memoize from 'memize';
import times from 'lodash/times';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Controls from './controls';

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
import { createBlock, getBlockType } from '@wordpress/blocks';
import { select, dispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

/**
 * Constants
 */
const ALLOWED_BLOCKS = [ 'core/button' ];

/**
 * Returns the layouts configuration for a given number of feature items.
 *
 * @param {number} count Number of feature items.
 *
 * @return {Object[]} Columns layout configuration.
 */
const getCount = memoize( ( count ) => {
	return times( count, () => [ 'core/button' ] );
} );

const ButtonsEdit = ( props ) => {
	useEffect( () => {
		const { clientId } = props;
		if ( ! getBlockType( 'core/buttons' ) ) {
			return;
		}
		const thisBlock = select( 'core/block-editor' ).getBlock( clientId );
		const coreButtons = createBlock( 'core/buttons', { align: thisBlock.attributes.contentAlign }, thisBlock.innerBlocks );
		dispatch( 'core/block-editor' ).replaceBlock( clientId, coreButtons );
	}, [] );

	const {
		attributes,
		className,
		isSelected,
	} = props;

	const {
		items,
		contentAlign,
		isStackedOnMobile,
	} = attributes;

	const classes = classnames(
		'wp-block-coblocks-buttons__inner', {
			[ `flex-align-${ contentAlign }` ]: contentAlign,
			'is-stacked-on-mobile': isStackedOnMobile,
		}
	);

	return (
		<>
			{ isSelected && (
				<Inspector
					{ ...props }
				/>
			) }
			{ isSelected && (
				<Controls
					{ ...props }
				/>
			) }
			<div className={ className }>
				<div className={ classes }>
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ getCount( items ) }
						templateLock="all"
						templateInsertUpdatesSelection={ false }
					/>
				</div>
			</div>
		</>
	);
};

export default ButtonsEdit;

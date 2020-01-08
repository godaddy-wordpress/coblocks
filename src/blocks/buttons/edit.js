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
import { Component, Fragment } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

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

class ButtonsEdit extends Component {
	render() {
		const {
			attributes,
			className,
			isSelected,
			clientId,
		} = this.props;

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

		if ( wp.data.select( 'core/block-editor' ).canInsertBlockType( 'core/buttons', clientId ) ) {
			const thisBlock = wp.data.select( 'core/block-editor' ).getBlocksByClientId( clientId )[ 0 ];
			const coreButtons = createBlock( 'core/buttons', { align: thisBlock.attributes.contentAlign }, thisBlock.innerBlocks );
			wp.data.dispatch( 'core/block-editor' ).replaceBlocks( clientId, coreButtons );
		}

		return (
			<Fragment>
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				{ isSelected && (
					<Controls
						{ ...this.props }
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
			</Fragment>
		);
	}
}

export default ButtonsEdit;

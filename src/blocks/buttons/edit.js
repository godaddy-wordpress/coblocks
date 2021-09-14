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
import { createBlock, getBlockType } from '@wordpress/blocks';
import { select, dispatch } from '@wordpress/data';

/**
 * Constants
 */
const ALLOWED_BLOCKS = [ 'core/button' ];

/**
 * Returns the layouts configuration for a given number of feature items.
 *
 * @param {number} count Number of feature items.
 * @return {Object[]} Columns layout configuration.
 */
const getCount = memoize( ( count ) => {
	return times( count, () => [ 'core/button' ] );
} );

class ButtonsEdit extends Component {
	componentDidMount() {
		const { clientId } = this.props;
		if ( ! getBlockType( 'core/buttons' ) ) {
			return;
		}
		const thisBlock = select( 'core/block-editor' ).getBlock( clientId );
		const coreButtons = createBlock( 'core/buttons', { align: thisBlock.attributes.contentAlign }, thisBlock.innerBlocks );
		dispatch( 'core/block-editor' ).replaceBlock( clientId, coreButtons );
	}

	render() {
		const {
			attributes,
			className,
			isSelected,
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

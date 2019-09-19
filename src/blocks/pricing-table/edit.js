/**
 * External dependencies
 */
import times from 'lodash/times';
import classnames from 'classnames';
import memoize from 'memize';

/**
 * Internal dependencies
 */
import Controls from './controls';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InnerBlocks } = wp.blockEditor;

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
 *
 * @return {Object[]} Columns layout configuration.
 */
const getCount = memoize( ( count ) => {
	/* translators: %d: a digit 1-3 */
	return times( count, ( index ) => [ 'coblocks/pricing-table-item', { placeholder: sprintf( __( 'Plan %d' ), parseInt( index + 1 ) ) } ] );
} );

/**
 * Block edit function
 */
class Edit extends Component {
	render() {
		const {
			attributes,
			className,
			isSelected,
		} = this.props;

		const {
			count,
			contentAlign,
		} = attributes;

		const classes = classnames(
			className,
			`has-${ count }-columns`,
			`has-${ contentAlign }-content`,
		);

		return (
			<Fragment>
				{ isSelected && (
					<Controls
						{ ...this.props }
					/>
				) }
				<div
					className={ classes }
					style={ { textAlign: contentAlign } }
				>
					<div className={ `${ className }__inner` }>
						<InnerBlocks
							template={ getCount( count ) }
							templateLock="all"
							allowedBlocks={ ALLOWED_BLOCKS } />
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Edit;

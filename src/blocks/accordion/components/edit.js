/**
 * External dependencies
 */
import times from 'lodash/times';
import classnames from 'classnames';
import memoize from 'memize';

/**
 * Internal dependencies
 */
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InnerBlocks } = wp.editor;

/**
 * Allowed blocks and template constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
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
 *
 * @return {Object[]} Columns layout configuration.
 */
const getCount = memoize( ( count ) => {
	return times( count, () => [ 'coblocks/accordion-item' ] );
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
			setAttributes,
		} = this.props;

		const {
			count,
			contentAlign,
		} = attributes;

		return [
			<Fragment>
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				<div className={ className }>
					<InnerBlocks
						template={ getCount( count ) }
						allowedBlocks={ ALLOWED_BLOCKS } />
				</div>
			</Fragment>
		];
	}
}

export default Edit;

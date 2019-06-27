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
const { __, _x } = wp.i18n;
const { compose } = wp.compose;
const { Component, Fragment } = wp.element;
const { InnerBlocks } = wp.blockEditor;
const { Spinner } = wp.components;

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

/**
 * Block edit function
 */
class Edit extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			className,
			isSelected,
			setAttributes,
		} = this.props;

		const {
			gutter,
			items,
			stacked,
			contentAlign,
			isStackedOnMobile,
		} = attributes;

		const classes = classnames(
			className, {
			}
		);

		const innerClasses = classnames(
			'wp-block-coblocks-buttons__inner',{
				[ `flex-align-${ contentAlign }` ] : contentAlign,
				[ `has-${ gutter }-gutter` ] : gutter,
				'is-stacked': stacked,
				'is-stacked-on-mobile': isStackedOnMobile,
			}
		);

		return [
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
				<div className={ classes }>
					<div className={ innerClasses }>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ getCount( items ) }
							templateLock="all"
							templateInsertUpdatesSelection={ false }
						/>
					</div>
				</div>
			</Fragment>
		];
	}
}

export default compose( [
	// applyWithColors,
] )( Edit );

/**
 * External dependencies
 */
import classnames from 'classnames';
import times from 'lodash/times';
import memoize from 'lodash/memoize';

/**
 * Internal dependencies
 */
import Controls from './controls';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;
const { compose } = wp.compose;
const { Component, Fragment } = wp.element;
const { InnerBlocks } = wp.editor;
const { Spinner } = wp.components;

/**
 * Constants
 */
const ALLOWED_BLOCKS = [ 'core/button', 'core/paragraph', 'core/heading', 'core/image', 'coblocks/highlight', ];

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
			contentAlign,
		} = attributes;

		const classes = classnames(
			className, {
			}
		);

		const innerClasses = classnames(
			'wp-block-coblocks-buttons__inner',{
				[ `flex-align-${ contentAlign }` ] : contentAlign,
			}
		);

		const innerStyles = {
			// textAlign: contentAlign ? contentAlign : undefined
		};

		return [
			<Fragment>
				{ isSelected && (
					<Controls
						{ ...this.props }
					/>
				) }
				<div className={ classes }>
					<div className={ innerClasses } style={ innerStyles }>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ getCount( items ) }
							templateLock={ false }
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

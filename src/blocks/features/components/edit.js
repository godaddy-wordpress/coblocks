/**
 * External dependencies
 */
import classnames from 'classnames';
import memoize from 'memize';
import times from 'lodash/times';

/**
 * Internal dependencies
 */
import BackgroundImagePanel, { BackgroundClasses, BackgroundImageDropZone } from '../../../components/background';
import applyWithColors from './colors';
import Inspector from './inspector';
import Controls from './controls';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { RichText, InnerBlocks } = wp.editor;

/**
 * Constants
 */
const ALLOWED_BLOCKS = [ 'coblocks/feature' ];

/**
 * Returns the layouts configuration for a given number of feature items.
 *
 * @param {number} count Number of feature items.
 *
 * @return {Object[]} Columns layout configuration.
 */
const getCount = memoize( ( count ) => {
	return times( count, () => [ 'coblocks/feature' ] );
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
			backgroundColor,
			className,
			isSelected,
			setAttributes,
		} = this.props;

		const {
			backgroundImg,
			columns,
			contentAlign,
		} = attributes;

		const dropZone = (
			<BackgroundImageDropZone
				{ ...this.props }
				// translators: %s: Lowercase block title
				label={ __( 'Add backround image' ) }
			/>
		);

		return [
			<Fragment>
				{ dropZone }
				{ isSelected && (
					<Controls
						{ ...this.props }
					/>
				) }
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				<div
					className={ classnames(
						className,
						`has-${ columns }-columns`,
						...BackgroundClasses( attributes ), {
							'has-background': backgroundColor.color,
							[ backgroundColor.class ]: backgroundColor.class,
						}
					) }
					style={ {
						backgroundColor: backgroundColor.color,
						backgroundImage: backgroundImg ? `url(${ backgroundImg })` : undefined,
						textAlign: contentAlign,
					} }
				>
					<InnerBlocks
						template={ getCount( columns ) }
						allowedBlocks={ ALLOWED_BLOCKS }
						templateLock="all"
					/>
				</div>
			</Fragment>
		];
	}
}

export default compose( [
	applyWithColors,
] )( Edit );

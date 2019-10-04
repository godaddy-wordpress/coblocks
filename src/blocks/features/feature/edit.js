/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Controls from './controls';
import { BackgroundStyles, BackgroundClasses, BackgroundVideo, BackgroundDropZone } from '../../../components/background';
import applyWithColors from './colors';
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;
const { compose } = wp.compose;
const { Component, Fragment } = wp.element;
const { InnerBlocks } = wp.blockEditor;
const { Spinner } = wp.components;
const { isBlobURL } = wp.blob;

/**
 * Constants
 */
const ALLOWED_BLOCKS = [ 'core/button', 'core/paragraph', 'core/heading', 'core/image', 'coblocks/highlight' ];

const TEMPLATE = [
	[ 'coblocks/icon', { hasContentAlign: false } ],
	[ 'core/heading', { placeholder: _x( 'Add feature title...', 'content placeholder' ), content: _x( 'Feature Title', 'content placeholder' ), level: 4 } ],
	[ 'core/paragraph', { placeholder: _x( 'Add feature content', 'content placeholder' ), content: _x( 'This is a feature block that you can use to highlight features.', 'content placeholder' ) } ],
];

/**
 * Block edit function
 */
class Edit extends Component {
	render() {
		const {
			attributes,
			textColor,
			className,
			isSelected,
			backgroundColor,
		} = this.props;

		const {
			coblocks,
			backgroundImg,
			contentAlign,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			paddingSize,
			paddingUnit,
		} = attributes;

		const dropZone = (
			<BackgroundDropZone
				{ ...this.props }
				label={ __( 'Add as backround' ) }
			/>
		);

		let classes = className;

		if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
			classes = classnames( classes, `coblocks-feature-${ coblocks.id }` );
		}

		const innerClasses = classnames(
			'wp-block-coblocks-feature__inner',
			...BackgroundClasses( attributes ), {
				'has-text-color': textColor.color,
				'has-padding': paddingSize && paddingSize !== 'no',
				[ `has-${ paddingSize }-padding` ]: paddingSize && paddingSize !== 'advanced',
				[ `has-${ contentAlign }-content` ]: contentAlign,
			}
		);

		const innerStyles = {
			...BackgroundStyles( attributes, backgroundColor ),
			color: textColor.color,
			textAlign: contentAlign,
			paddingTop: paddingSize === 'advanced' && paddingTop ? paddingTop + paddingUnit : undefined,
			paddingRight: paddingSize === 'advanced' && paddingRight ? paddingRight + paddingUnit : undefined,
			paddingBottom: paddingSize === 'advanced' && paddingBottom ? paddingBottom + paddingUnit : undefined,
			paddingLeft: paddingSize === 'advanced' && paddingLeft ? paddingLeft + paddingUnit : undefined,
		};

		return (
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
				<div className={ classes }>
					<div className={ innerClasses } style={ innerStyles }>
						{ isBlobURL( backgroundImg ) && <Spinner /> }
						{ BackgroundVideo( attributes ) }
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateLock={ false }
							templateInsertUpdatesSelection={ false }
							renderAppender={ () => ( null ) }
						/>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithColors,
] )( Edit );

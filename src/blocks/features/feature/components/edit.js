/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Controls from './controls';
import BackgroundPanel, { BackgroundClasses, BackgroundDropZone, BackgroundVideo } from '../../../../components/background';
import applyWithColors from './colors';
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;
const { compose } = wp.compose;
const { Component, Fragment } = wp.element;
const { InnerBlocks } = wp.editor;
const { Spinner } = wp.components;
const { isBlobURL } = wp.blob;

/**
 * Constants
 */
const ALLOWED_BLOCKS = [ 'core/button', 'core/paragraph', 'core/heading', 'core/image', 'coblocks/highlight', ];

const TEMPLATE = [
	[ 'coblocks/icon', { hasContentAlign: false } ],
	[ 'core/heading', { placeholder: _x( 'Add feature title...', 'content placeholder' ), content: _x( 'Feature Title', 'content placeholder' ), level: 4 } ],
	[ 'core/paragraph', { placeholder: _x( 'Add feature content', 'content placeholder' ), content: _x( 'This is a feature block that you can use to highlight features.', 'content placeholder' ), } ]
];

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
			textColor,
			customTextColor,
			className,
			isSelected,
			setAttributes,
		} = this.props;

		const {
			coblocks,
			backgroundImg,
			contentAlign,
			gutter,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			paddingSize,
			paddingUnit,
			focalPoint,
			hasParallax,
			backgroundType,
		} = attributes;

		const dropZone = (
			<BackgroundDropZone
				{ ...this.props }
				label={ __( 'Add as backround' ) }
			/>
		);

		const classes = classnames(
			className, {
				[ `coblocks-feature-${ coblocks.id }` ] : coblocks && ( typeof coblocks.id != 'undefined' ),
			}
		);

		const innerClasses = classnames(
			'wp-block-coblocks-feature__inner',
			...BackgroundClasses( attributes ), {
				'has-text-color': textColor.color,
				'has-padding': paddingSize && paddingSize != 'no',
				[ `has-${ paddingSize }-padding` ] : paddingSize && paddingSize != 'advanced',
				[ `has-${ contentAlign }-content` ]: contentAlign,
			}
		);

		const innerStyles = {
			backgroundColor: backgroundColor.color,
			backgroundImage: backgroundImg && backgroundType == 'image' ? `url(${ backgroundImg })` : undefined,
			backgroundPosition: focalPoint && ! hasParallax ? `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%` : undefined,
			color: textColor.color,
			textAlign: contentAlign,
			paddingTop: paddingSize === 'advanced' && paddingTop ? paddingTop + paddingUnit : undefined,
			paddingRight: paddingSize === 'advanced' && paddingRight ? paddingRight + paddingUnit : undefined,
			paddingBottom: paddingSize === 'advanced' && paddingBottom ? paddingBottom + paddingUnit : undefined,
			paddingLeft: paddingSize === 'advanced' && paddingLeft ? paddingLeft + paddingUnit : undefined,
		};

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
				<div className={ classes }>
					<div className={ innerClasses } style={ innerStyles }>
						{ isBlobURL( backgroundImg ) && <Spinner /> }
						{ BackgroundVideo( attributes ) }
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
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
	applyWithColors,
] )( Edit );

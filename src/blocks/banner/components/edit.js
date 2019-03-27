/**
 * External dependencies
 */
import classnames from 'classnames';
import memoize from 'memize';
import times from 'lodash/times';

/**
 * Internal dependencies
 */
import { title } from '../'
// import Inspector from './inspector';
import Controls from './controls';
import applyWithColors from './colors';
import BackgroundPanel, { BackgroundClasses, BackgroundDropZone } from '../../../components/background';

/**
 * WordPress dependencies
 */
const { __, _x, sprintf } = wp.i18n;
const { compose } = wp.compose;
const { Component, Fragment } = wp.element;
const { InnerBlocks } = wp.editor;
const { ResizableBox, Spinner } = wp.components;
const { isBlobURL } = wp.blob;

/**
 * Constants
 */

/**
 * Allowed blocks and template constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In standout block, the only block we allow is 'core/list'.
 *
 * @constant
 * @type {string[]}
*/
const ALLOWED_BLOCKS = [ 'core/heading', 'core/paragraph', 'core/spacer', 'core/button', 'core/list', 'core/image', 'coblocks/alert', 'coblocks/gif', 'coblocks/social', 'coblocks/row' , 'coblocks/column', 'coblocks/buttons' ];
const TEMPLATE = [
	[ 'core/heading', { placeholder: _x( 'Add heading...', 'content placeholder' ), content: _x( 'Ready to get started?', 'content placeholder' ) , level: 2 } ],
	[ 'core/paragraph', { placeholder: _x( 'Add content...', 'content placeholder' ), content: _x( 'Prompt visitors to take action with a call to action heading and button.', 'content placeholder' ) } ],
	[ 'coblocks/buttons', { contentAlign: 'left', items: 2, gutter: 'medium' },
		[
			[ 'core/button', { text: _x( 'Primary', 'content placeholder' ) } ],
			[ 'core/button', { text: _x( 'Secondary', 'content placeholder' ), className: 'is-style-outline' } ],
		]
	],
];
/**
 * Block edit function
 */
class Edit extends Component {

	constructor( props ) {
		super( ...arguments );

		this.state = {
			resizing: false,
		}
	}

	render() {

		const {
			clientId,
			attributes,
			className,
			isSelected,
			setAttributes,
			backgroundColor,
			textColor,
			toggleSelection,
		} = this.props;

		const {
			id,
			coblocks,
			layout,
			fullscreen,
			maxWidth,
			backgroundImg,
			backgroundType,
			paddingSize,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			paddingUnit,
			mediaPosition,
			contentAlign,
			focalPoint,
			hasParallax,
			videoMuted,
			videoLoop,
		} = attributes;

		const dropZone = (
			<BackgroundDropZone
				{ ...this.props }
				label={ sprintf( __( 'Add backround to %s' ), title.toLowerCase() ) } // translators: %s: Lowercase block title
			/>
		);

		const classes = classnames(
			'wp-block-coblocks-banner', {
				[ `coblocks-banner-${ coblocks.id }` ] : coblocks && ( typeof coblocks.id != 'undefined' ),
			}
		);

		const innerClasses = classnames(
			'wp-block-coblocks-banner__inner',
			...BackgroundClasses( attributes ), {
				[ `banner-${ layout }-align` ] : layout,
				'has-text-color': textColor.color,
				'has-padding': paddingSize && paddingSize != 'no',
				[ `has-${ paddingSize }-padding` ] : paddingSize && paddingSize != 'advanced',
				[ `has-${ contentAlign }-content` ]: contentAlign,
				'is-fullscreen': fullscreen,
			}
		);

		const innerStyles = {
			backgroundColor: backgroundColor.color,
			backgroundImage: backgroundImg && backgroundType == 'image' ? `url(${ backgroundImg })` : undefined,
			color: textColor.color,
			paddingTop: paddingSize === 'advanced' && paddingTop ? paddingTop + paddingUnit : undefined,
			paddingRight: paddingSize === 'advanced' && paddingRight ? paddingRight + paddingUnit : undefined,
			paddingBottom: paddingSize === 'advanced' && paddingBottom ? paddingBottom + paddingUnit : undefined,
			paddingLeft: paddingSize === 'advanced' && paddingLeft ? paddingLeft + paddingUnit : undefined,
			backgroundPosition: focalPoint && ! hasParallax ? `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%` : undefined,
		};

		const enablePositions = {
			top: false,
			right: true,
			bottom: false,
			left: true,
			topRight: false,
			bottomRight: false,
			bottomLeft: false,
			topLeft: false,
		};

		return [
			<Fragment>
				{ dropZone }
				{ isSelected && (
					<Controls
						{ ...this.props }
					/>
				) }
				<div
					className={ classes }
				>
					<div className={ innerClasses } style={ innerStyles } >
						{ isBlobURL( backgroundImg ) && <Spinner /> }
						{ backgroundType == 'video' ?
							<div className="coblocks-video-background">
								<video playsinline="" autoplay="" muted={ videoMuted } loop={ videoLoop } src={ backgroundImg } ></video>
							</div>
						: null }
						<InnerBlocks
							template={ TEMPLATE }
							allowedBlocks={ ALLOWED_BLOCKS }
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

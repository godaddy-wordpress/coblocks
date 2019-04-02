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
import Inspector from './inspector';
import Controls from './controls';
import applyWithColors from './colors';
import BackgroundPanel, { BackgroundClasses, BackgroundDropZone } from '../../../components/background';

/**
 * WordPress dependencies
 */
const { __, _x, sprintf } = wp.i18n;
const { compose } = wp.compose;
const { Component, Fragment } = wp.element;
const { InnerBlocks, RichText } = wp.editor;
const { ResizableBox, Spinner } = wp.components;
const { isBlobURL } = wp.blob;

/**
 * Allowed blocks and template constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In standout block, the only block we allow is 'core/list'.
 *
 * @constant
 * @type {string[]}
*/
const ALLOWED_BLOCKS = [ 'coblocks/buttons' ];
const TEMPLATE = [
	[ 'coblocks/buttons', { contentAlign: 'left', items: 1 },
		[
			[ 'core/button', { text: _x( 'Get Started', 'content placeholder' ) } ],
		]
	],
];

/**
 * Block edit function
 */
class Edit extends Component {

	constructor( props ) {
		super( ...arguments );

		this.saveMeta = this.saveMeta.bind( this );
		this.getBrowserWidth = this.getBrowserWidth.bind( this );

		this.state = {
			resizing: false,
			innerWidth: this.getBrowserWidth(),
		}

	}

	componentDidMount(){
		this.getBrowserWidth();
		window.addEventListener( 'resize', this.getBrowserWidth.bind(this) );
	}

	componentWillMount(){
		this.getBrowserWidth();
	}

	componentWillUnmount(){
		window.removeEventListener( 'resize', this.getBrowserWidth.bind(this) );
	}

	getBrowserWidth(){
		this.setState({ innerWidth : window.innerWidth });
		return window.innerWidth;
	}

	saveMeta( type ){
		let meta = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' );
		let block = wp.data.select( 'core/editor' ).getBlock( this.props.clientId );
		let dimensions = {};

		if ( typeof this.props.attributes.coblocks !== 'undefined' && typeof this.props.attributes.coblocks.id !== 'undefined' ) {
			let id = this.props.name.split('/').join('-') + '-' + this.props.attributes.coblocks.id;
			let height = {
				height: block.attributes[ type ],
				heightTablet: block.attributes[ type + 'Tablet' ],
				heightMobile: block.attributes[ type + 'Mobile' ],
			};

			if ( typeof meta._coblocks_responsive_height === 'undefined' || ( typeof meta._coblocks_responsive_height !== 'undefined' && meta._coblocks_responsive_height  == '' ) ){
				dimensions = {};
			} else {
				dimensions = JSON.parse( meta._coblocks_responsive_height );
			}

			if ( typeof dimensions[ id ] === 'undefined' ) {
				dimensions[ id ] = {};
				dimensions[ id ][ type ] = {};
			} else {
				if ( typeof dimensions[ id ][ type ] === 'undefined' ){
					dimensions[ id ][ type ] = {};
				}
			}

			dimensions[ id ][ type ] = height;

			// Save values to metadata.
			wp.data.dispatch( 'core/editor' ).editPost({
				meta: {
					_coblocks_responsive_height: JSON.stringify( dimensions ),
				}
			});

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
			heading,
			content,
			layout,
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
			height,
			heightTablet,
			heightMobile,
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

		let heightResizer = {
			target : 'height',
			value  : height
		};

		if( this.state.innerWidth <= 768 && this.state.innerWidth > 514 ){
			heightResizer = {
				target : 'heightTablet',
				value  : ( heightTablet ) ? heightTablet : height,
			};

		}else if( this.state.innerWidth <= 514 ){
			heightResizer = {
				target : 'heightMobile',
				value  : ( heightMobile ) ? heightMobile : height,
			};

		}

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
					<ResizableBox
						className={ innerClasses }
						style={ innerStyles }
						size={ {
							height: heightResizer.value,
						} }
						minHeight="350"
						enable={ {
							top: false,
							right: false,
							bottom: true,
							left: false,
							topRight: false,
							bottomRight: false,
							bottomLeft: false,
							topLeft: false,
						} }
						onResizeStop={ ( event, direction, elt, delta ) => {
							switch( heightResizer.target ){
								case 'heightTablet':
									setAttributes( {
										heightTablet : parseInt( heightResizer.value + delta.height, 10 ),
									} );
								break;

								case 'heightMobile':
									setAttributes( {
										heightMobile : parseInt( heightResizer.value + delta.height, 10 ),
									} );
								break;

								default:
									setAttributes( {
										height : parseInt( heightResizer.value + delta.height, 10 ),
									} );
								break;
							}

							toggleSelection( true );
							this.setState( { resizing: false } );

							//update meta
							this.saveMeta( 'height' );
						} }
						onResizeStart={ () => {
							toggleSelection( false );
							this.setState( { resizing: true } );
						} }
					>
						{ isBlobURL( backgroundImg ) && <Spinner /> }
						{ backgroundType == 'video' ?
							<div className="coblocks-video-background">
								<video playsinline="" autoplay="" muted={ videoMuted } loop={ videoLoop } src={ backgroundImg } ></video>
							</div>
						: null }
						<div className="wp-block-coblocks-banner__content">
							{ ( ! RichText.isEmpty( heading ) || isSelected ) && (
								<RichText
									tagName="h2"
									className="wp-block-coblocks-banner-title"
									onChange={ ( nextTitle ) => setAttributes( { heading: nextTitle } ) }
									value={ heading }
									placeholder={ __( 'Add heading...' ) }
									keepPlaceholderOnFocus
								/>
							) }

							{ ( ! RichText.isEmpty( content ) || isSelected ) && (
								<RichText
									tagName="p"
									className="wp-block-coblocks-banner-content"
									onChange={ ( nextContent ) => setAttributes( { content: nextContent } ) }
									value={ content }
									placeholder={ __( 'Add content...' ) }
									keepPlaceholderOnFocus
								/>
							) }
						</div>
						<div className="wp-block-coblocks-banner__buttons">
							<InnerBlocks
								template={ TEMPLATE }
								allowedBlocks={ ALLOWED_BLOCKS }
								templateLock={ true }
								templateInsertUpdatesSelection={ false }
							/>
						</div>
					</ResizableBox>
				</div>
			</Fragment>
		];
	}
}

export default compose( [
	applyWithColors,
] )( Edit );

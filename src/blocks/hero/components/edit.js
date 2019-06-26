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
import { BackgroundStyles, BackgroundClasses, BackgroundVideo, BackgroundDropZone } from '../../../components/background';

/**
 * WordPress dependencies
 */
const { __, _x, sprintf } = wp.i18n;
const { compose } = wp.compose;
const { Component, Fragment } = wp.element;
const { InnerBlocks } = wp.blockEditor;
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
	[ 'core/heading', { placeholder: _x( 'Add heading...', 'content placeholder' ), content: _x( 'Hero Block', 'content placeholder' ) , level: 2 } ],
	[ 'core/paragraph', { placeholder: _x( 'Add content...', 'content placeholder' ), content: _x( 'An introductory area of a page accompanied by a small amount of text and a call to action.', 'content placeholder' ) } ],
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

		this.saveMeta = this.saveMeta.bind( this );
		this.getBrowserWidth = this.getBrowserWidth.bind( this );

		this.state = {
			resizingInner: false,
			resizing: false,
			innerWidth: this.getBrowserWidth(),
		}
	}

	componentDidMount() {
		let currentBlock = document.getElementById( 'block-' + this.props.clientId );
		if( currentBlock ){
			currentBlock.getElementsByClassName( 'wp-block-coblocks-hero__box' )[0].style.width = 'auto';
			currentBlock.getElementsByClassName( 'wp-block-coblocks-hero__box' )[0].style.maxWidth = this.props.attributes.maxWidth + 'px';
		}

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
			'wp-block-coblocks-hero', {
				[ `coblocks-hero-${ coblocks.id }` ] : coblocks && ( typeof coblocks.id != 'undefined' ),
			}
		);

		const innerClasses = classnames(
			'wp-block-coblocks-hero__inner',
			...BackgroundClasses( attributes ), {
				[ `hero-${ layout }-align` ] : layout,
				'has-text-color': textColor.color,
				'has-padding': paddingSize && paddingSize != 'no',
				[ `has-${ paddingSize }-padding` ] : paddingSize && paddingSize != 'advanced',
				[ `has-${ contentAlign }-content` ]: contentAlign,
				'is-fullscreen': fullscreen,
				'is-hero-resizing' : this.state.resizingInner,
			}
		);

		const innerStyles = {
			...BackgroundStyles( attributes ),
			color: textColor.color,
			paddingTop: paddingSize === 'advanced' && paddingTop ? paddingTop + paddingUnit : undefined,
			paddingRight: paddingSize === 'advanced' && paddingRight ? paddingRight + paddingUnit : undefined,
			paddingBottom: paddingSize === 'advanced' && paddingBottom ? paddingBottom + paddingUnit : undefined,
			paddingLeft: paddingSize === 'advanced' && paddingLeft ? paddingLeft + paddingUnit : undefined,
			minHeight: fullscreen ? undefined : height,
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
					<Inspector
						{ ...this.props }
					/>
				) }
				{ isSelected && (
					<Controls
						{ ...this.props }
					/>
				) }
				<div
					className={ classes }
				>
				{ fullscreen ?
					<div className={ innerClasses } style={ innerStyles } >
						{ isBlobURL( backgroundImg ) && <Spinner /> }
						{ BackgroundVideo( attributes ) }
						{ ( typeof this.props.insertBlocksAfter !== 'undefined' ) && (
							<ResizableBox
								className={ classnames(
									'wp-block-coblocks-hero__box',
									'editor-media-container__resizer', {
										'is-resizing' : this.state.resizing,
									}
								) }
								size={ { width: maxWidth } }
								minWidth="400"
								maxWidth="1000"
								enable={ enablePositions }
								onResizeStart={ () => {
									this.setState( { resizing: true } );
									toggleSelection( false );
									let currentBlock = document.getElementById( 'block-' + clientId );
									currentBlock.getElementsByClassName( 'wp-block-coblocks-hero__box' )[0].style.maxWidth = '';
									currentBlock.getElementsByClassName( 'wp-block-coblocks-hero__box' )[0].style.width = maxWidth + 'px';
								} }
								onResizeStop={ ( event, direction, elt, delta ) => {
									setAttributes( {
										maxWidth: parseInt( maxWidth + delta.width, 10 ),
									} );
									toggleSelection( true );
									this.setState( { resizing: false } );
									let currentBlock = document.getElementById( 'block-' + clientId );
									currentBlock.getElementsByClassName( 'wp-block-coblocks-hero__box' )[0].style.width = 'auto';
									currentBlock.getElementsByClassName( 'wp-block-coblocks-hero__box' )[0].style.maxWidth = parseInt( maxWidth + delta.width, 10 ) + 'px';
								} }
							>
								<InnerBlocks
									template={ TEMPLATE }
									allowedBlocks={ ALLOWED_BLOCKS }
									templateLock={ false }
									templateInsertUpdatesSelection={ false }
								/>
							</ResizableBox>
						) }
					</div> :
					<ResizableBox
						className={ innerClasses }
						style={ innerStyles }
						size={ {
							height: heightResizer.value,
						} }
						minHeight="500"
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
							this.setState( { resizing: false, resizingInner: false } );

							//update meta
							this.saveMeta( 'height' );
						} }
						onResizeStart={ () => {
							toggleSelection( false );
							this.setState( { resizing: true, resizingInner: true } );
						} }
					>
						{ isBlobURL( backgroundImg ) && <Spinner /> }
						{ BackgroundVideo( attributes ) }
						{ ( typeof this.props.insertBlocksAfter !== 'undefined' ) && (
							<ResizableBox
								className={ classnames(
									'wp-block-coblocks-hero__box',
									'editor-media-container__resizer', {
										'is-resizing' : this.state.resizing,
									}
								) }
								size={ { width: maxWidth } }
								minWidth="400"
								maxWidth="1000"
								enable={ enablePositions }
								onResizeStart={ () => {
									this.setState( { resizing: true } );
									toggleSelection( false );
									let currentBlock = document.getElementById( 'block-' + clientId );
									currentBlock.getElementsByClassName( 'wp-block-coblocks-hero__box' )[0].style.maxWidth = '';
									currentBlock.getElementsByClassName( 'wp-block-coblocks-hero__box' )[0].style.width = maxWidth + 'px';
								} }
								onResizeStop={ ( event, direction, elt, delta ) => {
									setAttributes( {
										maxWidth: parseInt( maxWidth + delta.width, 10 ),
									} );
									toggleSelection( true );
									this.setState( { resizing: false } );
									let currentBlock = document.getElementById( 'block-' + clientId );
									currentBlock.getElementsByClassName( 'wp-block-coblocks-hero__box' )[0].style.width = 'auto';
									currentBlock.getElementsByClassName( 'wp-block-coblocks-hero__box' )[0].style.maxWidth = parseInt( maxWidth + delta.width, 10 ) + 'px';
								} }
							>
								<InnerBlocks
									template={ TEMPLATE }
									allowedBlocks={ ALLOWED_BLOCKS }
									templateLock={ false }
									templateInsertUpdatesSelection={ false }
								/>
							</ResizableBox>
						) }
					</ResizableBox>
				}
				</div>
			</Fragment>
		];
	}
}

export default compose( [
	applyWithColors,
] )( Edit );

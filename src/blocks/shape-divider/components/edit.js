/**
 * External dependencies
 */
import classnames from 'classnames';
import includes from 'lodash/includes';

/**
 * Internal dependencies
 */
import Controls from './controls';
import Inspector from './inspector';
import applyWithColors from './colors';
import dividers from './dividers';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { ResizableBox } = wp.components;

/**
 * Block edit function
 */
class Edit extends Component {

	constructor() {
		super( ...arguments );

		this.saveMeta = this.saveMeta.bind( this );
		this.getBrowserWidth = this.getBrowserWidth.bind( this );

		this.state = {
			resizing: false,
			resizingAlt: false,
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

	getDividerFromStyles( className ) {

		// Check for the block style.
		const isStyleWavy = includes( className, 'is-style-wavy' );
		const isStyleWaves = includes( className, 'is-style-waves' );
		const isStyleSloped = includes( className, 'is-style-sloped' );
		const isStyleRounded = includes( className, 'is-style-rounded' );
		const isStyleAngled = includes( className, 'is-style-angled' );
		const isStyleTriangle = includes( className, 'is-style-triangle' );
		const isStylePointed = includes( className, 'is-style-pointed' );
		const isStyleHills = includes( className, 'is-style-hills' );

		let divdier = dividers.wavy;

		if ( isStyleAngled ) {
			divdier = dividers.angled;
		} else if ( isStyleWavy ) {
			divdier = dividers.wavy;
		} else if ( isStyleSloped ) {
			divdier = dividers.sloped;
		} else if ( isStyleTriangle ) {
			divdier = dividers.triangle;
		} else if ( isStyleRounded ) {
			divdier = dividers.rounded;
		} else if ( isStyleWaves ) {
			divdier = dividers.waves;
		} else if ( isStylePointed ) {
			divdier = dividers.pointed;
		} else if ( isStyleHills ) {
			divdier = dividers.hills;
		}

		return divdier;
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
			attributes,
			className,
			isSelected,
			setAttributes,
			toggleSelection,
			backgroundColor,
			color,
		} = this.props;

		const {
			coblocks,
			shapeHeight,
			shapeHeightTablet,
			shapeHeightMobile,
			backgroundHeight,
			backgroundHeightTablet,
			backgroundHeightMobile,
			verticalFlip,
			horizontalFlip,
		} = attributes;

		let shapeHeightResizer = {
			target : 'shapeHeight',
			value  : shapeHeight 
		};

		let backgroundHeightResizer = {
			target : 'shapeHeight',
			value  : backgroundHeight 
		};

		if( this.state.innerWidth <= 768 && this.state.innerWidth > 514 ){
			shapeHeightResizer = {
				target : 'shapeHeightTablet',
				value  : ( shapeHeightTablet ) ? shapeHeightTablet : shapeHeight,
			};

			backgroundHeightResizer = {
				target : 'backgroundHeightTablet',
				value  : ( backgroundHeightTablet ) ? backgroundHeightTablet : backgroundHeight,
			};

		}else if( this.state.innerWidth <= 514 ){
			shapeHeightResizer = {
				target : 'shapeHeightMobile',
				value  : ( shapeHeightMobile ) ? shapeHeightMobile : shapeHeight, 
			};

			backgroundHeightResizer = {
				target : 'backgroundHeightMobile',
				value  : ( backgroundHeightMobile ) ? backgroundHeightMobile : backgroundHeight,
			};

		}
		
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
				<div
					className={ classnames(
						className, {
							'is-vertically-flipped' : verticalFlip,
							'is-horizontally-flipped' : horizontalFlip,
							'has-background': backgroundColor.color,
							'has-text-color': color.color,
							[ `coblocks-shape-divider-${ coblocks.id }` ] : coblocks && ( typeof coblocks.id != 'undefined' ),
						}
					) }
					style={ {
						backgroundColor: backgroundColor.color,
					} }
					>
				<ResizableBox
					className={ classnames(
						'wp-block-coblocks-shape-divider__svg-wrapper', {
							'is-selected': isSelected,
							'is-resizing' : this.state.resizing,
						}
					) }
					style={ {
						color: color.color,
					} }
					size={ {
						height: shapeHeightResizer.value,
					} }
					minHeight="10"
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
						switch( shapeHeightResizer.target ){
							case 'shapeHeightTablet':
								setAttributes( {
									shapeHeightTablet : parseInt( shapeHeightResizer.value + delta.height, 10 ),
								} );
							break;

							case 'shapeHeightMobile':
								setAttributes( {
									shapeHeightMobile : parseInt( shapeHeightResizer.value + delta.height, 10 ),
								} );
							break;

							default:
								setAttributes( {
									shapeHeight : parseInt( shapeHeightResizer.value + delta.height, 10 ),
								} );
							break;
						}
						
						toggleSelection( true );
						this.setState( { resizing: false } );
						
						//update meta
						this.saveMeta( 'shapeHeight' );
					} }
					onResizeStart={ () => {
						toggleSelection( false );
						this.setState( { resizing: true } );
					} }
				>
					{ this.getDividerFromStyles( className ) }
				</ResizableBox>
				<ResizableBox
					className={ classnames(
						'wp-block-coblocks-shape-divider__alt-wrapper', {
							'is-selected': isSelected,
							'is-resizing' : this.state.resizingAlt,
						}
					) }
					style={ {
						backgroundColor: color.color,
					} }
					size={ {
						height: backgroundHeightResizer.value,
					} }
					minWidth="100%"
					minHeight="10"
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

						switch( backgroundHeightResizer.target ){
							case 'backgroundHeightTablet':
								setAttributes( {
									backgroundHeightTablet : parseInt( backgroundHeightResizer.value + delta.height, 10 ),
								} );
							break;

							case 'backgroundHeightMobile':
								setAttributes( {
									backgroundHeightMobile : parseInt( backgroundHeightResizer.value + delta.height, 10 ),
								} );
							break;

							default:
								setAttributes( {
									backgroundHeight : parseInt( backgroundHeightResizer.value + delta.height, 10 ),
								} );
							break;
						}


						toggleSelection( true );
						this.setState( { resizingAlt: false } );

						//update meta
						this.saveMeta( 'backgroundHeight' );
					} }
					onResizeStart={ () => {
						toggleSelection( false );
						this.setState( { resizingAlt: true } );
					} }
				>
				</ResizableBox>
				</div>
			</Fragment>
		];
	}
};

export default compose( [
	applyWithColors,
] )( Edit );

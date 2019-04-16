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
import { getDividerFromStyle } from '.././';
import InlineColorPicker from '../../../components/inline-color-picker/';

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
			justAdded,
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

		//modify blocks when added
		if( justAdded ){
			const prevBlockClientId = wp.data.select( 'core/editor' ).getPreviousBlockClientId( clientId );
			const nextBlockClientId = wp.data.select( 'core/editor' ).getNextBlockClientId( clientId );

			if( prevBlockClientId ){
				wp.data.dispatch( 'core/editor' ).updateBlockAttributes( prevBlockClientId, {  noBottomMargin: true, marginBottom: 0, marginBottomTablet: 0, marginBottomMobile: 0 } );
			}

			if( nextBlockClientId ){
				wp.data.dispatch( 'core/editor' ).updateBlockAttributes( nextBlockClientId, {  noTopMargin: true, marginTop: 0, marginTopTablet: 0, marginTopMobile: 0 } );
			}
			setAttributes({ justAdded: false });
		}

		const classes = classnames(
			className, {
			[ `coblocks-shape-divider-${ coblocks.id }` ] : coblocks && ( typeof coblocks.id != 'undefined' ),
			'is-vertically-flipped' : verticalFlip,
			'is-horizontally-flipped' : horizontalFlip,
		} );

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
					className={ classes }
					style={ { backgroundColor: backgroundColor.color, color: color.color } }
				>
					<ResizableBox
						className={ classnames(
							'wp-block-coblocks-shape-divider__svg-wrapper', {
								'is-selected': isSelected,
								'is-resizing' : this.state.resizing,
							}
						) }
						size={ {
							height: shapeHeightResizer.value,
						} }
						minHeight="20"
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
						{ getDividerFromStyle( className ) }
					</ResizableBox>
					<ResizableBox
						className={ classnames(
							'wp-block-coblocks-shape-divider__alt-wrapper', {
								'is-selected': isSelected,
								'is-resizing' : this.state.resizingAlt,
							}
						) }
						size={ {
							height: backgroundHeightResizer.value,
						} }
						minWidth="100%"
						minHeight="20"
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
							this.saveMeta( 'backgroundHeight' );
						} }
						onResizeStart={ () => {
							toggleSelection( false );
							this.setState( { resizingAlt: true } );
						} }
					>
					{ isSelected && (
						<InlineColorPicker
							value={ color.color }
							onChange={ ( color ) => setAttributes( { color: null, customColor: color } ) }
						/>
					) }
					</ResizableBox>
				</div>
			</Fragment>
		];
	}
};

export default compose( [
	applyWithColors,
] )( Edit );

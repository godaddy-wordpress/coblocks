/**
 * Styles
 */
import './styles/editor.scss';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;
const { Component, createRef } = wp.element;
const { TextControl,
	RangeControl,
	ButtonGroup,
	Button,
	IconButton,
} = wp.components;

class CropSettings extends Component {
	constructor( props ) {
		super( props );

		const { offsetX, offsetY, cropWidth, cropHeight, rotation } = props;

		this.state = {
			x: offsetX,
			y: offsetY,
			w: cropWidth,
			h: cropHeight,
			r: rotation,
			midX: offsetX + ( cropWidth / 2 ),
			midY: offsetY + ( cropHeight / 2 ),
			containerWidth: 0,
			aspectRatio: 1,
			imageWidth: 1000,
			imageHeight: 1000,
		};

		this.mouseDownListener = this.mouseDownListener.bind( this );
		this.mouseMoveListener = this.mouseMoveListener.bind( this );
		this.mouseUpListener = this.mouseUpListener.bind( this );
		this.handleMouseWheel = this.handleMouseWheel.bind( this );
		this.handleImageLoaded = this.handleImageLoaded.bind( this );
		this.imageContainer = createRef();
		this.imageReference = createRef();
		this.selectedAreaReference = createRef();
	}

	componentDidMount() {
		this.setState( {
			containerWidth: ( jQuery( this.imageContainer.current ).width() - 28 ),
		} );

		this.selectedAreaReference.current.addEventListener( 'wheel', this.handleMouseWheel );
	}

	componentWillUnmount() {
		this.selectedAreaReference.current.removeEventListener( 'wheel', this.handleMouseWheel );
	}

	handleMouseWheel( e ) {
		e.preventDefault();
		e.stopPropagation();

		this.setNewZoom( this.getCurrentScale() - ( e.deltaY * 0.3 ), this.state.r );
	}

	handleImageLoaded() {
		this.setState( {
			aspectRatio: this.imageReference.current.naturalWidth / this.imageReference.current.naturalHeight,
			imageWidth: this.imageReference.current.naturalWidth,
			imageHeight: this.imageReference.current.naturalHeight,
		} );
	}

	mouseDownListener( e ) {
		if ( e.button !== 0 ) {
			return;
		}

		e.preventDefault();
		e.stopPropagation();

		this.captureMouseEvents();
	}

	captureMouseEvents() {
		document.addEventListener( 'mouseup', this.mouseUpListener, true );
		document.addEventListener( 'mousemove', this.mouseMoveListener, true );
	}

	mouseMoveListener( e ) {
		e.preventDefault();
		e.stopPropagation();

		const moveSpeed = 100 / this.getCurrentScale();
		this.updateState( ( this.state.x - ( e.movementX * moveSpeed ) ).toFixed( 2 ), ( this.state.y - ( e.movementY * moveSpeed ) ).toFixed( 2 ), this.state.w, this.state.h, this.state.r );
	}

	mouseUpListener( e ) {
		e.preventDefault();
		e.stopPropagation();

		document.removeEventListener( 'mouseup', this.mouseUpListener, true );
		document.removeEventListener( 'mousemove', this.mouseMoveListener, true );
	}

	applyRotation( r ) {
		if ( r < 0 ) {
			r += 360;
		}

		r %= 360;

		this.setNewZoom( this.getCurrentScale(), r );
	}

	getCurrentScale() {
		const aspectScale = ( this.state.r === 90 || this.state.r === 270 ) ? this.state.aspectRatio : 1;
		return Math.min( Math.max( 1, 1 / ( this.state.w / aspectScale / aspectScale / 100 ) ), 1 / ( this.state.h / 100 ) ) * 100;
	}

	updateState( nX, nY, nW, nH, nR ) {
		const { onChange } = this.props;

		if ( typeof nX === 'string' ) {
			nX = parseFloat( nX );
		}

		if ( typeof nY === 'string' ) {
			nY = parseFloat( nY );
		}

		if ( nW > 100 ) {
			nW = 100;
		}

		if ( nH > 100 ) {
			nH = 100;
		}

		if ( nX + nW > 100 ) {
			nX = 100 - nW;
		}

		if ( nX < 0 ) {
			nX = 0;
		}

		if ( nY + nH > 100 ) {
			nY = 100 - nH;
		}

		if ( nY < 0 ) {
			nY = 0;
		}

		if ( onChange ) {
			onChange( {
				x: nX,
				y: nY,
				w: nW,
				h: nH,
				r: nR,
			} );
		}

		this.setState( {
			x: nX,
			y: nY,
			w: nW,
			h: nH,
			r: nR,
			midX: nX + ( nW / 2 ),
			midY: nY + ( nH / 2 ),
		} );
	}

	resetControl() {
		this.setNewZoom( 100, 0 );
	}

	setNewZoom( zoom, newRotation ) {
		if ( zoom < 100 ) {
			zoom = 100;
		} else if ( zoom > 1000 ) {
			zoom = 1000;
		}

		zoom /= 100;

		const aspectScale = ( newRotation === 90 || newRotation === 270 ) ? this.state.aspectRatio : 1;

		const nW = 100 * aspectScale * aspectScale / zoom;
		const nH = 100 / zoom;

		const nX = ( this.state.midX - ( nW / 2 ) ).toFixed( 2 );
		const nY = ( this.state.midY - ( nH / 2 ) ).toFixed( 2 );

		this.updateState( nX, nY, nW, nH, newRotation );
	}

	render() {
		const self = this;
		const { imageUrl } = self.props;

		let scaleX, scaleY, translateX, translateY;
		const coefficient = ( self.state.r === 90 || self.state.r === 270 ) ? this.state.aspectRatio : 1;
		const currentImageWidth = Math.round( ( self.state.imageWidth * ( this.state.w / 100 ) ) / coefficient );
		const currentImageHeight = Math.round( ( self.state.imageHeight * ( this.state.h / 100 ) ) * coefficient );
		const currentAspect = currentImageWidth / currentImageHeight;

		if ( self.state.r === 90 || self.state.r === 270 ) {
			scaleX = 1 / ( self.state.h / 100 ) / currentAspect;
			scaleY = 1 / ( self.state.w / 100 ) * currentAspect;
		} else {
			scaleX = 1 / ( self.state.w / 100 );
			scaleY = 1 / ( self.state.h / 100 );
		}

		if ( self.state.r === 90 ) {
			translateX = ( 50 - ( self.state.y + ( self.state.h / 2 ) ) );
			translateY = -( 50 - ( self.state.x + ( self.state.w / 2 ) ) );
		} else if ( self.state.r === 180 ) {
			translateX = -( 50 - ( self.state.x + ( self.state.w / 2 ) ) );
			translateY = -( 50 - ( self.state.y + ( self.state.h / 2 ) ) );
		} else if ( self.state.r === 270 ) {
			translateX = -( 50 - ( self.state.y + ( self.state.h / 2 ) ) );
			translateY = ( 50 - ( self.state.x + ( self.state.w / 2 ) ) );
		} else {
			translateX = 50 - ( self.state.x + ( self.state.w / 2 ) );
			translateY = 50 - ( self.state.y + ( self.state.h / 2 ) );
		}

		const mainClass = classnames(
			'components-base-control',
			'components-coblocks-image-control', {
				'is-zoomed': scaleX > 1,
			}
		);

		const offsetClass = classnames(
			'components-coblocks-offset-control',
			'components-focal-point-picker_position-display-container',
		);

		const imageHeight = Math.round( this.state.containerWidth / currentAspect );

		const containerStyle = {
			height: ( imageHeight + 28 ) + 'px',
		};

		const style = {
			transform: 'rotate(' + this.state.r + 'deg) scale(' + scaleX + ', ' + scaleY + ') translate(' + translateX + '%, ' + translateY + '%)',
			height: imageHeight + 'px',
		};

		return (
			<div>
				<div ref={ this.imageContainer } className={ mainClass } onMouseDown={ this.mouseDownListener }
					style={ containerStyle }>
					<div>
						<img ref={ this.imageReference } src={ imageUrl } style={ style } alt={ __( 'Crop settings image placeholder' ) } onLoad={ this.handleImageLoaded } />
					</div>
					<div ref={ this.selectedAreaReference }>
						<img src={ imageUrl } style={ style } alt={ __( 'Crop settings image placeholder' ) } />
					</div>
				</div>
				<div className={ offsetClass }>
					<TextControl
						label={ _x( 'Horizontal Pos.', 'label for horizontal positioning input' ) }
						value={ self.state.x }
						type={ 'number' }
						min={ 0 }
						max={ 100 }
						onChange={ ( val ) => this.updateState( val, self.state.y, self.state.w, self.state.h, self.state.r ) }
					/>
					<TextControl
						label={ _x( 'Vertical Pos.', 'label for vertical positioning input' ) }
						value={ self.state.y }
						type={ 'number' }
						min={ 0 }
						max={ 100 }
						onChange={ ( val ) => this.updateState( self.state.x, val, self.state.w, self.state.h, self.state.r ) }
					/>
				</div>
				<RangeControl
					label={ _x( 'Image Zoom', 'label for the control that allows zooming in on the image' ) }
					className="components-coblocks-zoom-control"
					value={ this.getCurrentScale() }
					onChange={ ( val ) => this.setNewZoom( val, self.state.r ) }
					min={ 100 }
					max={ 1000 }
				/>
				<p>{ __( 'Image Orientation' ) }</p>
				<div className="components-coblocks-rotate-control">
					<ButtonGroup >
						<IconButton
							isLarge
							icon={ icons.rotateLeft }
							label={ __( 'Rotate counter-clockwise' ) }
							onClick={ () => this.applyRotation( self.state.r - 90 ) }
						/>
						<IconButton
							isLarge
							icon={ icons.rotateRight }
							label={ __( 'Rotate clockwise' ) }
							onClick={ () => this.applyRotation( self.state.r + 90 ) }
						/>
					</ButtonGroup>
					<Button
						type="button"
						onClick={ () => this.resetControl() }
						isSmall
						isDefault
						aria-label={ __( 'Reset image cropping options' ) }
					>
						{ __( 'Reset All' ) }
					</Button>
				</div>
			</div>
		);
	}
}

export default CropSettings;

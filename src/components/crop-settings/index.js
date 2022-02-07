/**
 * External dependencies
 */
import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Button,
	ButtonGroup,
	RangeControl,
	TextControl,
} from '@wordpress/components';
import { Component, createRef, Fragment } from '@wordpress/element';
import { rotateLeft, rotateRight } from '@wordpress/icons';

class CropSettings extends Component {
	constructor( props ) {
		super( props );

		const { offsetX, offsetY, cropWidth, cropHeight, rotation } = props;

		this.state = {
			aspectRatio: 1,
			containerWidth: 0,
			h: cropHeight,
			imageHeight: 1000,
			imageWidth: 1000,
			midX: offsetX + ( cropWidth / 2 ),
			midY: offsetY + ( cropHeight / 2 ),
			r: rotation,
			w: cropWidth,
			x: offsetX,
			y: offsetY,
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
			containerWidth: ( this.imageContainer.current.clientWidth - 28 ),
		} );

		this.selectedAreaReference.current.addEventListener( 'wheel', this.handleMouseWheel );
	}

	componentWillUnmount() {
		this.selectedAreaReference.current.removeEventListener( 'wheel', this.handleMouseWheel );
	}

	handleMouseWheel( e ) {
		const { r } = this.state;

		e.preventDefault();
		e.stopPropagation();

		this.setNewZoom( this.getCurrentScale() - ( e.deltaY * 0.3 ), r );
	}

	handleImageLoaded() {
		this.setState( {
			aspectRatio: this.imageReference.current.naturalWidth / this.imageReference.current.naturalHeight,
			imageHeight: this.imageReference.current.naturalHeight,
			imageWidth: this.imageReference.current.naturalWidth,
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
		const doc = this.imageContainer.current.ownerDocument;

		doc.addEventListener( 'mouseup', this.mouseUpListener, true );
		doc.addEventListener( 'mousemove', this.mouseMoveListener, true );
	}

	mouseMoveListener( e ) {
		const { h, r, w, x, y } = this.state;

		e.preventDefault();
		e.stopPropagation();

		const moveSpeed = 100 / this.getCurrentScale();
		this.updateState( ( x - ( e.movementX * moveSpeed ) ).toFixed( 2 ), ( y - ( e.movementY * moveSpeed ) ).toFixed( 2 ), w, h, r );
	}

	mouseUpListener( e ) {
		e.preventDefault();
		e.stopPropagation();

		const doc = this.imageContainer.current.ownerDocument;

		doc.removeEventListener( 'mouseup', this.mouseUpListener, true );
		doc.removeEventListener( 'mousemove', this.mouseMoveListener, true );
	}

	applyRotation( r ) {
		if ( r < 0 ) {
			r += 360;
		}

		r %= 360;

		this.setNewZoom( this.getCurrentScale(), r );
	}

	getCurrentScale() {
		const { aspectRatio, h, r, w } = this.state;

		const aspectScale = ( r === 90 || r === 270 ) ? aspectRatio : 1;
		return Math.min( Math.max( 1, 1 / ( w / aspectScale / aspectScale / 100 ) ), 1 / ( h / 100 ) ) * 100;
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
				h: nH,
				r: nR,
				w: nW,
				x: nX,
				y: nY,
			} );
		}

		this.setState( {
			h: nH,
			midX: nX + ( nW / 2 ),
			midY: nY + ( nH / 2 ),
			r: nR,
			w: nW,
			x: nX,
			y: nY,
		} );
	}

	resetControl() {
		this.setNewZoom( 100, 0 );
	}

	setNewZoom( zoom, newRotation ) {
		const { aspectRatio, midX, midY } = this.state;

		if ( zoom < 100 ) {
			zoom = 100;
		} else if ( zoom > 1000 ) {
			zoom = 1000;
		}

		zoom /= 100;

		const aspectScale = ( newRotation === 90 || newRotation === 270 ) ? aspectRatio : 1;

		const nW = 100 * aspectScale * aspectScale / zoom;
		const nH = 100 / zoom;

		const nX = ( midX - ( nW / 2 ) ).toFixed( 2 );
		const nY = ( midY - ( nH / 2 ) ).toFixed( 2 );

		this.updateState( nX, nY, nW, nH, newRotation );
	}

	render() {
		const self = this;
		const { imageUrl } = self.props;

		const { aspectRatio, containerWidth, h, r, w } = this.state;

		let scaleX, scaleY, translateX, translateY;
		const coefficient = ( self.state.r === 90 || self.state.r === 270 ) ? aspectRatio : 1;
		const currentImageWidth = Math.round( ( self.state.imageWidth * ( w / 100 ) ) / coefficient );
		const currentImageHeight = Math.round( ( self.state.imageHeight * ( h / 100 ) ) * coefficient );
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

		const imageHeight = Math.round( containerWidth / currentAspect );

		const containerStyle = {
			height: ( imageHeight + 28 ) + 'px',
		};

		const style = {
			height: imageHeight + 'px',
			transform: 'rotate(' + r + 'deg) scale(' + scaleX + ', ' + scaleY + ') translate(' + translateX + '%, ' + translateY + '%)',
		};

		/* eslint-disable jsx-a11y/no-static-element-interactions */
		return (
			<Fragment>
				<div className={ mainClass } onMouseDown={ this.mouseDownListener } ref={ this.imageContainer } style={ containerStyle }>
					<div>
						<img alt={ __( 'Crop settings image placeholder', 'coblocks' ) } onLoad={ this.handleImageLoaded } ref={ this.imageReference } src={ imageUrl } style={ style } />
					</div>
					<div ref={ this.selectedAreaReference }>
						<img alt={ __( 'Crop settings image placeholder', 'coblocks' ) } src={ imageUrl } style={ style } />
					</div>
				</div>
				<div className={ offsetClass }>
					<TextControl
						/* translators: label for horizontal positioning input */
						label={ __( 'Horizontal pos.', 'coblocks' ) }
						max={ 100 }
						min={ 0 }
						onChange={ ( val ) => this.updateState( val, self.state.y, self.state.w, self.state.h, self.state.r ) }
						type={ 'number' }
						value={ self.state.x }
					/>
					<TextControl
						/* translators: label for vertical positioning input */
						label={ __( 'Vertical pos.', 'coblocks' ) }
						max={ 100 }
						min={ 0 }
						onChange={ ( val ) => this.updateState( self.state.x, val, self.state.w, self.state.h, self.state.r ) }
						type={ 'number' }
						value={ self.state.y }
					/>
				</div>
				<RangeControl
					/* translators: label for the control that allows zooming in on the image */
					className="components-coblocks-zoom-control"
					label={ __( 'Image zoom', 'coblocks' ) }
					max={ 1000 }
					min={ 100 }
					onChange={ ( val ) => this.setNewZoom( val, self.state.r ) }
					value={ this.getCurrentScale() }
				/>
				<p>{ __( 'Image orientation', 'coblocks' ) }</p>
				<div className="components-coblocks-rotate-control">
					<ButtonGroup >
						<Button
							icon={ rotateLeft }
							isSecondary
							label={ __( 'Rotate counter-clockwise', 'coblocks' ) }
							onClick={ () => this.applyRotation( self.state.r - 90 ) }
						/>
						<Button
							icon={ rotateRight }
							isSecondary
							label={ __( 'Rotate clockwise', 'coblocks' ) }
							onClick={ () => this.applyRotation( self.state.r + 90 ) }
						/>
					</ButtonGroup>
					<Button
						aria-label={ __( 'Reset image cropping options', 'coblocks' ) }
						isSecondary
						isSmall
						onClick={ () => this.resetControl() }
						type="button"
					>
						{ __( 'Reset', 'coblocks' ) }
					</Button>
				</div>
			</Fragment>
		);
		/* eslint-enable jsx-a11y/no-static-element-interactions */
	}
}

CropSettings.propTypes = {
	cropHeight: PropTypes.number,
	cropWidth: PropTypes.number,
	imageUrl: PropTypes.string,
	offsetX: PropTypes.number,
	offsetY: PropTypes.number,
	onChange: PropTypes.func,
	rotation: PropTypes.number,
};

export default CropSettings;

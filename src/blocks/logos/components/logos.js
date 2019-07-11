/**
 * External dependencies
 */
import classnames from 'classnames';
import { flatten } from 'lodash';

/**
 * Internal dependencies
 */
const { Component } = wp.element;

class Logos extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			selectedImage: null,
		};
	}

	componentDidMount () {
		var position         = 0;
		var isHandleDragging = false;
		var target           = false;
		var originalWidth;

		document.addEventListener( 'mousedown', ( e ) => {
			if ( $( e.target ).hasClass( 'handle' ) ) {
				target              = e.target;
				isHandleDragging   = true;
				originalWidth       = $( target ).closest( '.holder' ).outerWidth();
				position            = e.pageX;
			}

			if ( $( e.target ).parents( '.resize' ).hasClass( 'resize' ) ) {
				this.setState( {
					selectedImage: $( e.target ).parents( '.resize' ).find( 'img.logo' ).attr( 'src' ),
				} )
			}
		} );

		document.addEventListener( 'mousemove', ( e ) => {
			if ( ! isHandleDragging ) {
				return false;
			}

			var wrapper    = target.closest( '.wrapper' ),
			    resize     = target.closest( '.resize' ),
			    holder     = target.closest( '.holder' ),
			    pixelDiff  = ( e.clientX - position ),
			    newWidth   = $( target ).hasClass( 'left' ) ? ( originalWidth - pixelDiff ) : ( originalWidth + pixelDiff ),
			    newPercent = ( parseFloat( newWidth / originalWidth ) * 100 );

			newPercent = ( newPercent <= 25 ) ? 25 : ( ( newPercent >= 100 ) ? 100 : newPercent );

			$( holder ).css( 'width', newPercent + '%' );
			$( holder ).css( 'flexGrow', 0 )

			this.props.images[ $( wrapper ).index() ][ $( resize ).index() ].width = newPercent + '%';

			this.props.setAttributes( {
				images: flatten( this.props.images ),
			} );
		}, false );

		document.addEventListener( 'mouseup', function( e ) {
			isHandleDragging = false;
		} );

		this.setState( { selectedImage: null } );
	}

	componentDidUpdate( prevProps ) {

		// Deselect image when deselecting the block.
		if ( ! this.props.isSelected && prevProps.isSelected ) {
			this.setState( {
				selectedImage: null,
			} );
		}

	}

	render() {
		let images = this.props.images[ this.props.imageKey ];

		return (
			<div className="wrapper">
				{ images.map( ( img, index ) => {
					var resizeStyles = {
						width: ( 100 / images.length ) + '%',
					};
					var holderStyles = {
						width: img.width ? img.width : 100 + '%',
					}
					var classes = classnames(
						'resize',
						{
							'selected': ( img.url === this.state.selectedImage ),
						}
					);
					return (
						<div className={ classes } key={ img.id || img.url } style={ resizeStyles }>
							<div className="holder" style={ holderStyles }>
								<div className="handle left"></div>
								<img src={ img.url } alt={ img.alt } className="logo" />
								<div className="handle right"></div>
							</div>
						</div>
					);
				} ) }
			</div>
		);
	}
}

export default Logos;

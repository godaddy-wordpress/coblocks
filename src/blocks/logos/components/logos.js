const { Component } = wp.element;
import { flatten } from 'lodash';

class Logos extends Component {
	constructor() {
		super( ...arguments );
	}

	componentDidMount () {
		var handler           = document.querySelector( '.handler' );
		var position          = 0;
		var isHandlerDragging = false;
		var target            = false;

		document.addEventListener( 'mousedown', ( e ) => {
			if ( $( e.target ).hasClass( 'handler' ) ) {
				target            = e.target;
				isHandlerDragging = true;
				position          = e.pageX;
			}
		} );

		document.addEventListener( 'mousemove', ( e ) => {
			if ( ! isHandlerDragging ) {
				return false;
			}

			var wrapper    = target.closest( '.wrapper' ),
			    resize     = target.closest( '.resize' ),
			    newWidth   = parseFloat( parseInt( $( resize ).outerWidth() ) + ( e.clientX - position ) ),
			    newPercent = ( parseFloat( newWidth / $( wrapper ).outerWidth() ) * 100 );

			newPercent = ( newPercent <= 10 ) ? 10 : ( ( newPercent >= 80 ) ? 80 : newPercent );

			resize.style.width    = newPercent + '%';
			resize.style.flexGrow = 0;

			this.props.images[ $( wrapper ).index() ][ $( resize ).index() ].width = newPercent + '%';

			this.props.setAttributes( {
				images: flatten( this.props.images ),
			} );
		}, false );

		document.addEventListener( 'mouseup', function( e ) {
			isHandlerDragging = false;
		} );
	}

	render() {
		let images  = this.props.images[ this.props.imageKey ];
		var classes = 'resize' + ( ( this.props.isSelected ) ? ' selected' : '' );

		return (
			<div className="wrapper">
				{ images.map( ( img, index ) => {
					var width = ( 100 / images.length );
					var styles = {
						width: img.width ? img.width : width + '%',
					};
					return (
						<div className={ classes } key={ img.id || img.url } style={ styles }>
							<img src={ img.url } alt={ img.alt } className="box" />
							<div className="handler"></div>
						</div>
					);
				} ) }
			</div>
		);
	}
}

export default Logos;

const { Component } = wp.element;

class Logos extends Component {
	constructor() {
		super( ...arguments );
	}

	componentDidMount () {
		var handler = document.querySelector( '.handler' );
		var isHandlerDragging = false;
		var target = false;

		document.addEventListener( 'mousedown', function( e ) {
			if ( $( e.target ).hasClass( 'handler' ) ) {
				target = e.target;
				isHandlerDragging = true;
			}
		} );

		document.addEventListener( 'mousemove', ( e ) => {
			if ( ! isHandlerDragging ) {
				return false;
			}

			var wrapper     = target.closest( '.wrapper' ),
			    resize      = target.closest( '.resize' ),
			    resizeIndex = $( resize ).index(),
			    resizeWidth = Math.max( 60, e.clientX ),
			    newWidth    = ( parseFloat( resizeWidth / $( wrapper ).outerWidth() ) * 100 ) + '%';

			resize.style.width = newWidth;
			resize.style.flexGrow = 0;

			this.props.images[ resizeIndex ].width = newWidth;

			this.props.setAttributes( {
				images: this.props.images,
			} );
		}, false );

		document.addEventListener( 'mouseup', function( e ) {
			isHandlerDragging = false;
		} );
	}

	render() {
		let images = this.props.images;

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

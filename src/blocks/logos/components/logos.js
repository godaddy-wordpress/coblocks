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

		document.addEventListener( 'mousemove', function( e ) {
			// Don't do anything if dragging flag is false
			if ( ! isHandlerDragging ) {
				return false;
			}

			var wrapper = target.closest( '.wrapper' ),
			    resize  = target.closest( '.resize' );

			// Get offset
			var containerOffsetLeft = wrapper.offsetLeft;

			console.log( containerOffsetLeft );

			// Get x-coordinate of pointer relative to container
			var pointerRelativeXpos = e.clientX - containerOffsetLeft;

			resize.style.width = Math.max( 60, pointerRelativeXpos ) + 'px'
			resize.style.flexGrow = 0;
		} );

		document.addEventListener( 'mouseup', function( e ) {
			// Turn off dragging flag when user mouse is up
			isHandlerDragging = false;
		} );
	}

	render() {
		let images = this.props.images;

		var classes = 'resize' + ( ( this.props.isSelected ) ? ' selected' : '' );

		return (
			<div className="wrapper">
				{ images.map( ( img, index ) => {
					return (
						<div className={ classes } key={ img.id || img.url }>
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

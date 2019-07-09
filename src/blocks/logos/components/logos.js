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

			var wrapper = target.closest( '.resize' );

			// Get offset
			var containerOffsetLeft = wrapper.offsetLeft;

			// Get x-coordinate of pointer relative to container
			var pointerRelativeXpos = e.clientX - containerOffsetLeft;

			// Arbitrary minimum width set on box A, otherwise its inner content will collapse to width of 0
			var boxAminWidth = 60;

			// Resize box A
			// * 8px is the left/right spacing between .handler and its inner pseudo-element
			// * Set flex-grow to 0 to prevent it from growing
			wrapper.style.width = Math.max( boxAminWidth, pointerRelativeXpos ) + 'px';
			wrapper.style.flexGrow = 0;
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

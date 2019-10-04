/**
 * WordPress dependencies
 */
const { Component } = wp.element;

export default class Size extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			width: undefined,
			height: undefined,
		};
		this.bindContainer = this.bindContainer.bind( this );
		this.calculateSize = this.calculateSize.bind( this );
	}

	bindContainer( ref ) {
		this.container = ref;
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.src !== prevProps.src ) {
			this.setState( {
				width: undefined,
				height: undefined,
			} );
			this.fetchImageSize();
		}

		if ( this.props.dirtynessTrigger !== prevProps.dirtynessTrigger ) {
			this.calculateSize();
		}
	}

	componentDidMount() {
		this.fetchImageSize();
	}

	fetchImageSize() {
		this.gif = new window.Image();
		this.gif.onload = this.calculateSize;
		this.gif.src = this.props.src;
	}

	calculateSize() {
		const maxWidth = this.container.clientWidth;
		const exceedMaxWidth = this.gif.width > maxWidth;
		const ratio = this.gif.height / this.gif.width;
		const width = exceedMaxWidth ? maxWidth : this.gif.width;
		const height = exceedMaxWidth ? maxWidth * ratio : this.gif.height;
		this.setState( { width, height } );
	}

	render() {
		const sizes = {
			imageWidth: this.gif && this.gif.width,
			imageHeight: this.gif && this.gif.height,
			containerWidth: this.container && this.container.clientWidth,
			containerHeight: this.container && this.container.clientHeight,
			imageWidthWithinContainer: this.state.width,
			imageHeightWithinContainer: this.state.height,
		};
		return (
			<div ref={ this.bindContainer }>
				{ this.props.children( sizes ) }
			</div>
		);
	}
}

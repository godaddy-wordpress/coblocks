/**
 * External dependencies
 */
import classnames from 'classnames';
import { chunk, flatten } from 'lodash';

/**
 * Internal dependencies
 */
const { Component, Fragment } = wp.element;
const { ResizableBox } = wp.components;

class Logos extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			selectedImage: null,
		};
	}

	componentDidUpdate( prevProps ) {
		if ( ! this.props.isSelected && prevProps.isSelected ) {
			this.setState( {
				selectedImage: null,
			} );
		}
	}

	render() {

		// Set imageChunks to 5 if fullwidth alignment.
		const imageChunks = chunk( this.props.images, this.props.attributes.align === 'full' ? 5 : 4 );

		return (
			<Fragment>
				{ Object.keys( imageChunks ).map( keyOuter => {
					const images = imageChunks[ keyOuter ];
					return (
						<div className="wrapper" key={ 'wrapper-' + keyOuter }>
							{ images.map( ( img, index ) => {
								return (
									<ResizableBox
										key={ img.id + '-' + keyOuter + '-' + index }
										minWidth="10%"
										maxWidth={ ( 100 / images.length ) + '%' }
										className={ classnames( 'resize', {
											'is-selected': img.id === this.state.selectedImage,
										} ) }
										size={ { width: img.width || ( 100 / images.length ) + '%' } }
										enable={ {
											top: false,
											right: true,
											bottom: false,
											left: true,
											topRight: false,
											bottomRight: false,
											bottomLeft: false,
											topLeft: false,
										} }
										onResizeStop={ ( event, direction, elt ) => {
											const elementWidth = elt.style.width;
											imageChunks[ keyOuter ][ index ].width = elementWidth;

											const totalWidth = imageChunks[ keyOuter ].reduce(
												( acc, image ) => acc + parseFloat( image.width ),
												0.0
											);

											if ( totalWidth > 100 ) {
												const widthDifference = parseFloat( 100 - totalWidth );

												imageChunks[ keyOuter ].map( ( image, thisIndex ) => {
													if ( thisIndex !== index ) {
														image.width =
															parseFloat( image.width ) +
															parseFloat( widthDifference / ( imageChunks[ keyOuter ].length - 1 ) ) + '%';

														return image;
													}

													return image;
												} );
											}

											this.props.setAttributes( {
												images: flatten( imageChunks ),
											} );
										} }
										onClick={ () => {
											this.setState( { selectedImage: img.id } );
										} }
									>
										<img
											src={ img.url }
											alt={ img.alt }
											data-id={ img.id }
											data-width={ img.width || ( 100 / images.length ) + '%' }
											tabIndex="0"
										/>

									</ResizableBox>
								);
							} ) }
						</div>
					);
				} ) }
			</Fragment>
		);
	}
}

export default Logos;

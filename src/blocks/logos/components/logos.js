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
		const imageChunks = chunk( this.props.images, 4 );

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
										className={ classnames( 'resize', {
											'is-selected': img.id === this.state.selectedImage,
										} ) }
										size={ {
											width: img.width ? img.width : ( 100 / images.length ) + '%',
										} }
										enable={ {
											top: false,
											right: index !== images.length - 1,
											bottom: false,
											left: index !== 0,
											topRight: false,
											bottomRight: false,
											bottomLeft: false,
											topLeft: false,
										} }
										onResizeStop={ ( event, direction, elt ) => {
											const elementWidth = elt.style.width;
											imageChunks[ keyOuter ][
												$( elt ).index()
											].width = elementWidth;
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

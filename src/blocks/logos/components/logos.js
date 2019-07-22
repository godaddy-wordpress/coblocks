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
					let images = imageChunks[ keyOuter ];
					return (
						<div className='wrapper' key={ 'wrapper-' + keyOuter }>
							{ images.map( ( img, index ) => {
								return (
									<ResizableBox
										key={ img.id + '-' + keyOuter + '-' + index }
										className={ classnames(
											'resize',
											{
												'is-selected': ( img.id === this.state.selectedImage ),
											}
										) }
										size={ {
											width: img.width ? img.width : ( ( 100 / images.length ) + '%' ),
										} }
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
											let elementWidth = elt.style.width;
											if ( elementWidth.replace( '%', '' ) <= 10 ) {
												elementWidth = '10%';
											}
											imageChunks[ keyOuter ][ $( elt ).index() ].width = elementWidth;
											this.props.setAttributes( {
												images: flatten( imageChunks ),
											} );
										} }
									>
										<img
											src={ img.url }
											alt={ img.alt }
											data-id={ img.id }
											onClick={ () => {
												this.setState( { selectedImage: img.id } );
											} }
											tabIndex='0'
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

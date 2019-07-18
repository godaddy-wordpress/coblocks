/**
 * External dependencies
 */
import classnames from 'classnames';
import { flatten } from 'lodash';

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
		// Deselect image when deselecting the block.
		if ( ! this.props.isSelected && prevProps.isSelected ) {
			this.setState( {
				selectedImage: null,
			} );
		}
	}

	render() {
		let images = this.props.images[ this.props.imageKey ];

		console.log( this.state );

		return (
			<div className="wrapper">
				{ images.map( ( img, index ) => {
					var imgIndex =  this.props.imageKey + "-" + index;
					return (
						<Fragment>
							<ResizableBox
								className={ classnames(
									'resize',
									{
										'is-selected': ( imgIndex === this.state.selectedImage ),
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
								onResizeStop={ ( event, direction, elt, delta ) => {
									this.props.images[ $( elt ).closest( '.wrapper' ).index() ][ $( elt ).index() ].width = elt.style.width;
									this.props.setAttributes( {
										images: flatten( this.props.images ),
									} );
								} }
							>
								<img
									src={ img.url }
									className="logo"
									alt={ img.alt }
									data-index={ imgIndex }
									onClick={ ( e ) => { this.setState( { selectedImage: imgIndex } ) } }
									tabIndex="0"
								/>
							</ResizableBox>
						</Fragment>
					);
				} ) }
			</div>
		);
	}
}

export default Logos;

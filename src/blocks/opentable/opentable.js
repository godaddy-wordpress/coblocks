
/**
 * Internal dependencies
 */
import { Component, Fragment } from '@wordpress/element';

class OpenTable extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			showLoading: true,
		};
	}

	// componentDidUpdate( prevProps ) {
	// 	if ( ! this.props.isSelected && prevProps.isSelected ) {
	// 		this.setState( {
	// 			selectedImage: null,
	// 		} );
	// 	}
	// }

	render() {
		const styles = [ 'wide', 'tall', 'standard', 'button' ];
		if ( ! styles.includes( this.props.className.substring( this.props.className.lastIndexOf( '-' ) + 1 ) ) ) {
			return (
				<div className="iframe__overflow-wrapper">
					<iframe
						id="opentable-iframe"
						frameBorder="0"
						style={ { width: '224px', height: '301px', display: 'block', margin: 'auto' } }
						title="open table frame"
						src={ `//www.opentable.com/widget/reservation/canvas?rid=${ this.props.attributes.restaurantID }$&domain=com&type=standard&theme=standard&overlay=false&insideiframe=true` }
					/>
				</div>

			);
		}
		return (
			<div className="iframe__overflow-wrapper">
				{ { tall: (
					<iframe
						id="opentable-iframe"
						frameBorder="0"
						style={ { width: '289px', height: '491px', display: 'block', margin: 'auto' } }
						title="open table frame"
						src={ `//www.opentable.com/widget/reservation/canvas?rid=${ this.props.attributes.restaurantID }$&domain=com&type=standard&theme=tall&overlay=false&insideiframe=true` }
					/>
				), standard: (
					<iframe
						id="opentable-iframe"
						frameBorder="0"
						style={ { width: '225px', height: '302px', display: 'block', margin: 'auto' } }
						title="open table frame"
						src={ `//www.opentable.com/widget/reservation/canvas?rid=${ this.props.attributes.restaurantID }$&domain=com&type=standard&theme=standard&overlay=false&insideiframe=true` }
					/>
				), button: (
					<iframe
						id="opentable-iframe"
						frameBorder="0"
						style={ { width: '210px', height: '116px', display: 'block', margin: 'auto' } }
						title="open table frame"
						src={ `//www.opentable.com/widget/reservation/canvas?rid=${ this.props.attributes.restaurantID }$&domain=com&type=button&theme=standard&overlay=false&insideiframe=true` }
					/>
				) }[ this.props.className.substring( this.props.className.lastIndexOf( '-' ) + 1 ) ]
				}
			</div>
		);
	}
}

export default OpenTable;

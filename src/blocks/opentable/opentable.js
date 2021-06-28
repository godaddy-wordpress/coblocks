
/**
 * Internal dependencies
 */
import { Component, Fragment } from '@wordpress/element';

class OpenTable extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			selectedImage: null,
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
		return (
			<Fragment>
				<div className="iframe__overflow-wrapper">
					{ { wide: (
						<iframe
							frameBorder="0"
							style={ { width: '840px', height: '200px', display: 'block', margin: 'auto' } }
							title="open table frame"
							src={ `//www.opentable.com/widget/reservation/canvas?rid=${ this.props.attributes.restaurantID }$&domain=com&type=standard&theme=wide&overlay=false&insideiframe=true` }
						/>
					), tall: (
						<iframe
							frameBorder="0"
							style={ { width: '288px', height: '490px', display: 'block', margin: 'auto' } }
							title="open table frame"
							src={ `//www.opentable.com/widget/reservation/canvas?rid=${ this.props.attributes.restaurantID }$&domain=com&type=standard&theme=tall&overlay=false&insideiframe=true` }
						/>
					), standard: (
						<iframe
							frameBorder="0"
							style={ { width: '224px', height: '301px', display: 'block', margin: 'auto' } }
							title="open table frame"
							src={ `//www.opentable.com/widget/reservation/canvas?rid=${ this.props.attributes.restaurantID }$&domain=com&type=standard&theme=standard&overlay=false&insideiframe=true` }
						/>
					), button: (
						<iframe
							frameBorder="0"
							style={ { width: '210px', height: '115px', display: 'block', margin: 'auto' } }
							title="open table frame"
							src={ `//www.opentable.com/widget/reservation/canvas?rid=${ this.props.attributes.restaurantID }$&domain=com&type=button&theme=standard&overlay=false&insideiframe=true` }
						/>
					) }[ this.props.className.substring( this.props.className.lastIndexOf( '-' ) + 1 ) ]
					}
				</div>
			</Fragment>
		);
	}
}

export default OpenTable;

/**
 * WordPress dependencies
 */
const { Component } = wp.element;

export default class Highlighter extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			className,
		} = this.props;

		const {
			align,
		} = attributes;

		return (
			<p
				className={ className }
				style={ {
					textAlign: align,
				} }
			>
				{ this.props.children }
			</p>
		);
	}
}

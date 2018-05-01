/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { Component } = wp.element;

export default class Author extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			className,
		} = this.props;

		const {
			textAlign,
		} = attributes;

		return (
			<div
				className={ classnames(
					className,
				) }
				style={ {
					textAlign: textAlign,
				} }
			>
				{ this.props.children }
			</div>
		);
	}
}

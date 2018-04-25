/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { Component } = wp.element;

export default class Accordion extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			className,
		} = this.props;

		const { title, content, open, titleBackgroundColor, backgroundColor, textColor, textAlign } = attributes;

		return (
			<div
				style={ {
					backgroundColor: backgroundColor,
					textAlign: textAlign,
					color: textColor,
				} }
				className={ classnames(
					className,
					open ? `${ className }--open` : null,
				) }
			>
				{ this.props.children }
			</div>
		);
	}
}

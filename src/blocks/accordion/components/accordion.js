/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { Component, Fragment } = wp.element;

export default class Accordion extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			className,
			isSelected,
		} = this.props;

		const { title, content, open, titleBackgroundColor, backgroundColor, textColor, textAlign } = attributes;

		return (
			<Fragment>
				<div
					style={ {
						backgroundColor: backgroundColor,
						textAlign: textAlign,
						color: textColor,
					} }
					className={ classnames(
						className,
						open ? `${ className }--open` : null, {
							'is-selected': isSelected,
						}
					) }
				>
					{ this.props.children }
				</div>
			</Fragment>
		);
	}
}

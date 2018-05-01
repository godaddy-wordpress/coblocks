/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { Component } = wp.element;

export default class ClickToTweet extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			className,
		} = this.props;

		const {
			backgroundColor,
			borderColor,
			borderWidth,
			borderRadius,
			textAlign,
			padding,
		} = attributes;

		return (
			<blockquote
				className={ classnames(
					className,
				) }
				style={ {
					backgroundColor: backgroundColor,
					borderColor: borderColor,
					borderWidth: borderWidth,
					borderRadius: borderRadius,
					padding: padding,
					textAlign: textAlign,
				} }
			>
				{ this.props.children }
			</blockquote>
		);
	}
}

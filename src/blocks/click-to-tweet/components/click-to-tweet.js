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
			textAlign,
		} = attributes;

		return (
			<blockquote
				className={ classnames(
					className,
				) }
				style={ {
					textAlign: textAlign,
				} }
			>
				{ this.props.children }
			</blockquote>
		);
	}
}

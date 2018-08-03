/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Colors from './colors';

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { compose } = wp.compose;

export default compose( Colors ) ( class Alert extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			className,
			setBackgroundColor,
			setBorderColor,
			setTextColor,
			setTitleColor,
			backgroundColor,
			borderColor,
			textColor,
			titleColor,
		} = this.props;

		const {
			align,
			textAlign,
		} = attributes;

		return (
			<div
				className={ classnames(
					className,
					`align${ align }`, {
						'has-background': backgroundColor.value,
						[ backgroundColor.class ]: backgroundColor.class,
					}
				) }
				style={ {
					backgroundColor: backgroundColor.value,
					borderColor: borderColor.value,
					textAlign: textAlign,
				} }
			>
				{ this.props.children }
			</div>
		);
	}
} );

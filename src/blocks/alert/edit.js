/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Controls from './controls';
import Inspector from './inspector';
import applyWithColors from './colors';

/**
 * WordPress dependencies
 */
const { _x } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { RichText } = wp.blockEditor;

/**
 * Block edit function
 */
class Edit extends Component {
	componentDidMount() {
		const { attributes, setAttributes } = this.props;

		// Convert is-{type}-alert to is-style-{type}.
		// See: https://github.com/godaddy/coblocks/pull/781
		if ( /is-\w+-alert/.test( attributes.className ) ) {
			let newClassName = attributes.className;

			newClassName = newClassName.replace( 'is-default-alert', 'is-style-info' );
			newClassName = newClassName.replace( /is-(\w+)-alert/, 'is-style-$1' );
			setAttributes( { className: newClassName } );
		}
	}

	componentDidUpdate( prevProps ) {
		const { attributes, setAttributes } = this.props;

		// Reset color selections when a new style has been selected.
		// If the legacy alert class is detected, we want to retain the custom color selections.
		if ( ! /is-\w+-alert/.test( prevProps.attributes.className ) && prevProps.attributes.className !== attributes.className ) {
			setAttributes( { backgroundColor: '', customBackgroundColor: '', textColor: '', customTextColor: '' } );
		}
	}

	render() {
		const {
			attributes,
			backgroundColor,
			className,
			isSelected,
			setAttributes,
			textColor,
		} = this.props;

		const {
			textAlign,
			title,
			value,
		} = attributes;

		return (
			<Fragment>
				{ isSelected && (
					<Controls
						{ ...this.props }
					/>
				) }
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				<div
					className={ classnames(
						className, {
							'has-background': backgroundColor.color,
							'has-text-color': textColor.color,
							[ `has-text-align-${ textAlign }` ]: textAlign,
							[ backgroundColor.class ]: backgroundColor.class,
							[ textColor.class ]: textColor.class,
						}
					) }
					style={ {
						backgroundColor: backgroundColor.color,
						color: textColor.color,
						textAlign: textAlign,
					} }
				>
					{ ( ! RichText.isEmpty( title ) || isSelected ) && (
						<RichText
							placeholder={ _x( 'Write title...', 'Placeholder text for input box' ) }
							value={ title }
							className="wp-block-coblocks-alert__title"
							onChange={ ( value ) => setAttributes( { title: value } ) }
							keepPlaceholderOnFocus
						/>
					) }
					<RichText
						placeholder={ _x( 'Write text...', 'Placeholder text for input box' ) }
						value={ value }
						className="wp-block-coblocks-alert__text"
						onChange={ ( value ) => setAttributes( { value: value } ) }
						keepPlaceholderOnFocus
					/>
				</div>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithColors,
] )( Edit );

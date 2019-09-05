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
const { __ } = wp.i18n;
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
							placeholder={ __( 'Write title...' ) }
							value={ title }
							className="wp-block-coblocks-alert__title"
							onChange={ ( value ) => setAttributes( { title: value } ) }
							keepPlaceholderOnFocus
						/>
					) }
					<RichText
						placeholder={ __( 'Write text...' ) }
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

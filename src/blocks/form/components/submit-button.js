/**
 * External dependencies
 */
import { isEqual, get } from 'lodash';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { withFallbackStyles } = wp.components;
const { InspectorControls,
	PanelColorSettings,
	ContrastChecker,
	RichText,
	withColors,
} = wp.blockEditor;

const { getComputedStyle } = window;

const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { textButtonColor, backgroundButtonColor } = ownProps;
	const backgroundColorValue = backgroundButtonColor && backgroundButtonColor.color;
	const textColorValue = textButtonColor && textButtonColor.color;
	//avoid the use of querySelector if textColor color is known and verify if node is available.

	let textNode;
	let button;

	if ( ! textColorValue && node ) {
		textNode = node.querySelector( '[contenteditable="true"]' );
	}

	if ( node.querySelector( '.wp-block-button__link' ) ) {
		button = node.querySelector( '.wp-block-button__link' );
	} else {
		button = node;
	}

	let fallbackBackgroundColor;
	let fallbackTextColor;

	if ( node ) {
		fallbackBackgroundColor = getComputedStyle( button ).backgroundColor;
	}

	if ( textNode ) {
		fallbackTextColor = getComputedStyle( textNode ).color;
	}

	return {
		fallbackBackgroundColor: backgroundColorValue || fallbackBackgroundColor,
		fallbackTextColor: textColorValue || fallbackTextColor,
	};
} );

class SubmitButton extends Component {
	componentDidUpdate( prevProps ) {
		if (
			! isEqual( this.props.textButtonColor, prevProps.textButtonColor ) ||
			! isEqual( this.props.backgroundButtonColor, prevProps.backgroundButtonColor )
		) {
			const buttonClasses = this.getButtonClasses();
			this.props.setAttributes( { submitButtonClasses: buttonClasses } );
		}
	}

	getButtonClasses() {
		const { textButtonColor, backgroundButtonColor } = this.props;

		const textClass = get( textButtonColor, 'class' );

		const backgroundClass = get( backgroundButtonColor, 'class' );

		return classnames( 'wp-block-button__link', {
			'has-background': backgroundButtonColor,
			[ backgroundClass ]: backgroundClass,
			'has-text-color': textButtonColor,
			[ textClass ]: textClass,
		} );
	}

	render() {
		const {
			attributes,
			fallbackBackgroundColor,
			fallbackTextColor,
			setAttributes,
			setBackgroundButtonColor,
			setTextButtonColor,
		} = this.props;

		const backgroundColor = attributes.customBackgroundButtonColor || fallbackBackgroundColor;

		const color = attributes.customTextButtonColor || fallbackTextColor;

		const buttonStyle = { border: 'none', backgroundColor, color };

		const buttonClasses = this.getButtonClasses();

		return (
			<Fragment>
				<div className="coblocks-form__submit wp-block-button">
					<RichText
						placeholder={ __( 'Add text…' ) }
						value={ attributes.submitButtonText }
						onChange={ nextValue => setAttributes( { submitButtonText: nextValue } ) }
						className={ buttonClasses }
						style={ buttonStyle }
						formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
						keepPlaceholderOnFocus
					/>
				</div>
				<InspectorControls>
					<PanelColorSettings
						title={ __( 'Color Settings' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: backgroundColor,
								onChange: nextColour => {
									setBackgroundButtonColor( nextColour );
									setAttributes( { customBackgroundButtonColor: nextColour } );
								},
								label: __( 'Button Color' ),
							},
							{
								value: color,
								onChange: nextColour => {
									setTextButtonColor( nextColour );
									setAttributes( { customTextButtonColor: nextColour } );
								},
								label: __( 'Button Text Color' ),
							},
						] }
					/>
					<ContrastChecker textColor={ color } backgroundColor={ backgroundColor } />
				</InspectorControls>
			</Fragment>
		);
	}
}

export default compose( [
	withColors( 'backgroundButtonColor', { textButtonColor: 'color' } ),
	applyFallbackStyles,
] )( SubmitButton );

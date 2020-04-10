/**
 * Internal dependencies
 */
import applyWithColors from './colors';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { InspectorControls, ContrastChecker, PanelColorSettings, FontSizePicker, withFontSizes } from '@wordpress/block-editor';
import { PanelBody, withFallbackStyles } from '@wordpress/components';

/**
 * Contrast checker
 */
const { getComputedStyle } = window;

const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { textColor, buttonColor, fontSize, customFontSize } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackButtonColor: buttonColor || ! computedStyles ? undefined : computedStyles.buttonColor,
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
		fallbackFontSize: fontSize || customFontSize || ! computedStyles ? undefined : parseInt( computedStyles.fontSize ) || undefined,
	};
} );

/**
 * Inspector controls
 */
class Inspector extends Component {
	render() {
		const {
			buttonColor,
			fallbackButtonColor,
			fallbackFontSize,
			fallbackTextColor,
			fontSize,
			setButtonColor,
			setFontSize,
			setTextColor,
			textColor,
		} = this.props;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Text settings', 'coblocks' ) } className="blocks-font-size">
						<FontSizePicker
							fallbackFontSize={ fallbackFontSize }
							value={ fontSize.size }
							onChange={ setFontSize }
						/>
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color settings', 'coblocks' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: textColor.color,
								onChange: setTextColor,
								label: __( 'Text color', 'coblocks' ),
							},
							{
								value: buttonColor.color,
								onChange: setButtonColor,
								label: __( 'Button Color', 'coblocks' ),
							},
						] }
					>
						<ContrastChecker
							{ ...{
								textColor: '#ffffff',
								backgroundColor: buttonColor.color,
								fallbackButtonColor,
								fallbackTextColor,
							} }
						/>
					</PanelColorSettings>
				</InspectorControls>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithColors,
	applyFallbackStyles,
	withFontSizes( 'fontSize' ),
] )( Inspector );

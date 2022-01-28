/**
 * Internal dependencies
 */
import applyWithColors from './colors';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { ContrastChecker, InspectorControls, PanelColorSettings, withFontSizes } from '@wordpress/block-editor';
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
	};
} );

const Inspector = ( props ) => {
	const {
		buttonColor,
		fallbackButtonColor,
		fallbackTextColor,
		setButtonColor,
		setTextColor,
		textColor,
	} = props;

	return (
		<InspectorControls>
			<PanelColorSettings
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
				initialOpen={ false }
				title={ __( 'Color settings', 'coblocks' ) }
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
	);
};

export default compose( [
	applyWithColors,
	applyFallbackStyles,
] )( Inspector );

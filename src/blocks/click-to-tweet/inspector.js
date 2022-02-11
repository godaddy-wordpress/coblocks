/**
 * Internal dependencies
 */
import applyWithColors from './colors';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { ContrastChecker, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';

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
						label: __( 'Text color', 'coblocks' ),
						onChange: setTextColor,
						value: textColor.color,
					},
					{
						label: __( 'Button Color', 'coblocks' ),
						onChange: setButtonColor,
						value: buttonColor.color,
					},
				] }
				initialOpen={ false }
				title={ __( 'Color settings', 'coblocks' ) }
			>
				<ContrastChecker
					{ ...{
						backgroundColor: buttonColor.color,
						fallbackButtonColor,
						fallbackTextColor,
						textColor: '#ffffff',
					} }
				/>
			</PanelColorSettings>
		</InspectorControls>
	);
};

export default compose( [
	applyWithColors,
] )( Inspector );

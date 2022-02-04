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
] )( Inspector );

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import CoBlocksFontSizePicker from '../../components/fontsize-picker';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { InspectorControls, ContrastChecker, PanelColorSettings, withFontSizes } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

const Inspector = ( props ) => {
	const {
		backgroundColor,
		textColor,
		setBackgroundColor,
		setTextColor,
		fallbackBackgroundColor,
		fallbackTextColor,
	} = props;

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Highlight settings', 'coblocks' ) } className="blocks-font-size">
					<CoBlocksFontSizePicker	{ ...props } />
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color settings', 'coblocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: __( 'Background color', 'coblocks' ),
						},
						{
							value: textColor.color,
							onChange: setTextColor,
							label: __( 'Text color', 'coblocks' ),
						},
					] }
				>
					<ContrastChecker
						{ ...{
							textColor: textColor.color,
							backgroundColor: backgroundColor.color,
							fallbackBackgroundColor,
							fallbackTextColor,
						} }
					/>
				</PanelColorSettings>
			</InspectorControls>
		</>
	);
};

export default compose( [
	applyWithColors,
	withFontSizes( 'fontSize' ),
] )( Inspector );

/**
 * Internal dependencies
 */
import applyWithColors from './colors';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { InspectorControls, ContrastChecker, PanelColorSettings } from '@wordpress/block-editor';
import { withFallbackStyles } from '@wordpress/components';

/**
 * Contrast checker
 */
const { getComputedStyle } = window;
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { textColor, backgroundColor } = ownProps;
	const backgroundColorValue = backgroundColor && backgroundColor.color;
	const textColorValue = textColor && textColor.color;
	//avoid the use of querySelector if textColor color is known and verify if node is available.
	const textNode = ! textColorValue && node ? node.querySelector( '[contenteditable="true"]' ) : null;
	return {
		fallbackBackgroundColor: backgroundColorValue || ! node ? undefined : getComputedStyle( node ).backgroundColor,
		fallbackTextColor: textColorValue || ! textNode ? undefined : getComputedStyle( textNode ).color,
	};
} );

/**
 * Inspector controls
 *
 * @param {Object} props
 */
const Inspector = ( props ) => {
	const {
		backgroundColor,
		fallbackBackgroundColor,
		fallbackTextColor,
		setBackgroundColor,
		setTextColor,
		textColor,
	} = props;

	return (
		<>
			<InspectorControls>
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
							isLargeText: false,
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
	applyFallbackStyles,
] )( Inspector );

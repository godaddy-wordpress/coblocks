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
import { PanelBody, ToggleControl, withFallbackStyles } from '@wordpress/components';

/**
 * Fallback styles
 */
const { getComputedStyle } = window;
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor, textColor } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
	};
} );

/**
 * Inspector controls
 *
 * @param { Object } props
 */
const Inspector = ( props ) => {
	const {
		attributes,
		backgroundColor,
		textColor,
		fallbackBackgroundColor,
		fallbackTextColor,
		setAttributes,
		setBackgroundColor,
		setTextColor,
	} = props;

	const getDisplayOpenHelp = ( checked ) => {
		return checked ? __( 'Accordion item is open by default.', 'coblocks' ) : __( 'Toggle to set this accordion item to be open by default.', 'coblocks' );
	};

	const setBorderColor = () => {
		setAttributes( {
			borderColor: backgroundColor.color,
		} );

		return setBackgroundColor;
	};

	const {
		open,
	} = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Accordion Item settings', 'coblocks' ) }>
					<ToggleControl
						/* translators: visually display open as opposed to closed */
						checked={ !! open }
						help={ getDisplayOpenHelp }
						label={ __( 'Display as open', 'coblocks' ) }
						onChange={ () => setAttributes( { open: ! open } ) }
					/>
				</PanelBody>
				<PanelColorSettings
					colorSettings={ [
						{
							value: backgroundColor.color,
							onChange: setBorderColor(),
							label: __( 'Background color', 'coblocks' ),
						},
						{
							value: textColor.color,
							onChange: setTextColor,
							label: __( 'Text color', 'coblocks' ),
						},
					] }
					initialOpen={ false }
					title={ __( 'Color settings', 'coblocks' ) }
				>
					<ContrastChecker
						{ ...{
							textColor: textColor.color,
							backgroundColor: backgroundColor.color,
							fallbackTextColor,
							fallbackBackgroundColor,
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

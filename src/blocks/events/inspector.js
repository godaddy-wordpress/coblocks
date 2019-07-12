/**
 * External dependencies.
 */
import applyWithColors from './colors';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { compose } = wp.compose;
const { PanelBody, ToggleControl, TextControl, Button } = wp.components;
const { InspectorControls, PanelColorSettings, ContrastChecker } = wp.blockEditor;

const Inspector = props => {
	const {
		attributes,
		textColor,
		setTextColor,
		externalCalendarUrl,
		onToggleCalendarLink,
		onSubmitURL,
		onUpdateTextColor,
		setAttributes,
	} = props;

	const defaultColors = [
		{
			value: textColor.color,
			onChange: setTextColor,
			label: __( 'Text Color' ),
		},
	];

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Events Settings' ) } initialOpen={ true }>
				<ToggleControl
					label={ __( 'Link a Calendar' ) }
					help={
						attributes.linkACalendar ?
							__( 'Showing your public calendar.' ) :
							__( 'Toggle to link a public calendar.' )
					}
					checked={ attributes.linkACalendar }
					onChange={ ( value ) => setAttributes( { linkACalendar: value } ) }
				/>
				{ attributes.linkACalendar &&
				<form onSubmit={ onSubmitURL }>
					<TextControl
						placeholder={ __( 'Enter URL here…' ) }
						value={ externalCalendarUrl }
						onChange={ ( value ) => setAttributes( { externalCalendarUrl: value } ) }
						className={ 'components-placeholder__input' }
					/>
					<Button isLarge type="submit">
						{ __( 'Use URL' ) }
					</Button>
				</form>
				}
			</PanelBody>
			<PanelColorSettings
				title={ __( 'Color Settings' ) }
				initialOpen={ false }
				colorSettings={ defaultColors }
			>
				<ContrastChecker
					{ ...{
						isLargeText: true,
						textColor: textColor.color,
					} }
				/>
			</PanelColorSettings>
		</InspectorControls>
	);
};

export default compose( [
	applyWithColors,
] )( Inspector );

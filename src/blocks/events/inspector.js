/**
 * External dependencies.
 */
import applyWithColors from './colors';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { compose } = wp.compose;
const { PanelBody, ToggleControl, SelectControl, RangeControl } = wp.components;
const { InspectorControls, PanelColorSettings, ContrastChecker } = wp.blockEditor;

const Inspector = props => {
	const {
		attributes,
		textColor,
		setTextColor,
		onToggleCalendarLink,
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

	const eventsRange = [
		{ value: '1 week', label: __( '1 Week' ) },
		{ value: '2 weeks', label: __( '2 Weeks' ) },
		{ value: '1 month', label: __( '1 Month' ) },
		{ value: 'all', label: __( 'Fetch all' ) },
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
					onChange={ onToggleCalendarLink }
				/>
				{ attributes.linkACalendar &&
				<SelectControl
					label={ __( 'Period' ) }
					value={ attributes.eventsRange }
					options={ eventsRange }
					help={ __( 'Show the events from the period (100 events max).' ) }
					onChange={ ( value ) => setAttributes( { eventsRange: value } ) }
				/>
				}
				{ attributes.linkACalendar &&
				<RangeControl
					label={ __( 'Number of events to show per page' ) }
					value={ attributes.eventsToShow }
					onChange={ ( value ) => setAttributes( { eventsToShow: value } ) }
					min={ 5 }
					max={ 15 }
				/>
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

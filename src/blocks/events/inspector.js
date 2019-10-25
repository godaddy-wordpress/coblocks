/**
 * External dependencies.
 */
import applyWithColors from './colors';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { PanelBody, ToggleControl, SelectControl, RangeControl } from '@wordpress/components';
import { InspectorControls, PanelColorSettings, ContrastChecker } from '@wordpress/block-editor';

const Inspector = props => {
	const {
		attributes,
		textColor,
		onToggleCalendarLink,
		onUpdateTextColor,
		onChangeVisibleEvents,
		setAttributes,
	} = props;

	const defaultColors = [
		{
			value: textColor.color,
			onChange: onUpdateTextColor,
			label: __( 'Text Color', 'coblocks' ),
		},
	];

	const eventsRange = [
		{ value: '1 week', label: __( '1 Week', 'coblocks' ) },
		{ value: '2 weeks', label: __( '2 Weeks', 'coblocks' ) },
		{ value: '1 month', label: __( '1 Month', 'coblocks' ) },
		{ value: 'all', label: __( 'Fetch all', 'coblocks' ) },
	];

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Events Settings' ) } initialOpen={ true }>
				<ToggleControl
					label={ __( 'Link a Calendar', 'coblocks' ) }
					help={
						attributes.linkACalendar ?
							__( 'Showing your public calendar.', 'coblocks' ) :
							__( 'Toggle to link a public calendar.', 'coblocks' )
					}
					checked={ attributes.linkACalendar }
					onChange={ onToggleCalendarLink }
				/>
				{ attributes.linkACalendar &&
				<SelectControl
					label={ __( 'Period' ) }
					value={ attributes.eventsRange }
					options={ eventsRange }
					help={ __( 'Show events from the period (100 events max).', 'coblocks' ) }
					onChange={ ( value ) => setAttributes( { eventsRange: value } ) }
				/>
				}
				<RangeControl
					label={ __( 'Number of events to show per page', 'coblocks' ) }
					value={ attributes.eventsToShow }
					onChange={ onChangeVisibleEvents }
					min={ 5 }
					max={ 15 }
				/>
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

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl, SelectControl, RangeControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

const Inspector = props => {
	const {
		attributes,
		onToggleCalendarLink,
		onChangeVisibleEvents,
		setAttributes,
	} = props;

	const {
		eventsToShow,
		linkACalendar,
		externalCalendarUrl,
	} = attributes;

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
						linkACalendar ?
							__( 'Showing public calendar.', 'coblocks' ) :
							__( 'Toggle to link a public calendar.', 'coblocks' )
					}
					checked={ linkACalendar }
					onChange={ onToggleCalendarLink }
				/>
				<RangeControl
					label={ __( 'Events per page', 'coblocks' ) }
					value={ eventsToShow }
					onChange={ onChangeVisibleEvents }
					min={ 5 }
					max={ 15 }
				/>
				{ linkACalendar && externalCalendarUrl &&
					<SelectControl
						label={ __( 'Period' ) }
						value={ eventsRange }
						options={ eventsRange }
						help={ __( 'Show events from the period (100 events max).', 'coblocks' ) }
						onChange={ ( value ) => setAttributes( { eventsRange: value } ) }
					/>
				}
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;

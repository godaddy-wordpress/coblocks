/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl, SelectControl, RangeControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

const Inspector = props => {
	const {
		attributes,
		toggleExternalCalendarControls,
		showExternalCalendarControls,
		eventsRangeOptions,
		onChangeEventsToShow,
		onChangeEventsRange,
	} = props;

	const {
		eventsToShow,
		eventsRange,
	} = attributes;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Events settings', 'coblocks' ) } initialOpen={ true }>
				<ToggleControl
					label={ __( 'Link a calendar', 'coblocks' ) }
					help={
						showExternalCalendarControls ?
							__( 'Showing public calendar.', 'coblocks' ) :
							__( 'Toggle to link a public calendar.', 'coblocks' )
					}
					checked={ showExternalCalendarControls }
					onChange={ () => toggleExternalCalendarControls() }
				/>
				{ showExternalCalendarControls &&
					<RangeControl
						label={ __( 'Events per page', 'coblocks' ) }
						value={ eventsToShow }
						onChange={ value => onChangeEventsToShow( value ) }
						min={ 1 }
						max={ 15 }
					/>
				}
				{ showExternalCalendarControls &&
					<SelectControl
						label={ __( 'Period', 'coblocks' ) }
						value={ eventsRange }
						options={ eventsRangeOptions }
						help={ __( 'Show events from the period (100 events max).', 'coblocks' ) }
						onChange={ value => onChangeEventsRange( value ) }
					/>
				}
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;

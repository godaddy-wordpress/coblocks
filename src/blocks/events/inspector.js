/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, ToggleControl } from '@wordpress/components';

const Inspector = ( props ) => {
	const {
		attributes,
		toggleExternalCalendarControls,
		showExternalCalendarControls,
		eventsRangeOptions,
		onChangeEventsToShow,
		onChangeEventsRange,
		toggleShowCarousel,
	} = props;

	const {
		eventsToShow,
		eventsRange,
		showCarousel,
	} = attributes;

	return (
		<InspectorControls>
			<PanelBody initialOpen={ true } title={ __( 'Events settings', 'coblocks' ) }>
				<ToggleControl
					checked={ showExternalCalendarControls }
					help={
						showExternalCalendarControls
							? __( 'Showing public calendar.', 'coblocks' )
							: __( 'Toggle to link a public calendar.', 'coblocks' )
					}
					label={ __( 'Link a calendar', 'coblocks' ) }
					onChange={ () => toggleExternalCalendarControls() }
				/>
				<ToggleControl
					checked={ showCarousel }
					help={ __( 'Display events within a carousel.', 'coblocks' ) }
					label={ __( 'Show Carousel', 'coblocks' ) }
					onChange={ () => toggleShowCarousel() }
				/>
				{ showExternalCalendarControls &&
					<RangeControl
						label={ __( 'Events per page', 'coblocks' ) }
						max={ 15 }
						min={ 1 }
						onChange={ ( value ) => onChangeEventsToShow( value ) }
						value={ eventsToShow }
					/>
				}
				{ showExternalCalendarControls &&
					<SelectControl
						help={ __( 'Show events from the period (100 events max).', 'coblocks' ) }
						label={ __( 'Period', 'coblocks' ) }
						onChange={ ( value ) => onChangeEventsRange( value ) }
						options={ eventsRangeOptions }
						value={ eventsRange }
					/>
				}
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;

<?php

const MAX_CONTENT_CHARS = 140;

/**
 * Server-side rendering of the `events` block.
 *
 * @package WordPress
 */

/**
 * Renders the `events` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the events content.
 */
function render_block_events($attributes, $content)
{

	if ($attributes['linkACalendar'] === true && $attributes['externalCalendarUrl']) {

		try {
			$ical = new \CoBlocks_ICal_ICal('ICal.ics', array(
				'defaultSpan'                 => 2,     // Default value
				'defaultTimeZone'             => 'UTC',
				'defaultWeekStart'            => 'MO',  // Default value
				'disableCharacterReplacement' => false, // Default value
				'filterDaysAfter'             => null,  // Default value
				'filterDaysBefore'            => null,  // Default value
				'skipRecurrence'              => false, // Default value
				'useTimeZoneWithRRules'       => false, // Default value
			));
			$ical->initUrl($attributes['externalCalendarUrl']);
			$events = $ical->eventsFromInterval('1 week');

			$eventsLayout = '<div class="wp-block-coblocks-events">';
			$text_color_class  = is_array( $attributes ) && isset( $attributes['textColor'] ) ? "has-{$attributes['textColor']}-color" : false;
			$custom_text_color = is_array( $attributes ) && isset( $attributes['customTextColor'] ) && isset( $attributes['hasColors'] ) && ( ! $attributes['hasColors'] && ! isset( $attributes['textColor'] ) ) ? "color: {$attributes['customTextColor']};" : '';

			foreach ($events as $event) {
				$eventsLayout .= '<div class="wp-block-coblocks-event-item"><div class="wp-block-coblocks-event-item__content">';

				$dtstart	  = $ical->iCalDateToDateTime($event->dtstart_array[3]);
				$dtend 		  = $ical->iCalDateToDateTime($event->dtend_array[3]);
				$start_date_string = strtotime($dtstart->format('YmdHis'));
				$end_date_string   = strtotime($dtend->format('YmdHis'));
				$day 		  = date('D', $start_date_string);
				$month 		  = date('F', $start_date_string);
				$day_of_month = date('d', $start_date_string);
				$start_time   = date("g:iA", $start_date_string);
				$end_time     = date("g:iA", $end_date_string);
				$title		  = $event->summary;
				$desctiption  = $event->description;
				$location	  = $event->location;
				$eventsLayout .= sprintf(
					'<div class="wp-block-coblocks-event-item__dates %1$s" style="%2$s"><p class="wp-block-coblocks-event-item__day">%3$s</p><h4 class="wp-block-coblocks-event-item__month">%4$s</h4><h4 class="wp-block-coblocks-event-item__date">%5$s</h4></div>',
					esc_attr($text_color_class),
					esc_attr($custom_text_color),
					$day,
					$month,
					$day_of_month
				);

				$eventsLayout .= '</div></div>';
			 }

			$eventsLayout .= '</div>';

			return $eventsLayout;
		} catch (\Exception $e) {
			return '<div class="components-placeholder"><div class="notice notice-error">' . __( 'An error has occurred, check for calendar privileges, make sure it is public, or try again later.' ) . '</div></div>';
		}

	} else {
		return $content;
	}
}

/**
 * Registers the `events` block on server.
 */
function register_block_events()
{
	// Return early if this function does not exist.
	if (!function_exists('register_block_type')) {
		return;
	}

	register_block_type(
		'coblocks/events',
		array(
			'attributes' => array(
				'linkACalendar' => array(
					'type' => 'boolean',
					'default' => false,
				),
				'externalCalendarUrl' => array(
					'type' => 'string',
					'default' => '',
				),
				'className' => array(
					'type' => 'string',
				),
				'textColor' => array(
					'type' => 'string',
				),
			),
			'render_callback' => 'render_block_events',
		)
	);
}

add_action('init', 'register_block_events');

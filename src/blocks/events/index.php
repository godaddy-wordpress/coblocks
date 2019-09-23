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
				'defaultSpan' => 2,     // Default value
				'defaultTimeZone' => 'UTC',
				'defaultWeekStart' => 'MO',  // Default value
				'disableCharacterReplacement' => false, // Default value
				'filterDaysAfter' => null,  // Default value
				'filterDaysBefore' => null,  // Default value
				'skipRecurrence' => false, // Default value
				'useTimeZoneWithRRules' => false, // Default value
			));
			$ical->initUrl($attributes['externalCalendarUrl']);

			if ($attributes['eventsRange'] === "all") {
				$events = $ical->eventsFromRange();
			} else {
				$events = $ical->eventsFromInterval($attributes['eventsRange']);
			}
			// we limit the events to 100
			$events = array_slice($events, 0, 100);

			$text_color_class = is_array($attributes) && isset($attributes['textColor']) ? "has-{$attributes['textColor']}-color" : false;
			$custom_text_color = is_array($attributes) && isset($attributes['customTextColor']) && isset($attributes['hasColors']) && (!$attributes['hasColors'] && !isset($attributes['textColor'])) ? "color: {$attributes['customTextColor']};" : '';
			$align = is_array($attributes) && isset($attributes['align']) ? "align{$attributes['align']} " : '';

			$class = 'wp-block-coblocks-events';
			if ( isset( $attributes['className'] ) ) {
				$class .= ' ' . $attributes['className'];
			}

			if ( isset( $attributes['align'] ) ) {
				$class .= ' align' . $align;
			}

			$eventsLayout = sprintf('<div class="%1$s">', esc_attr( $class ));

			foreach ($events as $i => $event) {
				$pageNum = (int)($i / $attributes['eventsToShow']);
				$eventsLayout .= sprintf('<div class="wp-block-coblocks-event-item" data-page="%1$s"><div class="wp-block-coblocks-event-item__content">', $pageNum);

				$dtstart = $ical->iCalDateToDateTime($event->dtstart_array[3]);
				$dtend = $ical->iCalDateToDateTime($event->dtend_array[3]);
				$start_date_string = strtotime($dtstart->format('YmdHis'));
				$end_date_string = strtotime($dtend->format('YmdHis'));
				$day = date('D', $start_date_string);
				$month = date('F', $start_date_string);
				$day_of_month = date('d', $start_date_string);
				$start_time = date("g:ia", $start_date_string);
				$end_time = date("g:ia", $end_date_string);
				$time_string = $start_time . ' - ' . $end_time;
				$title = $event->summary;
				$desctiption = $event->description;
				$location = $event->location;
				$eventsLayout .= sprintf(
					'<div class="wp-block-coblocks-event-item__dates has-text-color %1$s" style="%2$s"><p class="wp-block-coblocks-event-item__day">%3$s</p><h4 class="wp-block-coblocks-event-item__month">%4$s</h4><h4 class="wp-block-coblocks-event-item__date">%5$s</h4></div>',
					esc_attr($text_color_class),
					esc_attr($custom_text_color),
					$day,
					$month,
					$day_of_month
				);

				$eventsLayout .= sprintf(
					'<div class="wp-block-coblocks-event-item__heading-wrapper has-text-color %1$s" style="%2$s"><h4 class="wp-block-coblocks-event-item__heading">%3$s</h4><p class="wp-block-coblocks-event-item__description">%4$s</p></div>',
					esc_attr($text_color_class),
					esc_attr($custom_text_color),
					$title,
					$desctiption
				);

				$eventsLayout .= sprintf(
					'<div class="wp-block-coblocks-event-item__time-and-location has-text-color %1$s" style="%2$s"><h5 class="wp-block-coblocks-event-item__time">%3$s</h5><p class="wp-block-coblocks-event-item__location">%4$s</p></div>',
					esc_attr($text_color_class),
					esc_attr($custom_text_color),
					$time_string,
					$location
				);

				$eventsLayout .= '</div></div>';
			}

			if (count($events) > $attributes['eventsToShow']) {
				$eventsLayout .= sprintf('<div class="wp-block-coblocks-events__more-events-wrapper has-text-color %1$s" style="%2$s"><p>More Events</p></div>',
					esc_attr($text_color_class),
					esc_attr($custom_text_color)
				);
			}

			$eventsLayout .= '</div>';

			return $eventsLayout;
		} catch (\Exception $e) {
			return '<div class="components-placeholder"><div class="notice notice-error">' . __('An error has occurred, check for calendar privileges, make sure it is public, or try again later.') . '</div></div>';
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

	$dir = CoBlocks()->asset_source('js');

	wp_register_script(
		'coblocks-events-pagination',
		$dir . 'coblocks-events-pagination' . COBLOCKS_ASSET_SUFFIX . '.js',
		array('jquery')
	);

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
				'customTextColor' => array(
					'type' => 'string',
				),
				'eventsRange' => array(
					'type' => 'string',
					'default' => 'all',
				),
				'eventsToShow' => array(
					'type' => 'number',
					'default' => 5,
				),
				'currrentPage' => array(
					'type' => 'number',
					'default' => 0,
				),
				'childrenLength' => array(
					'type' => 'number',
					'default' => 0,
				),
				'align' => array(
					'type' => 'string',
					'default' => 'wide',
				)
			),
			'render_callback' => 'render_block_events',
			'editor_script' => 'coblocks-events-pagination',
		)
	);
}

add_action('init', 'register_block_events');

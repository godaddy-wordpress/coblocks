<?php
/**
 * Server-side rendering of the `coblocks/events` block.
 *
 * @package CoBlocks
 */

/**
 * Renders the `events` block on server.
 *
 * @param array  $attributes The block attributes.
 * @param string $content    The post content.
 *
 * @return string Returns the events content.
 */
function coblocks_render_events_block( $attributes, $content ) {

	if ( empty( $attributes['externalCalendarUrl'] ) ) {
		return $content;
	}

	try {
		$ical = new \CoBlocks_ICal(
			false,
			// Default values.
			array(
				'default_span'                  => 2,
				'default_time_zone'             => 'UTC',
				'default_week_start'            => 'MO',
				'disable_character_replacement' => false,
				'filter_days_after'             => null,
				'filter_days_before'            => null,
				'skip_recurrence'               => false,
				'use_timezone_with_r_rules'     => false,
			)
		);
		$ical->init_url( $attributes['externalCalendarUrl'] );

		if ( 'all' === $attributes['eventsRange'] ) {
			$events = $ical->events_from_range();
		} else {
			$events = $ical->events_from_interval( $attributes['eventsRange'] );
		}
		// Limit to 100 events.
		$events = array_slice( $events, 0, 100 );

		$text_color_class  = is_array( $attributes ) && isset( $attributes['textColor'] ) ? "has-{$attributes['textColor']}-color" : false;
		$custom_text_color = is_array( $attributes ) && isset( $attributes['customTextColor'] ) && isset( $attributes['hasColors'] ) && ( ! $attributes['hasColors'] && ! isset( $attributes['textColor'] ) ) ? "color: {$attributes['customTextColor']};" : '';

		$class = 'wp-block-coblocks-events';

		if ( true === $attributes['showCarousel'] ) {
				$class .= ' swiper-wrapper-loading';
		}

		if ( isset( $attributes['className'] ) ) {
			$class .= ' ' . $attributes['className'];
		}

		if ( isset( $attributes['align'] ) ) {
			$class .= ' align' . $attributes['align'];
		}

		$events_layout = '<div class="wp-block-coblocks-events wp-block-coblocks-events-front-container">';

		$events_layout .= sprintf(
			'<div class="swiper-container-external wp-block-coblocks-front-events-swiper-container"><div class="%1$s" data-per-page="%2$s">',
			esc_attr( $class ),
			esc_attr( $attributes['eventsToShow'] )
		);

		foreach ( $events as $event ) {
			$events_layout .= '<div class="wp-block-coblocks-event-item swiper-slide">';

			$dtstart           = $ical->ical_date_to_date_time( $event->dtstart_array[3] );
			$dtend             = $ical->ical_date_to_date_time( $event->dtend_array[3] );
			$start_date_string = strtotime( $dtstart->format( 'YmdHis' ) );
			$end_date_string   = strtotime( $dtend->format( 'YmdHis' ) );
			$year              = gmdate( 'Y', $start_date_string );
			$month             = gmdate( 'F', $start_date_string );
			$start_date        = gmdate( 'd', $start_date_string );
			$end_date          = gmdate( 'd', $end_date_string );
			$start_time        = gmdate( 'c', $start_date_string );
			$end_time          = gmdate( 'c', $end_date_string );
			$time_string       = $start_time . ' - ' . $end_time;
			$title             = $event->summary;
			$description       = $event->description;
			$location          = $event->location;
			$event_duration    = $end_date_string - $start_date_string;
			$is_timed_event    = str_contains( $event->dtstart, 'Z' );
			$one_day           = 86400;

			if ( $event_duration === $one_day && ! $is_timed_event ) {

				$event_time_string = sprintf(
					'<span class="wp-block-coblocks-events__time">%1$s - %2$s</span>',
					gmdate( 'g:ia', $start_date_string ),
					gmdate( 'g:ia', $end_date_string )
				);

				$events_layout .= coblocks_render_single_day_event_item(
					$start_date,
					$month,
					$year,
					$title,
					$description,
					$event_time_string,
					$location
				);

			} elseif ( $event_duration > $one_day && ! $is_timed_event ) {

				$event_time_string = sprintf(
					'<span class="wp-block-coblocks-events__time">%1$s - %2$s</span>',
					gmdate( 'g:ia', $start_date_string ),
					gmdate( 'g:ia', $end_date_string )
				);

				$events_layout .= coblocks_render_multi_day_event_item(
					$start_date,
					$end_date - 1,
					$month,
					$year,
					$title,
					$description,
					$event_time_string,
					$location
				);

			} elseif ( $event_duration < $one_day && $is_timed_event ) {

				$event_time_string = sprintf(
					'<span data-start-time=%1$s data-end-time=%2$s class="wp-block-coblocks-events__time wp-block-coblocks-events__time-formatted"></span>',
					gmdate( 'c', $start_date_string ),
					gmdate( 'c', $end_date_string )
				);

				$events_layout .= coblocks_render_single_day_event_item(
					$start_date,
					$month,
					$year,
					$title,
					$description,
					$event_time_string,
					$location
				);

			} elseif ( $event_duration > $one_day || $event_duration === $one_day && $is_timed_event ) {

				$event_time_string = sprintf(
					'<span data-start-time=%1$s data-end-time=%2$s class="wp-block-coblocks-events__time wp-block-coblocks-events__time-formatted"></span>',
					gmdate( 'c', $start_date_string ),
					gmdate( 'c', $end_date_string )
				);

				$events_layout .= coblocks_render_multi_day_event_item(
					$start_date,
					$end_date,
					$month,
					$year,
					$title,
					$description,
					$event_time_string,
					$location
				);

			}

			$events_layout .= '</div>';
		}

		$events_layout .= '</div>';

		$events_layout .= '<button class="wp-coblocks-events-nav-button__prev" id="wp-coblocks-event-swiper-prev" style="visibility: hidden" />';
		$events_layout .= '<button class="wp-coblocks-events-nav-button__next" id="wp-coblocks-event-swiper-next" style="visibility: hidden" />';

		$events_layout .= '</div>';

		$events_layout .= '</div>';

		return $events_layout;

	} catch ( \Exception $e ) {

		return '<div class="components-placeholder"><div class="notice notice-error">' . __( 'An error has occurred, check for calendar privileges to make sure it is public or try again later.', 'coblocks' ) . '</div></div>';

	}
}

/**
 * Formats a generic event item into HTML
 *
 * @param string $date_range the range of dates for the event.
 * @param string $month month of the event.
 * @param string $year year of the event.
 * @param string $title title of event.
 * @param string $description string description of event.
 * @param string $time_string the time range of the event.
 * @param string $location location of the event.
 */
function coblocks_render_event_item(
	$date_range,
	$month,
	$year,
	$title,
	$description,
	$time_string,
	$location
) {

	$event_layout = sprintf(
		'
		<div class="wp-block-coblocks-events__date">
			<span class="wp-block-coblocks-events__day">%1s</span>
			<div>
				<span class="wp-block-coblocks-events__month">%2$s</span>
				<span class="wp-block-coblocks-events__year">%3$s</span>
			</div>
		</div>',
		$date_range,
		$month,
		$year
	);

	$event_layout .= sprintf(
		'<div class="wp-block-coblocks-events__content">
			<span class="wp-block-coblocks-events__title">%1$s</span>
			<span class="wp-block-coblocks-events__description">%2$s</span>
		</div>',
		$title,
		$description
	);

	$event_layout .= sprintf(
		'<div class="wp-block-coblocks-events__details">
			%1$s
			<span class="wp-block-coblocks-events__location">%2$s</span>
		</div>',
		$time_string,
		$location
	);

	return $event_layout;
}

/**
 * Formats a multi-day event into HTML
 *
 * @param string $start_date start date of event.
 * @param string $end_date end date of event.
 * @param mixed  ...$event_data list of event data arguments.
 */
function coblocks_render_multi_day_event_item( $start_date, $end_date, ...$event_data ) {
	$date_range  = $start_date;
	$date_range .= ' - ';
	$date_range .= $end_date;

	return coblocks_render_event_item( $date_range, ...$event_data );
}

/**
 * Formats a single-day event into HTML
 *
 * @param mixed ...$event_data event data.
 */
function coblocks_render_single_day_event_item( ...$event_data ) {
	return coblocks_render_event_item( ...$event_data );
}

/**
 * Registers the `events` block on server.
 */
function coblocks_register_events_block() {

	// Return early if this function does not exist.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Load attributes from block.json.
	ob_start();
	include COBLOCKS_PLUGIN_DIR . 'src/blocks/events/block.json';
	$metadata = json_decode( ob_get_clean(), true );

	register_block_type(
		'coblocks/events',
		array(
			'attributes'      => $metadata['attributes'],
			'render_callback' => 'coblocks_render_events_block',
		)
	);
}

add_action( 'init', 'coblocks_register_events_block' );

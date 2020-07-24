<?php
/**
 * Server-side rendering of the `coblocks/events` block.
 *
 * @package CoBlocks
 */

/**
 * Adds a REST API endpoint for the Events block.
 *
 * @return void
 */
function coblocks_events_block_api() {
	register_rest_route(
		'coblocks/v1',
		'/external-calendar-events',
		array(
			'methods'  => 'POST',
			'callback' => 'coblocks_api_has_external_calendar_events',
			'args'     => array(
				'url' => array(
					'required' => true,
				),
			),
		)
	);
}
add_action( 'rest_api_init', 'coblocks_events_block_api' );

/**
 * REST API Callback to check external calendar for events.
 *
 * @param \WP_REST_Request $request
 *
 * @return \CoBlocks_ICal|\WP_Error
 */
function coblocks_api_has_external_calendar_events( \WP_REST_Request $request ) {
	$external_calendar_url = $request->get_param( 'url' );

	$ical = coblocks_get_ical( $external_calendar_url );

	if ( is_wp_error( $ical ) ) {
		return $ical;
	}

	return $ical->has_events();
}

/**
 * Helper function to create the CoBlocks_ICal object.
 *
 * @param string $calendar_url The ical url to initialize.
 *
 * @return \CoBlocks_ICal
 */
function coblocks_get_ical( $calendar_url ) {
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
		$ical->init_url( $calendar_url );

		if ( ! $ical->has_events() ) {
			return new \WP_Error(
				'no_events_found',
				__( 'No events were found or an unsupported URL was used.', 'coblocks' ),
				array( 'status' => 404 )
			);
		}
	} catch ( \Exception $e ) {
		return new \WP_Error(
			'loading_events_error',
			__( 'Check for calendar privileges to make sure it is public or try again later.', 'coblocks' ),
			array( 'status' => 404 )
		);
	}

	return $ical;
}

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

	$ical = coblocks_get_ical( $attributes['externalCalendarUrl'] );

	if ( is_wp_error( $ical ) ) {
		return $content;
	}

	$events = ( 'all' === $attributes['eventsRange'] )
		? $ical->events_from_range()
		: $ical->events_from_interval( $attributes['eventsRange'] );

	// Limit to 100 events.
	$events = array_slice( $events, 0, 100 );

	$text_color_class  = is_array( $attributes ) && isset( $attributes['textColor'] ) ? "has-{$attributes['textColor']}-color" : false;
	$custom_text_color = is_array( $attributes ) && isset( $attributes['customTextColor'] ) && isset( $attributes['hasColors'] ) && ( ! $attributes['hasColors'] && ! isset( $attributes['textColor'] ) ) ? "color: {$attributes['customTextColor']};" : '';

	$class = 'wp-block-coblocks-events';
	if ( isset( $attributes['className'] ) ) {
		$class .= ' ' . $attributes['className'];
	}

	if ( isset( $attributes['align'] ) ) {
		$class .= ' align' . $attributes['align'];
	}

	$events_layout = sprintf(
		'<div class="%1$s" data-per-page="%2$s">',
		esc_attr( $class ),
		esc_attr( $attributes['eventsToShow'] )
	);

	foreach ( $events as $event ) {
		$events_layout .= '<div class="wp-block-coblocks-event-item">';

		$dtstart           = $ical->ical_date_to_date_time( $event->dtstart_array[3] );
		$dtend             = $ical->ical_date_to_date_time( $event->dtend_array[3] );
		$start_date_string = strtotime( $dtstart->format( 'YmdHis' ) );
		$end_date_string   = strtotime( $dtend->format( 'YmdHis' ) );
		$year              = gmdate( 'Y', $start_date_string );
		$month             = gmdate( 'F', $start_date_string );
		$day_of_month      = gmdate( 'd', $start_date_string );
		$start_time        = gmdate( 'g:ia', $start_date_string );
		$end_time          = gmdate( 'g:ia', $end_date_string );
		$time_string       = $start_time . ' - ' . $end_time;
		$title             = $event->summary;
		$desctiption       = $event->description;
		$location          = $event->location;
		$events_layout    .= sprintf(
			'
			<div class="wp-block-coblocks-events__date">
				<span class="wp-block-coblocks-events__day">%1$s</span>
				<div>
					<span class="wp-block-coblocks-events__month">%2$s</span>
					<span class="wp-block-coblocks-events__year">%3$s</span>
				</div>
			</div>',
			$day_of_month,
			$month,
			$year
		);

		$events_layout .= sprintf(
			'<div class="wp-block-coblocks-events__content">
				<span class="wp-block-coblocks-events__title">%1$s</span>
				<span class="wp-block-coblocks-events__description">%2$s</span>
			</div>',
			$title,
			$desctiption
		);

		$events_layout .= sprintf(
			'<div class="wp-block-coblocks-events__details">
				<span class="wp-block-coblocks-events__time">%1$s</span>
				<span class="wp-block-coblocks-events__location">%2$s</span>
			</div>',
			$time_string,
			$location
		);

		$events_layout .= '</div>';
	}

	$events_layout .= '</div>';

	return $events_layout;
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

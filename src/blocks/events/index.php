<?php
/**
 * Server-side rendering of the `coblocks/events` block.
 *
 * @package CoBlocks
 */

/**
 * Renders the `events` block on server.
 *
 * @param array $attributes The block attributes.
 * @param array $content    The post content.
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

	} catch ( \Exception $e ) {

		return '<div class="components-placeholder"><div class="notice notice-error">' . __( 'An error has occurred, check for calendar privileges to make sure it is public or try again later.', 'coblocks' ) . '</div></div>';

	}
}

/**
 * Registers the `events` block on server.
 */
function coblocks_register_events_block() {

	// Return early if this function does not exist.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	$vendors_dir = CoBlocks()->asset_source( 'js', 'vendors' );

	wp_enqueue_script(
		'coblocks-slick',
		$vendors_dir . '/slick.js',
		array( 'jquery' ),
		COBLOCKS_VERSION,
		true
	);

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

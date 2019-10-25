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
 *
 * @return string Returns the events content.
 */
function coblocks_render_events_block( $attributes, $content ) {

	if ( ! $attributes['linkACalendar'] || empty( $attributes['externalCalendarUrl'] ) ) {

		return $content;

	}

	try {
		$ical = new \CoBlocks_ICal(
			'ICal.ics',
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
			$events = $ical->eventsFromRange();
		} else {
			$events = $ical->eventsFromInterval( $attributes['eventsRange'] );
		}
		// we limit the events to 100
		$events = array_slice( $events, 0, 100 );

		$text_color_class  = is_array( $attributes ) && isset( $attributes['textColor'] ) ? "has-{$attributes['textColor']}-color" : false;
		$custom_text_color = is_array( $attributes ) && isset( $attributes['customTextColor'] ) && isset( $attributes['hasColors'] ) && ( ! $attributes['hasColors'] && ! isset( $attributes['textColor'] ) ) ? "color: {$attributes['customTextColor']};" : '';
		$align             = is_array( $attributes ) && isset( $attributes['align'] ) ? "align{$attributes['align']} " : '';

		$class = 'wp-block-coblocks-events';
		if ( isset( $attributes['className'] ) ) {
			$class .= ' ' . $attributes['className'];
		}

		if ( isset( $attributes['align'] ) ) {
			$class .= ' align' . $align;
		}

		$events_layout = sprintf( '<div class="%1$s">', esc_attr( $class ) );

		foreach ( $events as $i => $event ) {
			$page_num       = (int) ( $i / $attributes['eventsToShow'] );
			$events_layout .= sprintf( '<div class="wp-block-coblocks-event-item" data-page="%1$s"><div class="wp-block-coblocks-event-item__content flex justify-between">', $page_num );

			$dtstart           = $ical->ical_date_to_date_time( $event->dtstart_array[3] );
			$dtend             = $ical->ical_date_to_date_time( $event->dtend_array[3] );
			$start_date_string = strtotime( $dtstart->format( 'YmdHis' ) );
			$end_date_string   = strtotime( $dtend->format( 'YmdHis' ) );
			$day               = date( 'D', $start_date_string );
			$month             = date( 'F', $start_date_string );
			$day_of_month      = date( 'd', $start_date_string );
			$start_time        = date( 'g:ia', $start_date_string );
			$end_time          = date( 'g:ia', $end_date_string );
			$time_string       = $start_time . ' - ' . $end_time;
			$title             = $event->summary;
			$desctiption       = $event->description;
			$location          = $event->location;
			$events_layout    .= sprintf(
				'<div class="wp-block-coblocks-event-item__dates has-text-color %1$s" style="%2$s"><p class="wp-block-coblocks-event-item__day">%3$s</p><h4 class="wp-block-coblocks-event-item__month">%4$s</h4><h4 class="wp-block-coblocks-event-item__date">%5$s</h4></div>',
				esc_attr( $text_color_class ),
				esc_attr( $custom_text_color ),
				$day,
				$month,
				$day_of_month
			);

			$events_layout .= sprintf(
				'<div class="wp-block-coblocks-event-item__heading-wrapper has-text-color %1$s" style="%2$s"><h4 class="wp-block-coblocks-event-item__heading">%3$s</h4><p class="wp-block-coblocks-event-item__description">%4$s</p></div>',
				esc_attr( $text_color_class ),
				esc_attr( $custom_text_color ),
				$title,
				$desctiption
			);

			$events_layout .= sprintf(
				'<div class="wp-block-coblocks-event-item__time-and-location has-text-color %1$s" style="%2$s"><h5 class="wp-block-coblocks-event-item__time">%3$s</h5><p class="wp-block-coblocks-event-item__location">%4$s</p></div>',
				esc_attr( $text_color_class ),
				esc_attr( $custom_text_color ),
				$time_string,
				$location
			);

			$events_layout .= '</div></div>';
		}

		if ( count( $events ) > $attributes['eventsToShow'] ) {
			$events_layout .= sprintf(
				'<div class="wp-block-coblocks-events__more-events-wrapper flex has-text-color %1$s" style="%2$s"><p>More Events</p></div>',
				esc_attr( $text_color_class ),
				esc_attr( $custom_text_color )
			);
		}

		$events_layout .= '</div>';

		return $events_layout;

	} catch ( \Exception $e ) {

		return '<div class="components-placeholder"><div class="notice notice-error">' . __( 'An error has occurred, check for calendar privileges, make sure it is public, or try again later.', 'coblocks' ) . '</div></div>';

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

	$dir = CoBlocks()->asset_source( 'js' );

	wp_register_script(
		'coblocks-events-pagination',
		$dir . 'coblocks-events-pagination' . COBLOCKS_ASSET_SUFFIX . '.js',
		array( 'jquery' )
	);

	register_block_type(
		'coblocks/events',
		array(
			'attributes'      => array(
				'align'               => array(
					'type' => 'string',
				),
				'className'           => array(
					'type' => 'string',
				),
				'linkACalendar'       => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'externalCalendarUrl' => array(
					'type'    => 'string',
					'default' => '',
				),
				'eventsRange'         => array(
					'type'    => 'string',
					'default' => 'all',
				),
				'eventsToShow'        => array(
					'type'    => 'number',
					'default' => 5,
				),
				'currrentPage'        => array(
					'type'    => 'number',
					'default' => 0,
				),
				'childrenLength'      => array(
					'type'    => 'number',
					'default' => 0,
				),
				'textColor'           => array(
					'type' => 'string',
				),
				'customTextColor'     => array(
					'type' => 'string',
				),
			),
			'render_callback' => 'coblocks_render_events_block',
			'editor_script'   => 'coblocks-events-pagination',
		)
	);
}

add_action( 'init', 'coblocks_register_events_block' );

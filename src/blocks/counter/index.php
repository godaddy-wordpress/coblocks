<?php
/**
 * This file defines a function and adds an action to register Counter patterns.
 *
 * @package CoBlocks
 */

/**
 * Registers the Counter block patterns.
 */
function coblocks_counter_register_block_patterns() {
	// We include viewport when version is below 5.9.
	// WordPress 5.9 renders pattern previews differently.
	$should_include_viewport = ! is_wp_version_compatible( '5.9' );

	$icon_array = array(
		'title'      => __( 'Counter and Icon block Group', 'coblocks' ),
		'blockTypes' => array( 'core/group', 'coblocks/counter', 'coblocks/icon' ),
		'content'    => '<!-- wp:group {"backgroundColor":"tertiary"} --><div class="wp-block-group has-tertiary-background-color has-background"><!-- wp:coblocks/icon {"icon":"build","contentAlign":"center","iconColor":"primary","className":"is-style-outlined"} /--><!-- wp:coblocks/counter {"align":"center","counterDescription":"Hours Worked","counterText":"\u003cstrong\u003e1000\u003c/strong\u003e","textColor":"primary","fontSize":"small"} --><div class="wp-block-coblocks-counter has-text-align-center has-primary-color has-text-color has-small-font-size" data-counter-speed="1"><strong>1000</strong></div><div class="wp-block-coblocks-counter has-text-align-center has-primary-color has-text-color has-small-font-size" data-counter-speed="1">Hours Worked</div><!-- /wp:coblocks/counter --></div><!-- /wp:group -->',
	);

	$multi_digits_array = array(
		'title'      => __( 'Counter with multiple inline digits', 'coblocks' ),
		'blockTypes' => array( 'coblocks/counter' ),
		'content'    => '<!-- wp:coblocks/counter {"align":"center","counterDescription":"Since Last Incident","counterText":"\u003cmeta charset=\u0022utf-8\u0022\u003e10 days, 20 hours","fontSize":"small"} --><div class="wp-block-coblocks-counter has-text-align-center has-small-font-size" data-counter-speed="1"><meta charset="utf-8">10 days, 20 hours</div><div class="wp-block-coblocks-counter has-text-align-center has-small-font-size" data-counter-speed="1">Since Last Incident</div><!-- /wp:coblocks/counter -->',
	);

	if ( $should_include_viewport ) {
		foreach ( array( $icon_array, $multi_digits_array ) as &$pattern_array ) {
			array_push( $pattern_array, array( 'viewport' => '150' ) );
		};
		unset( $pattern_array );
	}

	register_block_pattern( 'counter/with-icon', $icon_array );
	register_block_pattern( 'counter/with-multiple-digits', $multi_digits_array );

}

add_action( 'init', 'coblocks_counter_register_block_patterns' );


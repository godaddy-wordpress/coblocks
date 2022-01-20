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
	register_block_pattern(
		'counter/with-icon',
		array(
			'title'         => __( 'Counter and Icon block Group', 'coblocks' ),
			'blockTypes'    => array( 'core/group', 'coblocks/counter', 'coblocks/icon' ),
			'content'       => '<!-- wp:group {"backgroundColor":"secondary"} --><div class="wp-block-group has-secondary-background-color has-background"><!-- wp:coblocks/icon {"icon":"build","contentAlign":"center","iconColor":"primary","className":"is-style-outlined"} /--><!-- wp:coblocks/counter {"align":"center","counterText":"\u003cstrong\u003e1000\u003c/strong\u003e\u003cbr\u003eHours Worked","fontSize":"small"} --><div class="wp-block-coblocks-counter has-text-align-center has-small-font-size" data-counter-speed="1"><strong>1000</strong><br>Hours Worked</div><!-- /wp:coblocks/counter --></div><!-- /wp:group -->',
			'viewportWidth' => '150',
		)
	);

	register_block_pattern(
		'counter/with-multiple-digits',
		array(
			'title'         => __( 'Counter with multiple inline digits', 'coblocks' ),
			'blockTypes'    => array( 'coblocks/counter' ),
			'content'       => '<!-- wp:coblocks/counter {"align":"center","counterText":"\u003cmeta charset=\u0022utf-8\u0022\u003e10 days, 20 hours\u003cbr\u003eSince last incident","fontSize":"small"} --><div class="wp-block-coblocks-counter has-text-align-center has-small-font-size" data-counter-speed="1"><meta charset="utf-8">10 days, 20 hours<br>Since last incident</div><!-- /wp:coblocks/counter -->',
			'viewportWidth' => '150',
		)
	);
}
add_action( 'init', 'coblocks_counter_register_block_patterns' );


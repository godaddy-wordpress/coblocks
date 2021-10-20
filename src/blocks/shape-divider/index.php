<?php
/**
 * Server-side rendering of the `coblocks/shape-divider` block.
 *
 * @package CoBlocks
 */

/**
 * Renders the `coblocks/shape-divider` block.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the shape divider content.
 */
function coblocks_render_block_shape_divider( $attributes ) {
	$dividers = array(
		'wavy'     => '<svg class="divider--wavy" viewBox="0 0 100 10" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="m42.19.65c2.26-.25 5.15.04 7.55.53 2.36.49 7.09 2.35 10.05 3.57 7.58 3.22 13.37 4.45 19.26 4.97 2.36.21 4.87.35 10.34-.25s10.62-2.56 10.62-2.56v-6.91h-100.01v3.03s7.2 3.26 15.84 3.05c3.92-.07 9.28-.67 13.4-2.24 2.12-.81 5.22-1.82 7.97-2.42 2.72-.63 3.95-.67 4.98-.77z" fillRule="evenodd" transform="matrix(1 0 0 -1 0 10)" /></svg>',
		'waves'    => '<svg class="divider--waves" fill="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 300" preserveAspectRatio="none"><path d="M 1000 299 l 2 -279 c -155 -36 -310 135 -415 164 c -102.64 28.35 -149 -32 -232 -31 c -80 1 -142 53 -229 80 c -65.54 20.34 -101 15 -126 11.61 v 54.39 z"></path><path d="M 1000 286 l 2 -252 c -157 -43 -302 144 -405 178 c -101.11 33.38 -159 -47 -242 -46 c -80 1 -145.09 54.07 -229 87 c -65.21 25.59 -104.07 16.72 -126 10.61 v 22.39 z"></path><path d="M 1000 300 l 1 -230.29 c -217 -12.71 -300.47 129.15 -404 156.29 c -103 27 -174 -30 -257 -29 c -80 1 -130.09 37.07 -214 70 c -61.23 24 -108 15.61 -126 10.61 v 22.39 z"></path></svg>',
		'sloped'   => '<svg class="divider--sloped" aria-hidden xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 100 C 20 0 50 0 100 100 Z"></path></svg>',
		'rounded'  => '<svg class="divider--rounded" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 240 24" enableBackground="new 0 0 240 24" preserveAspectRatio="none"><path d="M119.849,0C47.861,0,0,24,0,24h240C240,24,191.855,0.021,119.849,0z" /></svg>',
		'angled'   => '<svg class="divider--angled" aria-hidden xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="0,100 100,0 100,100" /></svg>',
		'triangle' => '<svg class="divider--triangle" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="m0 0 50 100 50-100z" fillRule="evenodd" transform="matrix(1 0 0 -1 0 100)" /></svg>',
		'pointed'  => '<svg class="divider--pointed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="M737.9,94.7L0,0v100h1000V0L737.9,94.7z"></path></svg>',
		'hills'    => '<svg class="divider--hills" viewBox="0 0 1920 105" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><g fillRule="evenodd" transform="matrix(1 0 0 -1 0 105)"><path d="m1920 14.8827052c-116.23325 0-224.05162 88.3906828-395.09265 88.3906828-160.92196 0-254.53172-83.4344997-444.90735-83.4344997-154.297581 0-240.095847 39.6344097-367.66819 39.6344097-154.121863 0-198.902329-36.1223133-349.458242-36.1223133-144.878137 0-241.175717 80.8685493-362.873568 80.8685493 0-34.0793243 0-68.1494291 0-102.219534h1920z" /><path d="m1920 14.6612844c-116.11434 0-223.9659 88.8291396-395.06196 88.8291396-160.92415 0-254.54487-83.7874573-444.93804-83.7874573-154.317311 0-240.088941 39.8974838-367.565152 39.8974838-154.034172 0-198.792715-36.4840402-349.164477-36.4840402-144.965828 0-241.283139 81.1250467-363.270371 81.1250467 0-34.7474052 0-69.4948104 0-104.241457h1920z" /></g></svg>',
	);

	$has_style  = isset( $attributes['className'] ) && preg_match( '/is\-style\-([\w]+)/', $attributes['className'], $style_match );
	$style_slug = 'wavy';

	if ( $has_style && isset( $style_match[1] ) ) {
		$style_slug = $style_match[1];
	}

	$foreground_color_class = isset( $attributes['color'] )
		? "has-{$attributes['color']}-color"
		: false;

	$foreground_color_custom = isset( $attributes['customColor'] ) && empty( $foreground_color_class )
		? "color: {$attributes['customColor']};"
		: false;

	if ( empty( $foreground_color_class ) && empty( $foreground_color_custom ) ) {
		$foreground_color_custom = 'color: #111;';
	}

	$background_color_class = isset( $attributes['backgroundColor'] )
		? "has-{$attributes['backgroundColor']}-background-color"
		: false;

	$background_color_custom = isset( $attributes['customBackgroundColor'] ) && empty( $background_color_class )
		? "background-color: {$attributes['customBackgroundColor']};"
		: false;

	$is_vertically_flipped = isset( $attributes['verticalFlip'] )
		? 'is-vertically-flipped'
		: false;

	$is_horizontally_flipped = isset( $attributes['horizontalFlip'] )
		? 'is-horizontally-flipped'
		: false;

	$shape_height = isset( $attributes['shapeHeight'] )
		? $attributes['shapeHeight']
		: '100px';

	$background_height = isset( $attributes['backgroundHeight'] )
		? $attributes['backgroundHeight']
		: '50px';

	$no_bottom_margin_class = ! isset( $attributes['noBottomMargin'] ) || ( isset( $attributes['noBottomMargin'] ) && false !== $attributes['noBottomMargin'] )
		? 'mb-0'
		: false;

	$no_top_margin_class = ! isset( $attributes['noTopMargin'] ) || ( isset( $attributes['noTopMargin'] ) && false !== $attributes['noTopMargin'] )
		? 'mt-0'
		: false;

	$wrapper_classes = implode(
		' ',
		array_filter(
			array(
				isset( $attributes['align'] ) ? 'align' . $attributes['align'] : false,
				isset( $attributes['className'] ) ? $attributes['className'] : false,
				$foreground_color_class,
				$background_color_class,
				$is_vertically_flipped,
				$is_horizontally_flipped,
				$no_top_margin_class,
				$no_bottom_margin_class,
			)
		)
	);

	$wrapper_styles = implode(
		' ',
		array_filter(
			array(
				$foreground_color_custom,
				$background_color_custom,
			)
		)
	);

	return sprintf(
		'<div class="wp-block-coblocks-shape-divider %1$s" style="%2$s" aria-hidden="true">
			<div class="wp-block-coblocks-shape-divider__svg-wrapper" style="height:%3$s;">
				%5$s
			</div>
			<div class="wp-block-coblocks-shape-divider__alt-wrapper" style="height:%4$s;"></div>
		</div>',
		esc_attr( $wrapper_classes ),
		esc_attr( $wrapper_styles ),
		esc_attr( $shape_height ),
		esc_attr( $background_height ),
		$dividers[ $style_slug ]
	);
}

/**
 * Registers the `coblocks/shape-divider` block on the server.
 */
function coblocks_register_block_shape_divider() {
	register_block_type(
		'coblocks/shape-divider',
		array(
			'render_callback' => 'coblocks_render_block_shape_divider',
		)
	);
}
add_action( 'init', 'coblocks_register_block_shape_divider' );

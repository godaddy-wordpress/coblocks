<?php
/**
 * Server-side rendering of the `coblocks/icon` block.
 *
 * @package CoBlocks
 */

/**
 * Renders the block on server.
 *
 * @param array $attrs The block attributes.
 *
 * @return string Returns the block content.
 */
function coblocks_render_icon_block( $attrs ) {
	if ( ! is_array( $attrs ) ) {
		$attrs = array();
	}

	$wrapper_classes = array(
		'wp-block-coblocks-icon',
		isset( $attrs['contentAlign'] ) ? "has-text-align-{$attrs['contentAlign']}" : false,
		isset( $attrs['className'] ) ? $attrs['className'] : false,
	);

	$icon_color_class = isset( $attrs['iconColor'] )
		? _wp_to_kebab_case( $attrs['iconColor'] )
		: false;

	$background_color_class = isset( $attrs['backgroundColor'] )
		? _wp_to_kebab_case( $attrs['backgroundColor'] )
		: false;

	$inner_classes = array(
		'wp-block-coblocks-icon__inner',
		$background_color_class ? "has-{$background_color_class}-color" : false,
		( isset( $attrs['backgroundColor'] ) || isset( $attrs['customBackgroundColor'] ) ) ? 'has-background' : false,
		( isset( $attrs['iconColor'] ) || isset( $attrs['customIconColor'] ) ) ? 'has-text-color' : false,
		$icon_color_class ? "has-{$icon_color_class}-color" : false,
	);

	$inner_styles = array(
		isset( $attrs['customBackgroundColor'] ) ? "background-color: {$attrs['customBackgroundColor']};" : false,
		isset( $attrs['borderRadius'] ) ? "border-radius: {$attrs['borderRadius']}px;" : false,
		isset( $attrs['customIconColor'] ) ? "color: {$attrs['customIconColor']}; fill: {$attrs['customIconColor']};" : false,
		isset( $attrs['height'] ) ? "height: {$attrs['height']}px;" : false,
		isset( $attrs['padding'] ) ? "padding: {$attrs['padding']}px;" : false,
		isset( $attrs['width'] ) ? "width: {$attrs['width']}px;" : false,
	);

	$wrapper_classes = implode( ' ', array_filter( $wrapper_classes ) );
	$inner_classes   = implode( ' ', array_filter( $inner_classes ) );
	$inner_styles    = implode( ' ', array_filter( $inner_styles ) );

	// Icon fetch.
	$icon_style = '-outlined';
	$icon_name  = _wp_to_kebab_case( $attrs['icon'] );
	$icon_path  = COBLOCKS_PLUGIN_DIR . "src/blocks/icon/svgs/$icon_name";
	$icon       = '';

	if ( isset( $attrs['className'] ) && false !== strpos( $attrs['className'], 'is-style-filled' ) ) {
		// Filled doesn't have an extension. Only outlined does. Legacy behavior.
		$icon_style = '';
		$icon_name  = $attrs['icon'];
	}

	$icon_path = is_readable( "$icon_path$icon_style.svg" ) ? "$icon_path$icon_style.svg" : $icon_path . '.svg';

	if ( is_readable( $icon_path ) ) {
		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		$icon = file_get_contents( $icon_path );
	}

	if ( isset( $attrs['href'] ) ) {
		$icon = sprintf(
			'<a href="%1$s" rel="%2$s" target="%3$s">%4$s</a>',
			$attrs['href'],
			$attrs['rel'],
			$attrs['linkTarget'],
			$icon
		);
	}

	return trim(
		sprintf(
			'
			<div class="%1$s">
				<div class="%2$s" style="%3$s">
					%4$s
				</div>
			</div>
			',
			esc_attr( $wrapper_classes ),
			esc_attr( $inner_classes ),
			esc_attr( $inner_styles ),
			$icon
		)
	);
}

/**
 * Registers the block on server.
 */
function coblocks_register_icon_block() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	register_block_type(
		COBLOCKS_PLUGIN_DIR . 'src/blocks/icon',
		array(
			'render_callback' => 'coblocks_render_icon_block',
		)
	);
}
add_action( 'init', 'coblocks_register_icon_block' );

<?php
/**
 * Server-side rendering of the `coblocks/social-profiles` block.
 *
 * @package CoBlocks
 */

/**
 * Renders the block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the block content.
 */
function coblocks_render_coblocks_social_profiles_block( $attributes ) {

	// Supported social media platforms.
	$platforms = array(
		'facebook'  => __( 'Facebook', 'coblocks' ),
		'twitter'   => __( 'Twitter', 'coblocks' ),
		'instagram' => __( 'Instagram', 'coblocks' ),
		'tiktok'    => __( 'TikTok', 'coblocks' ),
		'pinterest' => __( 'Pinterest', 'coblocks' ),
		'linkedin'  => __( 'Linkedin', 'coblocks' ),
		'youtube'   => __( 'YouTube', 'coblocks' ),
		'yelp'      => __( 'Yelp', 'coblocks' ),
		'houzz'     => __( 'Houzz', 'coblocks' ),
	);

	$icons_markup = array();

	foreach ( $platforms as $slug => $name ) {
		if ( empty( $attributes[ $slug ] ) ) {
			continue;
		}

		$icon_wrapper_class = array( 'wp-block-button__link wp-block-coblocks-social__button wp-block-coblocks-social__button--' . $slug );
		$icon_wrapper_style = array();

		$has_classname = ! empty( $attributes['className'] );

		$has_style_mask     = $has_classname && strpos( $attributes['className'], 'is-style-mask' ) !== false;
		$has_style_circular = $has_classname && strpos( $attributes['className'], 'is-style-circular' ) !== false;

		if ( isset( $attributes['backgroundColor'] ) || isset( $attributes['customBackgroundColor'] ) ) {
			$icon_wrapper_class[] = $has_style_mask
				? 'has-' . $attributes['backgroundColor'] . '-color'
				: 'has-' . $attributes['backgroundColor'] . '-background-color';

			if ( isset( $attributes['customBackgroundColor'] ) ) {
				$icon_wrapper_style[] = $has_style_mask
					? 'color:' . $attributes['customBackgroundColor'] . ';'
					: 'background-color:' . $attributes['customBackgroundColor'] . ';';
			}
		}

		if ( isset( $attributes['textColor'] ) || isset( $attributes['customTextColor'] ) ) {
			$icon_wrapper_class[] = 'has-text-color';
			$icon_wrapper_class[] = 'has-' . $attributes['textColor'] . '-color';

			if ( isset( $attributes['customTextColor'] ) ) {
				$icon_wrapper_style[] = 'color:' . $attributes['customTextColor'] . ';';
			}
		}

		$icon_size_css = '';
		if ( $has_style_mask || $has_style_circular ) {
			$icon_size_css = 'height:' . $attributes['iconSize'] . 'px; width:' . $attributes['iconSize'] . 'px;';
		}

		if ( $has_style_circular ) {
			$icon_wrapper_style[] = 'padding:' . $attributes['padding'] . 'px;';
		}

		if ( ! empty( $attributes['borderRadius'] ) ) {
			$icon_wrapper_style[] = 'border-radius:' . $attributes['borderRadius'] . 'px;';
		}

		if ( ! empty( $attributes['padding'] ) ) {
			$icon_wrapper_class[] = 'has-padding';
		}

		$icon_wrapper_open = wp_kses(
			sprintf(
				'<li><a href="%s" title="%s" class="%s" style="%s"%s>',
				esc_url( $attributes[ $slug ] ),
				esc_html( $name ),
				esc_attr( implode( ' ', $icon_wrapper_class ) ),
				esc_attr( implode( '', $icon_wrapper_style ) ),
				empty( $attributes['opensInNewTab'] ) ? '' : ' target="_blank" rel="noopener noreferrer"'
			),
			array(
				'li' => array(),
				'a'  => array(
					'class'  => true,
					'href'   => true,
					'rel'    => true,
					'style'  => true,
					'target' => true,
					'title'  => true,
				),
			)
		);

		$icon_wrapper_close = '</a></li>';

		$icon_inner_markup = wp_kses(
			sprintf(
				'<span class="wp-block-coblocks-social__icon" style="%s"></span><span class="wp-block-coblocks-social__text">%s</span>',
				esc_attr( $icon_size_css ),
				esc_html( $name )
			),
			array(
				'span' => array(
					'class' => true,
					'style' => true,
				),
			)
		);

		$icons_markup[] = $icon_wrapper_open . $icon_inner_markup . $icon_wrapper_close;
	}

	// Block wrapper.
	$block_wrapper_class = array( 'wp-block-coblocks-social wp-block-coblocks-social-profiles' );

	if ( isset( $attributes['className'] ) ) {
		$block_wrapper_class[] = $attributes['className'];
	}

	if ( isset( $attributes['align'] ) ) {
		$block_wrapper_class[] = 'align' . $attributes['align'];
	}

	if ( isset( $attributes['textAlign'] ) ) {
		$block_wrapper_class[] = 'has-text-align-' . $attributes['textAlign'];
	}

	if ( isset( $attributes['blockBackgroundColor'] ) || isset( $attributes['customBlockBackgroundColor'] ) ) {
		$block_wrapper_class[] = 'has-background';
	}

	if ( isset( $attributes['blockBackgroundColor'] ) ) {
		$block_wrapper_class[] = 'has-' . $attributes['blockBackgroundColor'] . '-background-color';
	}

	if ( ! empty( $attributes['hasColors'] ) ) {
		$block_wrapper_class[] = 'has-colors';
	}

	if ( isset( $attributes['size'] ) && ( isset( $attributes['className'] ) && strpos( $attributes['className'], 'is-style-mask' ) === false ) ) {
		$block_wrapper_class[] = 'has-button-size-' . $attributes['size'];
	}

	$block_wrapper_style = array();

	if ( isset( $attributes['customBlockBackgroundColor'] ) ) {
		$block_wrapper_style[] = 'background-color:' . $attributes['customBlockBackgroundColor'] . ';';
	}

	$block_wrapper_open = wp_kses(
		sprintf(
			'<div class="%s" style="%s"><ul>',
			esc_attr( implode( ' ', $block_wrapper_class ) ),
			esc_attr( implode( '', $block_wrapper_style ) )
		),
		array(
			'div' => array(
				'class' => true,
				'style' => true,
			),
			'ul'  => array(),
		)
	);

	$block_wrapper_close = '</ul></div>';

	return $block_wrapper_open . implode( '', $icons_markup ) . $block_wrapper_close;
}

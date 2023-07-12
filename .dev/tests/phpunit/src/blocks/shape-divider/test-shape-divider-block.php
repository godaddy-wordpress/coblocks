<?php
/**
 * Test src/blocks/shape-divider/index.php
 *
 * @package CoBlocks
 */
class CoBlocks_Shape_Divider_Index_Tests extends WP_UnitTestCase {

	public function set_up(): void {
		parent::set_up();

		set_current_screen( 'edit-post' );
	}

	public function tear_down(): void {
		parent::tear_down();

		unset( $GLOBALS['current_screen'] );
	}

	/**
	 * Test that block renders with default attributes.
	 */
	public function test_coblocks_render_block_shape_divider_returns_default_block_with_default_attributes() {
		$rendered_block = coblocks_render_coblocks_shape_divider_block( array() );

		$this->assertStringContainsString( 'class="wp-block-coblocks-shape-divider mt-0 mb-0" style="color: #111;"', $rendered_block );
		$this->assertStringContainsString( 'class="wp-block-coblocks-shape-divider__svg-wrapper" style="height:100px;"', $rendered_block );
		$this->assertStringContainsString( 'svg class="divider--wavy"', $rendered_block );
		$this->assertStringContainsString( 'class="wp-block-coblocks-shape-divider__alt-wrapper" style="height:50px;"', $rendered_block );

		// Test passing the default attributes renders exactly the same as no attributes.
		$rendered_block = coblocks_render_coblocks_shape_divider_block(
			array(
				'shapeHeight'      => '100px',
				'backgroundHeight' => '50px',
				'customColor'      => '#111',
				'noBottomMargin'   => true,
				'noTopMargin'      => true,
			)
		);

		$this->assertStringContainsString( 'class="wp-block-coblocks-shape-divider mt-0 mb-0" style="color: #111;"', $rendered_block );
		$this->assertStringContainsString( 'class="wp-block-coblocks-shape-divider__svg-wrapper" style="height:100px;"', $rendered_block );
		$this->assertStringContainsString( 'svg class="divider--wavy"', $rendered_block );
		$this->assertStringContainsString( 'class="wp-block-coblocks-shape-divider__alt-wrapper" style="height:50px;"', $rendered_block );
	}

	/**
	 * Test that the block renders color classes or custom styles.
	 */
	public function test_coblocks_render_block_shape_divider_returns_color_classes_or_styles() {
		$this->assertStringContainsString(
			'class="wp-block-coblocks-shape-divider has-primary-color mt-0 mb-0" style=""',
			coblocks_render_coblocks_shape_divider_block( array( 'color' => 'primary' ) )
		);

		$this->assertStringContainsString(
			'class="wp-block-coblocks-shape-divider mt-0 mb-0" style="color: #123;"',
			coblocks_render_coblocks_shape_divider_block( array( 'customColor' => '#123' ) )
		);
	}

	/**
	 * Test that the block renders background color classes or custom color styles.
	 */
	public function test_coblocks_render_block_shape_divider_returns_background_color_classes_or_styles() {
		$this->assertStringContainsString(
			'class="wp-block-coblocks-shape-divider has-primary-background-color mt-0 mb-0" style="color: #111;"',
			coblocks_render_coblocks_shape_divider_block( array( 'backgroundColor' => 'primary' ) )
		);

		$this->assertStringContainsString(
			'class="wp-block-coblocks-shape-divider mt-0 mb-0" style="color: #111; background-color: #123;"',
			coblocks_render_coblocks_shape_divider_block( array( 'customBackgroundColor' => '#123' ) )
		);
	}

	/**
	 * Test that the block renders vertically flipped class.
	 */
	public function test_coblocks_render_block_shape_divider_returns_vertically_flipped_class() {
		$this->assertStringContainsString(
			'class="wp-block-coblocks-shape-divider is-vertically-flipped mt-0 mb-0" style="color: #111;"',
			coblocks_render_coblocks_shape_divider_block( array( 'verticalFlip' => true ) )
		);
	}

	/**
	 * Test that the block renders vertically flipped class.
	 */
	public function test_coblocks_render_block_shape_divider_returns_horizontally_flipped_class() {
		$this->assertStringContainsString(
			'class="wp-block-coblocks-shape-divider is-horizontally-flipped mt-0 mb-0" style="color: #111;"',
			coblocks_render_coblocks_shape_divider_block( array( 'horizontalFlip' => true ) )
		);
	}

	/**
	 * Test that the block renders a custom height styles.
	 */
	public function test_coblocks_render_block_shape_divider_returns_custom_shape_height() {
		$this->assertStringContainsString(
			'class="wp-block-coblocks-shape-divider__svg-wrapper" style="height:123px;"',
			coblocks_render_coblocks_shape_divider_block( array( 'shapeHeight' => '123px' ) )
		);
		$this->assertStringContainsString(
			'class="wp-block-coblocks-shape-divider__alt-wrapper" style="height:123px;"',
			coblocks_render_coblocks_shape_divider_block( array( 'backgroundHeight' => '123px' ) )
		);
	}

	/**
	 * Test that the block renders margin classes.
	 */
	public function test_coblocks_render_block_shape_divider_returns_margin_classes() {
		$this->assertStringContainsString(
			'class="wp-block-coblocks-shape-divider mt-0" style="color: #111;"',
			coblocks_render_coblocks_shape_divider_block( array( 'noBottomMargin' => false ) )
		);
		$this->assertStringContainsString(
			'class="wp-block-coblocks-shape-divider mb-0" style="color: #111;"',
			coblocks_render_coblocks_shape_divider_block( array( 'noTopMargin' => false ) )
		);
	}

	/**
	 * Test that the block renders a custom SVG based on the shape style.
	 */
	public function test_coblocks_render_block_shape_divider_returns_custom_svg_based_on_shape_style() {
		$this->assertStringContainsString(
			'svg class="divider--waves"',
			coblocks_render_coblocks_shape_divider_block( array( 'className' => 'is-style-waves' ) )
		);

		$this->assertStringContainsString(
			'svg class="divider--sloped"',
			coblocks_render_coblocks_shape_divider_block( array( 'className' => 'is-style-sloped' ) )
		);

		$this->assertStringContainsString(
			'svg class="divider--rounded"',
			coblocks_render_coblocks_shape_divider_block( array( 'className' => 'is-style-rounded' ) )
		);

		$this->assertStringContainsString(
			'svg class="divider--angled"',
			coblocks_render_coblocks_shape_divider_block( array( 'className' => 'is-style-angled' ) )
		);

		$this->assertStringContainsString(
			'svg class="divider--triangle"',
			coblocks_render_coblocks_shape_divider_block( array( 'className' => 'is-style-triangle' ) )
		);

		$this->assertStringContainsString(
			'svg class="divider--pointed"',
			coblocks_render_coblocks_shape_divider_block( array( 'className' => 'is-style-pointed' ) )
		);

		$this->assertStringContainsString(
			'svg class="divider--hills"',
			coblocks_render_coblocks_shape_divider_block( array( 'className' => 'is-style-hills' ) )
		);

		$this->assertStringContainsString(
			'<svg class="divider--wavy"',
			coblocks_render_coblocks_shape_divider_block( array() )
		);
	}

	/**
	 * Test that the block renders the correct SVG markup for the selected shape.
	 */
	public function test_coblocks_render_block_shape_divider_returns_correct_svg_markup_for_selected_shape() {
		$rendered_block = coblocks_render_coblocks_shape_divider_block( array() );

		$this->assertStringContainsString( '<div class="wp-block-coblocks-shape-divider mt-0 mb-0"', $rendered_block );
		$this->assertStringContainsString( 'style="color: #111;"', $rendered_block );
		$this->assertStringContainsString( 'aria-hidden="true"', $rendered_block );
		$this->assertStringContainsString( '<div class="wp-block-coblocks-shape-divider__svg-wrapper" style="height:100px;">', $rendered_block );
		$this->assertStringContainsString( '<svg class="divider--wavy"', $rendered_block );
		$this->assertStringContainsString( 'viewBox="0 0 100 10"', $rendered_block );
		$this->assertStringContainsString( 'xmlns="http://www.w3.org/2000/svg"', $rendered_block );
		$this->assertStringContainsString( 'preserveAspectRatio="none"', $rendered_block );
		$this->assertStringContainsString( '<path d="m42.19.65c2.26-.25 5.15.04 7.55.53 2.36.49 7.09 2.35 10.05 3.57 7.58 3.22 13.37 4.45 19.26 4.97 2.36.21 4.87.35 10.34-.25s10.62-2.56 10.62-2.56v-6.91h-100.01v3.03s7.2 3.26 15.84 3.05c3.92-.07 9.28-.67 13.4-2.24 2.12-.81 5.22-1.82 7.97-2.42 2.72-.63 3.95-.67 4.98-.77z"', $rendered_block );
		$this->assertStringContainsString( 'fillRule="evenodd"', $rendered_block );
		$this->assertStringContainsString( 'transform="matrix(1 0 0 -1 0 10)"', $rendered_block );
		$this->assertStringContainsString( '<div class="wp-block-coblocks-shape-divider__alt-wrapper" style="height:50px;"></div>', $rendered_block );

	}
}

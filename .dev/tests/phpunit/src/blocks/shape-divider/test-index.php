<?php
/**
 * Test src/blocks/shape-divider/index.php
 *
 * @package CoBlocks
 */
class CoBlocks_Shape_Divider_Index_Tests extends WP_UnitTestCase {

	public function set_up() {
		parent::set_up();

		include_once COBLOCKS_PLUGIN_DIR . 'src/blocks/shape-divider/index.php';
		set_current_screen( 'edit-post' );
	}

	public function tear_down() {
		parent::tear_down();

		unset( $GLOBALS['current_screen'] );
	}

	/**
	 * Test that block renders with default attributes.
	 */
	public function test_coblocks_render_block_shape_divider_returns_default_block_with_default_attributes() {
		$rendered_block = coblocks_render_block_shape_divider( array() );

		$this->assertStringContainsString( 'class="wp-block-coblocks-shape-divider mt-0 mb-0" style="color: #111;"', $rendered_block );
		$this->assertStringContainsString( 'class="wp-block-coblocks-shape-divider__svg-wrapper" style="height:100px;"', $rendered_block );
		$this->assertStringContainsString( 'svg class="divider--wavy"', $rendered_block );
		$this->assertStringContainsString( 'class="wp-block-coblocks-shape-divider__alt-wrapper" style="height:50px;"', $rendered_block );

		// Test passing the default attributes renders exactly the same as no attributes.
		$rendered_block = coblocks_render_block_shape_divider( array(
			'shapeHeight' => '100px',
			'backgroundHeight' => '50px',
			'customColor' => '#111',
			'noBottomMargin' => true,
			'noTopMargin' => true,
		) );

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
			coblocks_render_block_shape_divider( array( 'color' => 'primary' ) )
		);

		$this->assertStringContainsString(
			'class="wp-block-coblocks-shape-divider mt-0 mb-0" style="color: #123;"',
			coblocks_render_block_shape_divider( array( 'customColor' => '#123' ) )
		);
	}

	/**
	 * Test that the block renders background color classes or custom color styles.
	 */
	public function test_coblocks_render_block_shape_divider_returns_background_color_classes_or_styles() {
		$this->assertStringContainsString(
			'class="wp-block-coblocks-shape-divider has-primary-background-color mt-0 mb-0" style="color: #111;"',
			coblocks_render_block_shape_divider( array( 'backgroundColor' => 'primary' ) )
		);

		$this->assertStringContainsString(
			'class="wp-block-coblocks-shape-divider mt-0 mb-0" style="color: #111; background-color: #123;"',
			coblocks_render_block_shape_divider( array( 'customBackgroundColor' => '#123' ) )
		);
	}

	/**
	 * Test that the block renders vertically flipped class.
	 */
	public function test_coblocks_render_block_shape_divider_returns_vertically_flipped_class() {
		$this->assertStringContainsString(
			'class="wp-block-coblocks-shape-divider is-vertically-flipped mt-0 mb-0" style="color: #111;"',
			coblocks_render_block_shape_divider( array( 'verticalFlip' => true ) )
		);
	}

	/**
	 * Test that the block renders vertically flipped class.
	 */
	public function test_coblocks_render_block_shape_divider_returns_horizontally_flipped_class() {
		$this->assertStringContainsString(
			'class="wp-block-coblocks-shape-divider is-horizontally-flipped mt-0 mb-0" style="color: #111;"',
			coblocks_render_block_shape_divider( array( 'horizontalFlip' => true ) )
		);
	}

	/**
	 * Test that the block renders a custom height styles.
	 */
	public function test_coblocks_render_block_shape_divider_returns_custom_shape_height() {
		$this->assertStringContainsString(
			'class="wp-block-coblocks-shape-divider__svg-wrapper" style="height:123px;"',
			coblocks_render_block_shape_divider( array( 'shapeHeight' => '123px' ) )
		);
		$this->assertStringContainsString(
			'class="wp-block-coblocks-shape-divider__alt-wrapper" style="height:123px;"',
			coblocks_render_block_shape_divider( array( 'backgroundHeight' => '123px' ) )
		);
	}

	/**
	 * Test that the block renders margin classes.
	 */
	public function test_coblocks_render_block_shape_divider_returns_margin_classes() {
		$this->assertStringContainsString(
			'class="wp-block-coblocks-shape-divider mt-0" style="color: #111;"',
			coblocks_render_block_shape_divider( array( 'noBottomMargin' => false ) )
		);
		$this->assertStringContainsString(
			'class="wp-block-coblocks-shape-divider mb-0" style="color: #111;"',
			coblocks_render_block_shape_divider( array( 'noTopMargin' => false ) )
		);
	}

	/**
	 * Test the file actions are hooked properly.
	 */
	public function test_file_actions() {
		$actions = [
			[ 'init', 'coblocks_register_block_shape_divider' ],
		];

		foreach ( $actions as $action_data ) {
			if ( ! has_action( $action_data[0], $action_data[1] ) ) {
				$this->fail( "$action_data[0] is not attached to $action_data[1]." );
			}
		}

		$this->assertTrue( true );
	}
}

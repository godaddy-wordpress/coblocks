<?php
/**
 * Test src/blocks/gist/index.php
 *
 * @package CoBlocks
 */
class CoBlocks_Gist_Index_Tests extends WP_UnitTestCase {

	public function setUp() {

		parent::setUp();

		include_once COBLOCKS_PLUGIN_DIR . 'src/blocks/gist/index.php';

		set_current_screen( 'edit-post' );

	}

	public function tearDown() {

		parent::tearDown();

		unset( $GLOBALS['current_screen'] );
	}

	private function render_block( $attributes = array() ) {
		return render_block( array(
			'blockName' => 'coblocks/gist',
			'attrs' => $attributes,
		) );
	}

	/**
	 * Test the file actions are hooked properly.
	 */
	public function test_file_actions() {

		$actions = [
			[ 'init', 'coblocks_register_block_gist' ],
		];

		foreach ( $actions as $action_data ) {

			$priority = isset( $action_data[2] ) ? $action_data[2] : 10;

			if ( ! has_action( $action_data[0], $action_data[1] ) ) {

				$this->fail( "$action_data[0] is not attached to $action_data[1]." );

			}
		}

		$this->assertTrue( true );

	}

	/**
	 * Test the gist block markup returns correctly.
	 */
	public function test_coblocks_render_block_gist() {
		$attributes = [
			'url' => 'https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7',
		];

		$this->assertEquals(
			$this->render_block( $attributes ),
			'<div class="wp-block-coblocks-gist"><script src="https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7.js?file="></script><noscript><a href="https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7#file-">View this gist on GitHub</a></noscript></div>'
		);
	}

	/**
	 * Test the gist block markup includes file url argument.
	 */
	public function test_coblocks_render_block_gist_file_url() {
		$attributes = [
			'url' => 'https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7',
			'file' => '01.php',
		];

		$this->assertEquals(
			$this->render_block( $attributes ),
			'<div class="wp-block-coblocks-gist"><script src="https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7.js?file=01.php"></script><noscript><a href="https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7#file-01-php">View this gist on GitHub</a></noscript></div>'
		);
	}

	/**
	 * Test the gist block markup renders the no-meta class when disabled.
	 */
	public function test_coblocks_render_block_gist_no_meta_class() {
		$attributes = [
			'url' => 'https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7',
			'meta' => false,
		];

		$this->assertEquals(
			$this->render_block( $attributes ),
			'<div class="no-meta wp-block-coblocks-gist"><script src="https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7.js?file="></script><noscript><a href="https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7#file-">View this gist on GitHub</a></noscript></div>'
		);
	}


	/**
	 * Test the gist block markup renders the figcaption when caption attribute exists.
	 */
	public function test_coblocks_render_block_gist_figcaption() {
		$attributes = [
			'url' => 'https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7',
			'caption' => 'caption',
		];

		$this->assertEquals(
			$this->render_block( $attributes ),
			'<div class="wp-block-coblocks-gist"><script src="https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7.js?file="></script><noscript><a href="https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7#file-">View this gist on GitHub</a></noscript><figcaption>caption</figcaption></div>'
		);
	}

	/**
	 * Test the share block is registered.
	 *
	 * @expectedIncorrectUsage WP_Block_Type_Registry::register
	 */
	public function test_coblocks_register_block_gist() {

		coblocks_register_block_gist();

		$expected_registered_blocks = [
			'coblocks/gist',
		];

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

		foreach ( $expected_registered_blocks as $coblocks_block ) {

			if ( ! array_key_exists( $coblocks_block, $registered_blocks ) ) {

				$this->fail( "$coblocks_block is not registered." );

			}
		}

		$this->assertTrue( true );

	}
}

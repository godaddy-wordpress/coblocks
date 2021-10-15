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

	/**
	 * Test that the embed handler renders nothing if we have an invalid gist url.
	 */
	public function test_coblocks_block_gist_handler_returns_empty_string_without_proper_string_matches() {
		// Ensure empty string response with invalid params.
		$this->assertSame( coblocks_block_gist_handler( array() ), '' );
		$this->assertSame( coblocks_block_gist_handler( array( 'http://godaddy.com' ) ), '' );
		$this->assertSame( coblocks_block_gist_handler( array( 'https://gist.github.com' ) ), '' );

		$this->assertNotEmpty(
			coblocks_block_gist_handler( array(
				'https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7',
				'someuser/a04f4e14e3cd3b6d48157ea0706114f7'
			) )
		);
	}

	/**
	 * Test that the embed handler returns the proper Gist embed code.
	 */
	public function test_coblocks_block_gist_handler_returns_valid_embed() {
		$gist_url = 'https://gist.github.com/someuser/a04f4e14e3cd3b6d48157ea0706114f7';
		$gist_path = 'someuser/a04f4e14e3cd3b6d48157ea0706114f7';

		$this->assertEquals(
			coblocks_block_gist_handler( array( $gist_url, $gist_path ) ),
			'<script src="https://gist.github.com/' . $gist_path . '.js"></script><noscript><a href="' . $gist_url . '">View this gist on GitHub</a></noscript>'
		);
	}

	/**
	 * Test the file actions are hooked properly.
	 */
	public function test_file_actions() {
		$actions = [
			[ 'init', 'coblocks_register_gist_oembed' ],
		];

		foreach ( $actions as $action_data ) {
			if ( ! has_action( $action_data[0], $action_data[1] ) ) {
				$this->fail( "$action_data[0] is not attached to $action_data[1]." );
			}
		}

		$this->assertTrue( true );
	}
}

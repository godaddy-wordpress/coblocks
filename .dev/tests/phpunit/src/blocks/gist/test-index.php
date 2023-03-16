<?php
/**
 * Test src/blocks/gist/index.php
 *
 * @package CoBlocks
 */
class CoBlocks_Gist_Index_Tests extends WP_UnitTestCase {

	public function set_up(): void {
		parent::set_up();

		include_once COBLOCKS_PLUGIN_DIR . 'src/blocks/gist/index.php';
		set_current_screen( 'edit-post' );
	}

	public function tear_down(): void {
		parent::tear_down();

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
			"<span class='coblocks-gist__container' style='pointer-events: none'><script src=\"https://gist.github.com/{$gist_path}.js\">\n\n</script>\n<a class=\"gist-block__container\" href=\"{$gist_url}\" target=\"_blank\">View this gist on GitHub</a></span>"
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

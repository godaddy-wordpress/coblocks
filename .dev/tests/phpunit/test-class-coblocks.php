<?php
/**
 * Test class-coblocks.php
 *
 * @package CoBlocks
 */
class CoBlocks_Tests extends WP_UnitTestCase {

	public function set_up() {

		parent::set_up();

		set_current_screen( 'dashboard' );

		$reflection = new ReflectionClass( new CoBlocks() );
		$instance   = $reflection->getProperty( 'instance' );

		$instance->setAccessible( true );
		$instance->setValue( null, null );
		$instance->setAccessible( false );

		do_action( 'plugins_loaded' );

	}

	public function tear_down() {

		parent::tear_down();

		unset( $GLOBALS['current_screen'] );

	}

	public function test_coblocks() {

		$this->assertTrue( is_a( coblocks(), 'CoBlocks' ) );

	}

	/**
	 * Test the clone function
	 *
	 * @expectedIncorrectUsage __clone
	 */
	public function test_clone() {

		clone coblocks();

	}

	/**
	 * Test the wakeup function
	 *
	 * @expectedIncorrectUsage __wakeup
	 */
	public function test_wakeup() {

		unserialize( serialize( coblocks() ) );

	}

	/**
	 * Assert the plugin data returns what is expected
	 */
	public function test_constants() {

		$reflection_method = new ReflectionMethod( 'CoBlocks', 'instance' );

		$reflection_method->invoke( coblocks() );

		$expected = [
			'version' => '2.21.3',
			'plugin_dir'  => str_replace( '.dev/tests/phpunit/', '', plugin_dir_path( __FILE__ ) ),
			'plugin_url'  => str_replace( '.dev/tests/phpunit/', '', plugin_dir_url( __FILE__ ) ),
			'plugin_file' => str_replace( '.dev/tests/phpunit/test-class-coblocks.php', 'class-coblocks.php', __FILE__ ),
			'plugin_base' => str_replace( '.dev/tests/phpunit/test-class-coblocks.php', 'class-coblocks.php', plugin_basename( __FILE__ ) ),
			'review_url'  => 'https://wordpress.org/support/plugin/coblocks/reviews/?filter=5',
		];

		$check = [
			'version'     => COBLOCKS_VERSION,
			'plugin_dir'  => COBLOCKS_PLUGIN_DIR,
			'plugin_url'  => COBLOCKS_PLUGIN_URL,
			'plugin_file' => COBLOCKS_PLUGIN_FILE,
			'plugin_base' => COBLOCKS_PLUGIN_BASE,
			'review_url'  => COBLOCKS_REVIEW_URL,
		];

		$this->assertEquals( $expected, $check );

	}

	/**
	 * Test core plugin files were included
	 */
	public function test_included_files() {

		$check_files = [
			COBLOCKS_PLUGIN_DIR . 'includes/class-coblocks-block-assets.php',
			COBLOCKS_PLUGIN_DIR . 'includes/class-coblocks-register-blocks.php',
			COBLOCKS_PLUGIN_DIR . 'includes/class-coblocks-generated-styles.php',
			COBLOCKS_PLUGIN_DIR . 'includes/class-coblocks-body-classes.php',
			COBLOCKS_PLUGIN_DIR . 'includes/class-coblocks-form.php',
			COBLOCKS_PLUGIN_DIR . 'includes/class-coblocks-font-loader.php',
			COBLOCKS_PLUGIN_DIR . 'includes/class-coblocks-post-meta.php',
			COBLOCKS_PLUGIN_DIR . 'includes/class-coblocks-google-map-block.php',
			COBLOCKS_PLUGIN_DIR . 'includes/class-coblocks-accordion-ie-support.php',
			COBLOCKS_PLUGIN_DIR . 'includes/get-dynamic-blocks.php',
			COBLOCKS_PLUGIN_DIR . 'includes/admin/class-coblocks-action-links.php',
			COBLOCKS_PLUGIN_DIR . 'includes/admin/class-coblocks-install.php',
		];

		$this->assertTrue( ! empty( array_intersect( $check_files, get_included_files() ) ) );

	}

	/**
	 * The the init actions are called
	 */
	public function test_init_actions() {

		$actions = [
			[ 'plugins_loaded', 'load_textdomain', 99 ],
			[ 'enqueue_block_editor_assets', 'block_localization' ],
		];

		foreach ( $actions as $action_data ) {

			$priority = isset( $action_data[2] ) ? $action_data[2] : 10;

			if ( ! has_action( $action_data[0], [ coblocks(), $action_data[1] ] ) ) {

				$this->fail( "$action_data[0] is not attached to CoBlocks:$action_data[1]. It might also have the wrong priority (validated priority: $priority)" );

			}
		}

		$this->assertTrue( true );

	}

	/**
	 * Test the asset source directory for js assets
	 */
	public function test_js_asset_source() {

		$this->assertRegexp( '/\/coblocks\/dist\/js\//', coblocks()->asset_source( 'js' ) );

	}

	/**
	 * Test the asset source directory for css assets
	 */
	public function test_css_asset_source() {

		$this->assertRegexp( '/\/coblocks\/dist\/css\//', coblocks()->asset_source( 'css' ) );

	}

	/**
	 * Test the asset source directory for css assets
	 */
	public function test_custom_css_asset_source() {

		$this->assertRegexp( '/\/coblocks\/dist\/css\/custom/', coblocks()->asset_source( 'css/custom' ) );

	}

	/**
	 * Test the text domain loads correctly
	 */
	public function test_text_domain() {

		$this->markTestSkipped( 'Todo: Write tests for text domain.' );

	}

	/**
	 * Test all expected final build assets exist
	 */
	public function test_final_build_assets_exist() {

		$expected_assets = [
			'js'  => [
				'dist/coblocks-1.js',
				'dist/js/coblocks-accordion-polyfill.js',
				'dist/js/coblocks-checkbox-required.js',
				'dist/js/coblocks-fromEntries.js',
				'dist/js/coblocks-google-maps.js',
				'dist/js/coblocks-google-recaptcha.js',
				'dist/js/coblocks-lightbox.js',
				'dist/js/coblocks-masonry.js',
				'dist/js/coblocks-slick-initializer-front.js',
				'dist/js/coblocks-slick-initializer.js',
				'dist/js/vendors/flickity.js',
				'dist/js/vendors/slick.js',
				'src/js/coblocks-accordion-polyfill.js',
				'src/js/coblocks-checkbox-required.js',
				'src/js/coblocks-fromEntries.js',
				'src/js/coblocks-google-maps.js',
				'src/js/coblocks-google-recaptcha.js',
				'src/js/coblocks-lightbox.js',
				'src/js/coblocks-masonry.js',
				'src/js/coblocks-slick-initializer-front.js',
				'src/js/coblocks-slick-initializer.js',
			],
			'css' => [
				'dist/coblocks-1.css',
				'dist/style-coblocks-1.css',
			],
		];

		foreach ( $expected_assets as $asset_type => $assets ) {

			foreach ( $assets as $path_to_asset ) {

				$minfied_asset_string = ( false !== strpos( $path_to_asset, 'dist/' ) ) ? 'Minified' : 'Unminified';

				$this->assertTrue(
					file_exists( COBLOCKS_PLUGIN_DIR . $path_to_asset ),
					"${minfied_asset_string} ${asset_type} asset not found: " . COBLOCKS_PLUGIN_DIR . "${path_to_asset}"
				);

			}

		}

	}


}

<?php
/**
 * Test includes/src/blocks/posts/test-index.php
 *
 * @package CoBlocks
 */
class CoBlocks_Layout_Selector_Tests extends WP_UnitTestCase {

	public static function set_up_before_class() {
		require_once COBLOCKS_PLUGIN_DIR . 'src/extensions/layout-selector/index.php';
	}

    public function set_up() {
		parent::set_up();

		set_current_screen( 'dashboard' );

		// Reset queued scripts and styles.
		global $wp_scripts, $wp_styles;
		$wp_scripts = new WP_Scripts();
		$wp_styles = new WP_Styles();
	}

	public function tear_down() {
		parent::tear_down();

		unset( $GLOBALS['current_screen'] );
	}

	/**
	 * Test that the default categories are returned.
	 */
	public function test_returns_default_categories() {
		$categories_slugs = wp_list_pluck(
			coblocks_layout_selector_categories(),
			'slug'
		);

		$this->assertContains( 'about', $categories_slugs );
		$this->assertContains( 'contact', $categories_slugs );
		$this->assertContains( 'home', $categories_slugs );
		$this->assertContains( 'portfolio', $categories_slugs );
	}

	/**
	 * Test that the categories can be filtered.
	 */
	public function test_categories_can_be_filtered() {
		add_filter(
			'coblocks_layout_selector_categories',
			function() {
				return array( array( 'slug' => 'filtered', 'title' => 'filtered' ) );
			}
		);

		$categories_slugs = wp_list_pluck(
			coblocks_layout_selector_categories(),
			'slug'
		);

		$this->assertNotContains( 'about', $categories_slugs );
		$this->assertNotContains( 'contact', $categories_slugs );
		$this->assertNotContains( 'home', $categories_slugs );
		$this->assertNotContains( 'portfolio', $categories_slugs );

		$this->assertContains( 'filtered', $categories_slugs );
	}

	/**
	 * Test that no default layouts are returned.
	 */
	public function test_returns_no_default_layouts() {
		$layouts = wp_list_pluck(
			coblocks_layout_selector_layouts(),
			'label'
		);

		$this->assertEmpty( $layouts );
	}

	/**
	 * Test that layouts can be filtered.
	 */
	public function test_layouts_can_be_filtered() {
		add_filter(
			'coblocks_layout_selector_layouts',
			function() {
				return array(
					array(
						'category' => 'testing',
						'label'    => 'testing',
						'blocks'   => array(),
					)
				);
			}
		);

		$layouts = wp_list_pluck(
			coblocks_layout_selector_layouts(),
			'label'
		);

		$this->assertNotEmpty( $layouts );

		$this->assertContains( 'testing', $layouts );
	}

	/**
	 * Test that the layout selector data is localized.
	 */
	public function test_layout_selector_is_localized() {
		global $wp_scripts;

		$this->go_to( '/wp-admin/post-new.php?post_type=page' );
		set_current_screen( 'page' );

		// Load dependent editor scripts.
		$coblocks_block_assets = new CoBlocks_Block_Assets();
		$coblocks_block_assets->editor_assets();

		coblocks_localize_layout_selector();
		$localized = $wp_scripts->get_data( 'coblocks-editor', 'data' );

		$layouts = coblocks_layout_selector_layouts();
		$categories = coblocks_layout_selector_categories();

		$this->assertContains( 'var coblocksLayoutSelector', $localized );
		$this->assertContains( '"categories":' . json_encode( $categories ), $localized );
		$this->assertContains( '"layouts":' . json_encode( $layouts ), $localized );
		$this->assertContains( '"postTypeEnabled":"1"', $localized );
	}

	/**
	 * Test that the layout selector is disabled for non "page" post types.
	 */
	public function test_post_type_enabled_is_false_for_non_page_post_types() {
		global $wp_scripts;

		$this->go_to( '/wp-admin/post-new.php?post_type=post' );
		set_current_screen( 'post' );

		// Load dependent editor scripts.
		$coblocks_block_assets = new CoBlocks_Block_Assets();
		$coblocks_block_assets->editor_assets();

		coblocks_localize_layout_selector();
		$localized = $wp_scripts->get_data( 'coblocks-editor', 'data' );

		$this->assertContains( 'var coblocksLayoutSelector', $localized );
		$this->assertContains( '"postTypeEnabled":""', $localized );
	}
}

<?php
/**
 * Test includes/class-coblocks-accordion-ie-support.php
 *
 * @package CoBlocks
 */
class CoBlocks_Accordion_IE_Support_Tests extends WP_UnitTestCase {

	public function set_up() {

		parent::set_up();

		set_current_screen( 'edit-post' );

	}

	public function tear_down() {

		parent::tear_down();

	}

	/**
	 * Test the class properties are what we expect
	 */
	public function test_properties() {

		$reflection = new ReflectionClass( new CoBlocks_Accordion_IE_Support() );

		$instance = $reflection->getProperty( 'instance' );
		$instance->setAccessible( true );
		$instance->setValue( null, null );
		$instance->setAccessible( false );

		$new_reflection = new CoBlocks_Accordion_IE_Support();

		$new_reflection::register();

		$expected = [
			'slug' => 'coblocks',
			'url'  => str_replace( '/.dev/tests/phpunit', '', untrailingslashit( plugins_url( '/', dirname( __FILE__ ) ) ) ), // Fix inconsistencies path between plugin and unit tests
		];

		$slug = $reflection->getProperty( 'slug' );
		$url  = $reflection->getProperty( 'url' );

		$slug->setAccessible( true );
		$url->setAccessible( true );

		$check = [
			'slug' => $slug->getValue( $new_reflection ),
			'url'  => $url->getValue( $new_reflection ),
		];

		$this->assertEquals( $expected, $check );

	}

	/**
	 * Test the plugin does not load scripts when the global post is empty
	 */
	public function test_null_assets() {

		$reflection = new ReflectionClass( new CoBlocks_Accordion_IE_Support() );

		$instance = $reflection->getProperty( 'instance' );
		$instance->setAccessible( true );
		$instance->setValue( null, null );
		$instance->setAccessible( false );

		$new_reflection = new CoBlocks_Accordion_IE_Support();

		$this->assertNull( $new_reflection->load_assets() );

	}

	/**
	 * Test the plugin scripts were loaded correctly
	 */
	public function test_assets() {

		$reflection = new ReflectionClass( new CoBlocks_Accordion_IE_Support() );

		$instance = $reflection->getProperty( 'instance' );
		$instance->setAccessible( true );
		$instance->setValue( null, null );
		$instance->setAccessible( false );

		$new_reflection = new CoBlocks_Accordion_IE_Support();

		$post_id = wp_insert_post(
			[
				'post_author'  => 1,
				'post_content' => '<!-- wp:coblocks/accordion --><div class="wp-block-coblocks-accordion"><!-- wp:coblocks/accordion-item {"title":"Accordion Title 1"} --><div class="wp-block-coblocks-accordion-item"><details><summary class="wp-block-coblocks-accordion-item__title">Accordion Title 1</summary><div class="wp-block-coblocks-accordion-item__content"><!-- wp:paragraph {"placeholder":"Add content…"} --><p>Accordion Content 1</p><!-- /wp:paragraph --></div></details></div><!-- /wp:coblocks/accordion-item --></div><!-- /wp:coblocks/accordion -->',
				'post_title'   => 'CoBlocks Accordion',
				'post_status'  => 'publish',
			]
		);

		update_post_meta( $post_id, '_coblocks_accordion_ie_support', "'true'" );

		global $post;

		$post = get_post( $post_id );

		$new_reflection->load_assets();

		do_action( 'wp_enqueue_scripts' );

		$wp_scripts = wp_scripts();

		$this->assertContains( 'coblocks-accordion-polyfill', $wp_scripts->queue );

	}
}

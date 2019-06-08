<?php
/**
 * Test WPIcons Pro base plugin file
 *
 * @package WPIcons Pro Pro
 * @since 2.0.0
 */

class Accordion_IE_Support_Tests extends WP_UnitTestCase {

	public function setUp() {

		parent::setUp();

	}

	public function tearDown() {

		parent::tearDown();

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
			'version' => '1.9.6',
			'slug'    => 'coblocks',
			// 'url'     => '/wp-content/plugins/coblocks',
		];

		$version = $reflection->getProperty( '_version' );
		$slug    = $reflection->getProperty( '_slug' );
		$url     = $reflection->getProperty( '_url' );

		$version->setAccessible( true );
		$slug->setAccessible( true );
		$url->setAccessible( true );

		$check = [
			'version' => $version->getValue( $new_reflection ),
			'slug'    => $slug->getValue( $new_reflection ),
			// 'url'     => $url->getValue( $new_reflection ),
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

		global $post;

		$post = new stdClass();

		$post->ID = 1;

		$new_reflection->load_assets();

		$this->assertTrue( true );

	}
}

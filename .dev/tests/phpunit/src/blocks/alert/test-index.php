<?php
/**
 * Test includes/block-migrate/class-coblocks-block-migration.php
 *
 * @package CoBlocks
 */
class CoBlocks_Block_Author_Migration_Test extends WP_UnitTestCase {
	private $instance;

	public function set_up() {
		$this->instance = new CoBlocks_Author_Migration;
		// $this->instance = new CoBlocks_Block_Migration_Runner;
	}

	public function tear_down() {
		$this->instance = null;
	}

	public function test_author_block_migration_attributes() {
		$parsed_block = parse_blocks(
			<<<BLOCKHTML
			<!-- wp:coblocks/author {"imgId":58,"className":"custom-class","backgroundColor":"tertiary","fontSize":"large","style":{"color":{"text":"#c61616"}}} -->
			<div class="wp-block-coblocks-author custom-class has-tertiary-background-color has-text-color has-background has-large-font-size" style="color:#c61616"><figure class="wp-block-coblocks-author__avatar"><img alt="Author Name Here" class="wp-block-coblocks-author__avatar-img" src="https://wxn.a14.myftpupload.com/wp-content/uploads/2023/01/qtq80-vLRESQ.jpeg"/></figure><div class="wp-block-coblocks-author__content"><span class="wp-block-coblocks-author__name">Author Name Here</span><p class="wp-block-coblocks-author__biography">This is a cool author bio</p><!-- wp:button {"placeholder":"Author link…"} -->
			<div class="wp-block-button"><a class="wp-block-button__link wp-element-button">This is button text</a></div>
			<!-- /wp:button --></div></div>
			<!-- /wp:coblocks/author -->
			BLOCKHTML
		);

		$migrated_block_attributes = $this->instance->migrate( $parsed_block[0], $parsed_block[1] );

        var_dump($migrated_block_attributes);
        exit;
	}
}

// class Block_Author_Migration_Mock extends CoBlocks_Author_Migration {

	// public static function block_name()
	// {
	// 	return 'coblocks/author';
	// }

	// protected function migrate_attributes()
	// {
	// 	return array();
	// }
// }

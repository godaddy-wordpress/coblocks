<?php
/**
 * Test includes/block-migrate/class-coblocks-gallery-masonry-migration.php
 *
 * @package CoBlocks
 */
class CoBlocks_Gallery_Masonry_Migration_Test extends WP_UnitTestCase {
	private $instance;

	public function set_up() {
		$this->instance = new CoBlocks_Gallery_Masonry_Migration();
	}

	public function tear_down() {
		$this->instance = null;
	}

	public function test_migrate() {
		$parsed_blocks = parse_blocks(
			<<<BLOCKHTML
			<!-- wp:coblocks/gallery-masonry {"linkTo":"none","gutter":"custom","gutterCustom":"0"} -->
			<figure class="wp-block-coblocks-gallery-masonry masonry-grid has-custom-gutter" style="--coblocks-custom-gutter:0em">
				<!-- wp:image {"id":74,"sizeSlug":"large"} -->
				<figure class="wp-block-image size-large">
					<img src="http://localhost:9998/wp-content/uploads/2022/03/01-1024x578.jpg" alt="Image gallery image" class="wp-image-74" />
				</figure>
				<!-- /wp:image -->

				<!-- wp:image {"id":73,"sizeSlug":"large"} -->
				<figure class="wp-block-image size-large">
					<img src="http://localhost:9998/wp-content/uploads/2022/03/07-1024x578.jpg" alt="Image gallery image" class="wp-image-73" />
				</figure>
				<!-- /wp:image -->
			</figure>
			<!-- /wp:coblocks/gallery-masonry -->
			BLOCKHTML
		);
		$block_attributes = $this->instance->migrate( $parsed_blocks[0]['attrs'], $parsed_blocks[0]['innerHTML'] );

		$this->assertIsArray( $block_attributes );
		$this->assertEqualSetsWithIndex(
			array(),
			$block_attributes,
		);
	}
}

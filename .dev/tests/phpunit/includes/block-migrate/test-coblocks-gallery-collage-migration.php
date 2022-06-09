<?php
/**
 * Test includes/block-migrate/class-coblocks-gallery-collage-migration.php
 *
 * @package CoBlocks
 */
class CoBlocks_Gallery_Collage_Migration_Test extends WP_UnitTestCase {
	private $instance;

	public function set_up() {
		$this->instance = new CoBlocks_Gallery_Collage_Migration();
	}

	public function tear_down() {
		$this->instance = null;
	}

	public function test_migrate() {
		$parsed_blocks = parse_blocks(
			'<!-- wp:coblocks/gallery-collage -->
			<div aria-label="Collage Gallery" class="wp-block-coblocks-gallery-collage alignwide has-small-gutter">
				<ul>
					<li class="wp-block-coblocks-gallery-collage__item item-1">
						<figure class="wp-block-coblocks-gallery-collage__figure">
							<img alt="Image gallery image" class="wp-image-74" data-id="74" data-index="0" src="http://localhost:9998/wp-content/uploads/2022/03/01-1024x578.jpg" />
						</figure>
					</li>
					<li class="wp-block-coblocks-gallery-collage__item item-2">
						<figure class="wp-block-coblocks-gallery-collage__figure">
							<img alt="Image gallery image" class="wp-image-73" data-id="73" data-index="1" src="http://localhost:9998/wp-content/uploads/2022/03/07-1024x578.jpg" />
						</figure>
					</li>
				</ul>
			</div>
			<!-- /wp:coblocks/gallery-collage -->'
		);
		$block_attributes = $this->instance->migrate( $parsed_blocks[0]['attrs'], $parsed_blocks[0]['innerHTML'] );

		$this->assertIsArray( $block_attributes );
		$this->assertEqualSetsWithIndex(
			array(
				'className' => 'is-style-collage',
				'align' => 'wide',
				'images' => array(
					array(
						'url' => 'http://localhost:9998/wp-content/uploads/2022/03/01-1024x578.jpg',
						'alt' => 'Image gallery image',
					),
					array(
						'url' => 'http://localhost:9998/wp-content/uploads/2022/03/07-1024x578.jpg',
						'alt' => 'Image gallery image',
					)
				),
			),
			$block_attributes
		);
	}
}

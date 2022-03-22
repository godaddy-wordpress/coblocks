<?php
/**
 * Test includes/block-migrate/class-coblocks-gallery-stacked-migration.php
 *
 * @package CoBlocks
 */
class CoBlocks_Gallery_Stacked_Migration_Test extends WP_UnitTestCase {
	private $instance;

	public function set_up() {
		$this->instance = new CoBlocks_Gallery_Stacked_Migration();
	}

	public function tear_down() {
		$this->instance = null;
	}

	public function test_migrate() {
		$parsed_blocks = parse_blocks(
			<<<BLOCKHTML
			<!-- wp:coblocks/gallery-stacked -->
			<div class="wp-block-coblocks-gallery-stacked">
				<ul class="coblocks-gallery has-no-alignment has-fullwidth-images has-custom-gutter" style="--coblocks-custom-gutter:0em">
					<li class="coblocks-gallery--item">
						<figure class="coblocks-gallery--figure">
							<img alt="" class="wp-image-74 has-shadow-none" data-id="74" data-imglink="" data-link="http://localhost:9998/?attachment_id=74" src="http://localhost:9998/wp-content/uploads/2022/03/01-1024x578.jpg" />
						</figure>
					</li>
					<li class="coblocks-gallery--item">
						<figure class="coblocks-gallery--figure">
							<img alt="" class="wp-image-73 has-shadow-none" data-id="73" data-imglink="" data-link="http://localhost:9998/?attachment_id=73" src="http://localhost:9998/wp-content/uploads/2022/03/07-1024x578.jpg" />
						</figure>
					</li>
				</ul>
			</div>
			<!-- /wp:coblocks/gallery-stacked -->
			BLOCKHTML
		);
		$block_attributes = $this->instance->migrate( $parsed_blocks[0]['innerHTML'] );

		$this->assertIsArray( $block_attributes );
		$this->assertEqualSetsWithIndex(
			array(
				'className' => 'is-style-compact',
				'images' => array(
					array(
						'link' => 'http://localhost:9998/?attachment_id=74',
						'url' => 'http://localhost:9998/wp-content/uploads/2022/03/01-1024x578.jpg'
					),
					array(
						'link' => 'http://localhost:9998/?attachment_id=73',
						'url' => 'http://localhost:9998/wp-content/uploads/2022/03/07-1024x578.jpg'
					)
				),
			),
			$block_attributes,
		);
	}
}

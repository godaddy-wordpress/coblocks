<?php
/**
 * CoBlocks_Posts_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Posts_Migration
 *
 * Define how a coblocks/gallery-masonry block should migrate into a core/gallery block.
 */
class CoBlocks_Posts_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	protected function block_name() {
		return 'coblocks/posts';
	}

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @inheritDoc
	 */
	protected function migrate_attributes() {
		return array_filter(
			array_merge(
				$this->posts_attributes()
			)
		);
	}

	/**
	 * Calculate attributes applied to the gallery.
	 *
	 * @return array attributes found and their values.
	 */
	private function posts_attributes() {
		return array(
			// 'postsToShow'   => $this->get_attribute_from_classname( 'has-filter-', $this->block_wrapper() ),
			'postsToShow' => '2',

			// 'excerptLength'    => $this->get_attribute_from_classname( 'align', $this->block_wrapper() ),
			// 'listPosition' => $this->get_attribute_from_classname( 'has-lightbox', $this->block_wrapper() ),
			// 'columns' => $this->get_attribute_from_classname( 'has-lightbox', $this->block_wrapper() ),
			// 'order' => $this->get_attribute_from_classname( 'has-lightbox', $this->block_wrapper() ),
			// 'orderBy' => $this->get_attribute_from_classname( 'has-lightbox', $this->block_wrapper() ),
			// 'categories' => $this->get_attribute_from_classname( 'has-lightbox', $this->block_wrapper() ),
			// 'gutter' => $this->get_attribute_from_classname( 'has-lightbox', $this->block_wrapper() ),
			// 'postFeedType' => $this->get_attribute_from_classname( 'has-lightbox', $this->block_wrapper() ),
			// 'externalRssUrl' => $this->get_attribute_from_classname( 'has-lightbox', $this->block_wrapper() ),
		);
	}
}

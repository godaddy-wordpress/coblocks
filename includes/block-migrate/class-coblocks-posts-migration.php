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
		// TODO: must try to work with categories.
		// `core/query` block attributes.
		// 	'posts_per_page'   => $attributes['postsToShow'],
		// 	'post_status'      => 'publish',
		// 	'order'            => $attributes['order'],
		// 	'orderby'          => $attributes['orderBy'],
		// 	'suppress_filters' => false,
		// 	'post__not_in'     => array( $post->ID ),

		// conditonally overwrite any of these attributes. 

		$default_attributes =[
		"className" => '',
		// "align" =>
		// 	"type": "string"
		// },
		"postFeedType" => "internal",
		"externalRssUrl" => "",
		"postsToShow" => 2,
		"displayPostContent" => true,
		"displayPostDate" => true,
		"displayPostLink" => false,
		"postLink" => "Read more",
		"excerptLength" => 12,
		"imageSize" => "medium",
		"imageStyle" =>"square",
		"listPosition" => "right",
		"columns" => 2,
		"order" => "desc",
		"orderBy" => "date",
		// "categories" =>
		// 	"type": "array",
		// 	"items" =>
		// 		"type": "object"
		// 	}
		// },
		// "categoryRelation" =>
		// 	"type": "string",
		// 	"default": "or"
		];
		// return $default_attributes;
		return array(
			"perPage" => $defaultAttributes['postsToShow'],
			"order" => $defaultAttributes['order'],
			"orderBy" => $defaultAttributes['orderBy'],
		);
	}
}

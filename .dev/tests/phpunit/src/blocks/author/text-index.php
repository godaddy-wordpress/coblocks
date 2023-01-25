<?php
/**
 * Test includes/block-migrate/class-coblocks-block-migration.php
 *
 * @package CoBlocks
 */
class CoBlocks_Block_Author_Migration_Test extends WP_UnitTestCase {
	private $instance;

	public function set_up() {
		$this->instance = new CoBlocks_Author_Migration();
	}

	public function tear_down() {
		$this->instance = null;
	}

	public function test_author_block_migration_attributes() {
		$parsed_block = parse_blocks(
			<<<BLOCKHTML

			BLOCKHTML
		);

		$migrated_block_attributes = $this->instance->migrate( $parsed_block[0]['attrs'], $parsed_block[0]['innerHTML'] );

		$expected_attributes = array(
            "imgId"=> 55,
            "className"=> "custom-class coblocks-author-columns",
            "backgroundColor"=> "tertiary",
            "textColor"=> "primary",
            "fontSize"=> "large",
            "animation"=> "fadeIn",
            "name"=> "Author Name Here",
            "biography"=> '<strong>T</strong><em>h</em><a href="https://example.com" data-type="URL" data-id="https://example.com">i</a><mark style="background-color:rgba(0, 0, 0, 0);color:#0600ff" class="has-inline-color">s</mark> <code>i</code><img class="wp-image-11" style="width: 150px;" src="https://wxn.a14.myftpupload.com/wp-content/uploads/2023/01/product-image-2.jpg" alt=""> <kbd>a</kbd> <s>c</s><sub>o</sub><sup>o</sup><span class="uppercase">l</span> author bio',
            "imgUrl"=> "http://localhost:8888/wp-content/uploads/2023/01/vnech-tee-green-1-150x150.jpg",
		);

		// We expect recursive_array_diff to return empty array if expected attributes match migrated attributes.
		$this->assertTrue( empty( $this->recursive_array_diff( $expected_attributes, $migrated_block_attributes ) ) );
	}

	public function test_author_block_migration_attributes_custom_colors() {
		$parsed_block = parse_blocks(
			<<<BLOCKHTML

			BLOCKHTML
		);

		$migrated_block_attributes = $this->instance->migrate( $parsed_block[0]['attrs'], $parsed_block[0]['innerHTML'] );

		$expected_attributes = array(

		);

		// We expect recursive_array_diff to return empty array if expected attributes match migrated attributes.
		$this->assertTrue( empty( $this->recursive_array_diff( $expected_attributes, $migrated_block_attributes ) ) );
	}

	public function test_author_block_migration_attributes_theme_colors() {
		$parsed_block = parse_blocks(
			<<<BLOCKHTML

			BLOCKHTML
		);

		$migrated_block_attributes = $this->instance->migrate( $parsed_block[0]['attrs'], $parsed_block[0]['innerHTML'] );

		$expected_attributes = array(

		);

		// We expect recursive_array_diff to return empty array if expected attributes match migrated attributes.
		$this->assertTrue( empty( $this->recursive_array_diff( $expected_attributes, $migrated_block_attributes ) ) );
	}

	/**
	 * Compares two arrays recursively and returns the differences.
	 *
	 * This function compares two arrays recursively by checking each key and value of the arrays.
	 * If a key exists in both arrays, but the value differs, that key and value is added to the
	 * returned array of differences. If a key exists in one array but not the other, the key and
	 * value is added to the returned array of differences.
	 *
	 * @param array $array1 This should be the expected attributes.
	 * @param array $array2 This should be the migrated block attributes.
	 *
	 * @return array An array of the attributes that are missing from the expected array.
	 */
	function recursive_array_diff( $array1, $array2 ) {
		$diff = array();

		foreach ( $array1 as $key => $value ) {
			// If the key exists in the second array.
			if ( array_key_exists( $key, $array2 ) ) {
				// If the value is an array, recursively compare the arrays.
				if ( is_array( $value ) ) {
					$recursive_diff = $this->recursive_array_diff( $value, $array2[ $key ] );
					// If there are differences, add the key and differences to the final diff array.
					if ( count( $recursive_diff ) ) {
						$diff[ $key ] = $recursive_diff; }
				} else {
					// If the values are not the same, add the key and value to the final diff array.
					if ( $value != $array2[ $key ] ) {
						$diff[ $key ] = $value;
					}
				}
			} else {
				// If the key does not exist in the second array, add the key and value to the final diff array.
				$diff[ $key ] = $value;
			}
		}
		return $diff;
	}
}

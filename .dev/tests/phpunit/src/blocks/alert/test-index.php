<?php
/**
 * Test includes/block-migrate/class-coblocks-block-migration.php
 *
 * @package CoBlocks
 */
class CoBlocks_Block_Alert_Migration_Test extends WP_UnitTestCase {
	private $instance;

	public function set_up() {
		$this->instance = new CoBlocks_Alert_Migration;
	}

	public function tear_down() {
		$this->instance = null;
	}

	public function test_alert_block_migration_attributes() {
		$parsed_block = parse_blocks(
			<<<BLOCKHTML
			<div class="wp-block-coblocks-alert has-text-align-center is-style-warning extra-text-class coblocks-animate has-custom-font has-custom-weight has-custom-lineheight has-custom-letterspacing" style="font-weight:300;font-family:Barlow Condensed;line-height:1;letter-spacing:1.5px;font-size:28px" aria-label="Alert section of type warning" data-coblocks-animation="slideInLeft"><p class="wp-block-coblocks-alert__title">Here is an alert title.</p><p class="wp-block-coblocks-alert__text"><strong>Here</strong> <em>i</em><a href="https://example.com">s</a> <mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-primary-color">a</mark><code>n</code> <img class="wp-image-54" style="width: 150px;" src="http://localhost:8888/wp-content/uploads/2023/01/vneck-tee-2.jpg" alt=""><kbd>a</kbd><s>l</s><sub>e</sub><sup>r</sup><span class="uppercase">t</span> text content.</p></div>
			BLOCKHTML
		);

		$migrated_block_attributes = $this->instance->migrate( $parsed_block[0]['attrs'], $parsed_block[0]['innerHTML'] );
        var_dump($parsed_block[0]);
        exit;
        var_dump($migrated_block_attributes);

        exit;
        function array_diff_assoc_recursive($array1, $array2) {
            $difference=array();
            foreach($array1 as $key => $value) {
                if( is_array($value) ) {
                    if( !isset($array2[$key]) || !is_array($array2[$key]) ) {
                        $difference[$key] = $value;
                    } else {
                        $new_diff = array_diff_assoc_recursive($value, $array2[$key]);
                        if( !empty($new_diff) )
                            $difference[$key] = $new_diff;
                    }
                } else if( !array_key_exists($key,$array2) || $array2[$key] !== $value ) {
                    $difference[$key] = $value;
                }
            }
            return $difference;
        }

        $expected_attributes = array(
            "textAlign"=> "center",
		"className"=> "is-style-warning extra-text-class has-text-align-center coblocks-alert-paragraph",
		"animation"=> "slideInLeft",
		"customFontSize"=> 28,
		"fontFamily"=> "Barlow Condensed",
		"lineHeight"=> 1,
		"letterSpacing"=> 1.5,
		"fontWeight"=> 300,
		"content"=> 'Here is an alert title.<br /><strong>Here</strong> <em>i</em><a href="https://example.com">s</a> <mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-primary-color">a</mark><code>n</code> <img class="wp-image-54" style="width: 150px;" src="http://localhost:8888/wp-content/uploads/2023/01/vneck-tee-2.jpg" alt=""><kbd>a</kbd><s>l</s><sub>e</sub><sup>r</sup><span class="uppercase">t</span> text content.',
		"align"=> "center"
        );
        // var_dump(array_diff_assoc_recursive($expected_attributes, $migrated_block_attributes));
        var_dump($migrated_block_attributes['attrs']);

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

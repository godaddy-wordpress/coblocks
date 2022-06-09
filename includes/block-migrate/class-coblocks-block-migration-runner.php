<?php
/**
 * CoBlocks_Block_Migration_Runner
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Block_Migration_Runner class.
 *
 * An object used to register and execute block migrations.
 */
class CoBlocks_Block_Migration_Runner {
	/**
	 * The registered block migrations.
	 *
	 * @var array
	 */
	protected $migrations = array();

	/**
	 * Register a block migration.
	 *
	 * @param Object $block_migration The block migration to register.
	 */
	public function register( $block_migration ) {
		$block_name                      = call_user_func( array( $block_migration, 'block_name' ) );
		$this->migrations[ $block_name ] = $block_migration;
	}

	/**
	 * Migrate the passed block if a registered migration exists.
	 *
	 * @param array $parsed_block The block object properties.
	 *
	 * @return array The migrated block object properties.
	 */
	public function migrate_block( array $parsed_block ) {
		$block_name = $parsed_block['blockName'];

		// Skip if a migration is not registered for the current block.
		if ( ! in_array( $block_name, array_keys( $this->migrations ), true ) ) {
			return $parsed_block;
		}

		// Perform the migration if we have one.
		$block_migration  = new $this->migrations[ $block_name ]();
		$block_attributes = $block_migration->migrate( $parsed_block['attrs'], $parsed_block['innerHTML'] );

		// Parse innerBlocks for possible migrations.
		if ( ! empty( $parsed_block['innerBlocks'] ) ) {
			$parsed_block['innerBlocks'] = array_map( array( $this, 'migrate_block' ), $parsed_block['innerBlocks'] );
		}

		// Override certain keys of the originally parsed block.
		return array_merge(
			$parsed_block,
			array(
				'attrs'        => $block_attributes,
				// Since we are forcing this into a "dynamic block" which is only defined with block comment delimiters,
				// we want to make sure an inner content contains only the inner blocks before serialization.
				'innerContent' => $parsed_block['innerBlocks'],
			)
		);
	}
}

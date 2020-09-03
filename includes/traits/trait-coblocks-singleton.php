<?php
/**
 * Trait for our Singleton pattern.
 *
 * @package CoBlocks
 */

/**
 * Trait for our Singleton pattern.
 *
 * @since NEXT
 */
trait CoBlocks_Singleton_Trait {
	/**
	 * The object instance.
	 *
	 * @var Object
	 */
	private static $instance = null;

	/**
	 * Return the plugin instance.
	 *
	 * @return Object
	 */
	public static function register() {
		if ( ! self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Reset the plugin instance.
	 */
	public static function reset() {
		self::$instance = null;
	}
}

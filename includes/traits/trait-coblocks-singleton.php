<?php
/**
 * Trait for our Singleton pattern.
 *
 * @package CoBlocks
 */

/**
 * Trait for our Singleton pattern.
 *
 * @since 2.3.0
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

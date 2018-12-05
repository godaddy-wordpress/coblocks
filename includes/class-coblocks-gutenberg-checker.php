<?php
/**
 * Check for Gutenberg.
 *
 * @package   @@pkg.title
 * @author    @@pkg.author
 * @link      @@pkg.author_uri
 * @license   @@pkg.license
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Notice Class
 *
 * @since 1.0.0
 */
class CoBlocks_Gutenberg_Checker {

	/**
	 * Plugin Name.
	 *
	 * @var string $plugin_name
	 */
	public $plugin_name;

	/**
	 * Plugin Path.
	 *
	 * @var string $plugin_path
	 */
	public $plugin_path;

	/**
	 * Gutenberg check.
	 *
	 * @var string $has_gutenberg
	 */
	public $has_gutenberg;

	/**
	 * Classic Editor check.
	 *
	 * @var string $has_classic_editor
	 */
	public $has_classic_editor;

	/**
	 * Gutenberg base.
	 *
	 * @var string $base
	 */
	public $base;

	/**
	 * Classic Editor base.
	 *
	 * @var string $classic_editor_base
	 */
	public $classic_editor_base;

	/**
	 * Gutenberg slug.
	 *
	 * @var string $slug
	 */
	public $slug;

	/**
	 * Setup the activation class.
	 *
	 * @access public
	 * @since  1.0.0
	 * @return void
	 */
	public function __construct() {

		$this->slug               = 'gutenberg';
		$this->name               = ucwords( $this->slug );
		$this->has_classic_editor = false;

		// Check if plugins are installed.
		require_once ABSPATH . 'wp-admin/includes/plugin.php';

		$plugins     = get_plugins();
		$plugin_path = plugin_dir_path( __FILE__ );

		// Set the plugin directory.
		$plugin_path       = array_filter( explode( '/', $plugin_path ) );
		$this->plugin_path = end( $plugin_path );

		// Check if Gutenberg is installed.
		foreach ( $plugins as $plugin_path => $plugin ) {
			if ( 'Gutenberg' === $plugin['Name'] ) {
				$this->has_gutenberg = true;
				$this->base          = $plugin_path;
				break;
			}
		}

		// Check if Classic Editor is installed.
		foreach ( $plugins as $plugin_path => $plugin ) {
			if ( 'Classic Editor' === $plugin['Name'] ) {
				$this->has_classic_editor  = true;
				$this->classic_editor_base = $plugin_path;
				break;
			}
		}

		// Actions.
		add_action( 'plugins_loaded', array( $this, 'fire_notices' ), 99 );
	}

	/**
	 * Fire notices where needed.
	 *
	 * @access public
	 * @since 1.0.0
	 * @return void
	 */
	public function fire_notices() {

		// Check if the Gutenberg plugin exists.
		if ( ! function_exists( 'register_block_type' ) ) {
			add_action( 'admin_notices', array( $this, 'gutenberg_plugin_notice' ) );
		}

		// Check if the Classic Editor plugin exists.
		if ( function_exists( 'classic_editor_init_actions' ) && $this->has_classic_editor ) {
			add_action( 'admin_notices', array( $this, 'classic_editor_notice' ) );
		}
	}

	/**
	 * Display notice if Gutenberg is not installed or activated.
	 *
	 * @access public
	 */
	public function classic_editor_notice() {

		// Array of allowed HTML.
		$allowed_html_array = array(
			'a' => array(
				'href'   => array(),
				'target' => array(),
			),
		);

		$url = wp_nonce_url( admin_url( 'plugins.php?action=deactivate&plugin=' . $this->classic_editor_base ), 'deactivate-plugin_' . $this->classic_editor_base );

		/* translators: Classic Editor plugin name */
		$link   = '<a href="' . esc_url( $url ) . '">' . sprintf( __( 'deactivate %1$s', '@@textdomain' ), 'Classic Editor' ) . '</a>';
		$plugin = '<a href="http://wordpress.org/gutenberg" target="_blank">Gutenberg</a>';

		/* translators: 1: Required plugin, 2: Name of this plugin, 3: Deactivation link */
		echo '<div class="notice notice-error"><p>' . wp_kses( sprintf( __( '%1$s requires the %2$s block editor. Please %3$s to continue.', '@@textdomain' ), 'Block Gallery', $plugin, $link ), $allowed_html_array ) . '</p></div>';
	}

	/**
	 * Display notice if Gutenberg is not installed or activated.
	 *
	 * @access public
	 */
	public function gutenberg_plugin_notice() {

		// Array of allowed HTML.
		$allowed_html_array = array(
			'a' => array(
				'href'   => array(),
				'target' => array(),
			),
		);

		if ( $this->has_gutenberg ) {
			$url = wp_nonce_url( admin_url( 'plugins.php?action=activate&plugin=' . $this->base ), 'activate-plugin_' . $this->base );
			/* translators: Name of this plugin */
			$link = '<a href="' . esc_url( $url ) . '">' . sprintf( __( 'activate %1$s', '@@textdomain' ), $this->name ) . '</a>';
		} else {
			$url = wp_nonce_url( self_admin_url( 'update.php?action=install-plugin&plugin=' . $this->slug ), 'install-plugin_' . $this->slug );
			/* translators: Name of this plugin */
			$link = '<a href="' . esc_url( $url ) . '">' . sprintf( __( 'install %1$s', '@@textdomain' ), $this->name ) . '</a>';
		}

		$plugin = '<a href="http://wordpress.org/gutenberg" target="_blank">Gutenberg</a>';

		/* translators: 1: Required plugin, 2: Name of this plugin, 3: "Activate" or "Install" */
		echo '<div class="notice notice-error"><p>' . wp_kses( sprintf( __( '%1$s requires the %2$s block editor. Please %3$s to continue.', '@@textdomain' ), 'Block Gallery', $plugin, $link ), $allowed_html_array ) . '</p></div>';
	}
}

return new CoBlocks_Gutenberg_Checker();

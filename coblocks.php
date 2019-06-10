<?php
/**
 * Plugin Name: CoBlocks
 * Plugin URI: https://coblocks.com
 * Description: CoBlocks is a suite of professional <strong>page building content blocks</strong> for the WordPress Gutenberg block editor. Our blocks are hyper-focused on empowering makers to build beautifully rich pages in WordPress.
 * Author: GoDaddy
 * Author URI: https://www.godaddy.com
 * Version: 1.10.0
 * Text Domain: coblocks
 * Domain Path: /languages
 * Tested up to: 5.2
 *
 * CoBlocks is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * any later version.
 *
 * You should have received a copy of the GNU General Public License
 * along with CoBlocks. If not, see <http://www.gnu.org/licenses/>.
 *
 * @package CoBlocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define COBLOCKS_PLUGIN_FILE.
if ( ! defined( 'COBLOCKS_PLUGIN_FILE' ) ) {
	define( 'COBLOCKS_PLUGIN_FILE', __FILE__ );
}

// Include the main CoBlocks class.
if ( ! class_exists( 'CoBlocks' ) ) {
	include_once dirname( __FILE__ ) . '/includes/class-coblocks.php';
}

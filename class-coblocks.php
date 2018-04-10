<?php
/**
 * Plugin Name: CoBlocks
 * Plugin URI: https://coblocks.com
 * Description:
 * Author: @@pkg.author
 * Author URI: https://coblocks.com
 * Version: @@pkg.version
 * Text Domain: @@textdomain
 * Domain Path: languages
 * Requires at least: @@pkg.requires
 * Tested up to: @@pkg.tested_up_to
 *
 * @@pkg.title is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with @@pkg.title. If not, see <http://www.gnu.org/licenses/>.
 *
 * @package   @@pkg.title
 * @author    @@pkg.author
 * @license   @@pkg.license
 */

/**
 * Main @@pkg.title Class
 *
 * @since 1.0.0
 */
class CoBlocks {

	/**
	 * This plugin's instance.
	 *
	 * @var CoBlocks
	 */
	private static $instance;

	/**
	 * The base directory path (without trailing slash).
	 *
	 * @var string $_url
	 */
	private $_dir;

	/**
	 * The base URL path (without trailing slash).
	 *
	 * @var string $_url
	 */
	private $_url;

	/**
	 * Registers the plugin.
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new CoBlocks();
			self::$instance->includes();
		}
	}

	/**
	 * The Constructor.
	 */
	private function __construct() {
		$this->_dir = untrailingslashit( plugin_dir_path( '/', __FILE__ ) );
		$this->_url = untrailingslashit( plugins_url( '/', __FILE__ ) );
	}

	/**
	 * Include required files.
	 *
	 * @access public
	 */
	private function includes() {
		require_once $this->_dir . 'src/class-coblocks-blocks.php';
	}
}

CoBlocks::register();

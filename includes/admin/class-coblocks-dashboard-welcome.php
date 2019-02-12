<?php
/**
 * Create @@pkg.title dashboard welcome page after activation
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
 * CoBlocks_Dashboard_Welcome Class
 */
class CoBlocks_Dashboard_Welcome {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'screen_page' ) );
		add_action( 'activated_plugin', array( $this, 'redirect' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'load_style' ), 100 );
	}

	/**
	 * Setup the admin menu.
	 */
	public function screen_page() {
		add_submenu_page(
			'edit.php?post_type=coblocks',
			__( 'Welcome', '@@textdomain' ),
			__( 'Welcome', '@@textdomain' ),
			apply_filters( 'coblocks_welcome_screen_capability', 'manage_options' ),
			'coblocks--welcome',
			array( $this, 'content' )
		);
	}


	/**
	 * Load Scripts
	 *
	 * Enqueues the required scripts.
	 *
	 * @return void
	 */
	public function load_style() {

		global $wp_query;

		$screen    = get_current_screen();
		$screen_id = $screen ? $screen->id : '';

		// Define where the asset is loaded from.
		$dir = CoBlocks()->asset_source( 'styles' );

		// Register styles.
		// coblocks-welcome.min.css
		wp_register_style( 'coblocks-welcome', $dir . 'coblocks-welcome.min.css', COBLOCKS_VERSION, true );

		// Only enqueue admin scripts and styles on relevant pages.
		if ( in_array( $screen_id, array( 'coblocks_page_coblocks--welcome' ), true ) ) {
			wp_enqueue_style( 'coblocks-welcome' );
		}
	}

	/**
	 * Page header.
	 */
	public function header() {

		$selected = isset( $_GET['page'] ) ? $_GET['page'] : 'coblocks--welcome';
		?>
		<div class="coblocks--logo">
			<a href="https://coblocks.com/"><img src="<?php echo COBLOCKS_PLUGIN_URL . '/dist/images/admin/logo.png'; ?>"></a>
		</div>
		<h1><?php echo esc_html__( 'Welcome to CoBlocks', '@@textdomain' ); ?></h1>
		<div class="about-text">
			<?php echo esc_html__( 'We highly recommend you watch this instructions below to get started, then you will be up and running in no time.', '@@textdomain' ); ?>
		</div>

		<?php
	}

	/**
	 * Page content.
	 */
	public function content() {
	?>
		<div class="wrap about-wrap coblocks--about-wrap">
			<?php $this->header(); ?>
			<div class="about-description">
				<div class="featured-video">
					<iframe width="560" height="315" src="https://www.youtube.com/embed/SfWoVX_uJ0M" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
				</div>
				<p>
					<a href="" class="button button-primary"><?php echo esc_html__( 'Create Your First Page', '@@textdomain' ); ?></a>
					<a href="" class="button button-secondary"><?php echo esc_html__( 'View Full Tutorials', '@@textdomain' ); ?></a>
				</p>
			</div>

		</div>
	<?php
	}

	/**
	 * Redirect to the welcome page upon plugin activation.
	 */
	public function redirect( $plugin ) {
		if ( ( $plugin == 'coblocks/class-coblocks.php' ) && ! isset( $_GET['activate-multi'] ) ) {
			wp_safe_redirect( admin_url( 'index.php?page=coblocks--welcome' ) );
			die();
		}
	}
}

return new CoBlocks_Dashboard_Welcome();
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
		<h1><?php echo esc_html__( 'Welcome to CoBlocks, the page builder for the new WordPress block editor', '@@textdomain' ); ?></h1>
		<!-- <div class="about-text">
			<?php //echo esc_html__( 'We highly recommend you watch this instructions below to get started, then you will be up and running in no time.', '@@textdomain' ); ?>
		</div> -->

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
				<p><?php echo sprintf( esc_html__( 'Thanks for installing CoBlocks! You\'ve just added both lots of extra useful blocks %sand%s a page builder system to the new WordPress block editor.', '@@textdomain' ), '<em>', '</em>' ); ?></p>
				<p><?php echo sprintf( esc_html__( 'CoBlocks gives you a %sgame-changing combination of features%s: new blocks, a page-builder experience for Gutenberg, custom typography controls, and our new Block Manager for turning blocks on-and-off.', '@@textdomain' ), '<strong>', '</strong>' ); ?></p>
				<p><?php echo esc_html__( 'Here\'s a quick getting started video which shows you what you can do with CoBlocks.', '@@textdomain' ); ?></p>

				<div class="featured-video">
					<iframe width="560" height="315" src="https://www.youtube.com/embed/EsIpvCcTKPw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
				</div>

				<p class="aligncenter">
					<a href="https://coblocks.com/" target="_blank" class="button button-primary"><?php echo esc_html__( 'Get Started with CoBlocks', '@@textdomain' ); ?></a>
					<a href="https://www.youtube.com/channel/UCsOcD4k5eUBH_wWhcxPJZcA" target="_blank" class="button button-secondary"><?php echo esc_html__( 'View More Tutorials', '@@textdomain' ); ?></a>
				</p>

				<p><?php echo sprintf( esc_html__( 'Thanks for using CoBlocks! If you have any queries or feedback, let us know on %sTwitter%s or through our  %sFacebook group %s. We are constantly adding new features, so if you want to see what\'s new %sjoin our mailing list%s.', '@@textdomain' ), '<a href="https://twitter.com/coblocks" target="_blank">', '</a>', '<a href="https://www.facebook.com/groups/coblocks" target="_blank">', '</a>', '<a href="https://coblocks.us20.list-manage.com/subscribe?u=fd78cec472f9f62b76fca64d1&id=62cbc3526f" target="_blank">', '</a>' ); ?></p>

				<p><?php echo sprintf( esc_html__( 'Cheers! %sRich, Jeffrey, and Alex', '@@textdomain' ), '<br />' ); ?></p>
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
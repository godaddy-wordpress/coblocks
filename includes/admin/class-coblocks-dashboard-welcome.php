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
			__( 'Getting Started', '@@textdomain' ),
			__( 'Getting Started', '@@textdomain' ),
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
		$dir    = CoBlocks()->asset_source( 'styles' );
		$js_dir = CoBlocks()->asset_source( 'js' );

		// Register styles.
		wp_register_style( 'coblocks-welcome', $dir . 'coblocks-welcome.min.css', COBLOCKS_VERSION, true );

		// Only enqueue admin scripts and styles on relevant pages.
		if ( in_array( $screen_id, array( 'coblocks_page_coblocks--welcome' ), true ) ) {
			wp_enqueue_style( 'coblocks-welcome' );

			wp_enqueue_script(
				'coblocks-lity',
				$js_dir . 'lity.min.js',
				array(),
				COBLOCKS_VERSION,
				true
			);
		}
	}

	/**
	 * Page header.
	 */
	public function header() {
		$selected = isset( $_GET['page'] ) ? $_GET['page'] : 'coblocks--welcome';
		?>

		<div class="coblocks--logo">
			<div>
				<a href="https://coblocks.com/">
					<svg height="25" viewBox="0 0 25 25" width="25" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false"><path d="m6.46683453.00203955 11.94577347-.00203908c2.2594519-.00038567 3.079921.2352627 3.9080781.67788271.8281572.44262 1.4795575 1.09224312 1.9253115 1.92005881s.6849702 1.64896151.6958915 3.91352645l.0577412 11.97280576c.0109213 2.2645649-.2203743 3.085791-.6581429 3.9137575-.4377687.8279666-1.082902 1.477811-1.9067886 1.920713s-1.6420813.6788301-3.9015333.6792157l-11.94577345.0020391c-2.25945199.0003857-3.07992102-.2352627-3.90807819-.6778827-.82815718-.44262-1.47955745-1.0922431-1.92531145-1.9200588s-.68497019-1.6489615-.6958915-3.9135264l-.05774118-11.97280577c-.0109213-2.26456495.22037424-3.08579108.6581429-3.91375758.43776867-.8279665 1.08290201-1.47781093 1.90678858-1.92071294.82388658-.442902 1.64208133-.67883008 3.90153332-.67921576zm-1.07794564 3.98245745c-.76706215 0-1.38888889.62182674-1.38888889 1.38888889v14.23772521c0 .7670622.62182674 1.3888889 1.38888889 1.3888889h4.33333333c.76706218 0 1.38888888-.6218267 1.38888888-1.3888889v-14.23772521c0-.76706215-.6218267-1.38888889-1.38888888-1.38888889zm10.00000001 9.9043919c-.7670622 0-1.3888889.6218267-1.3888889 1.3888889v4.3333333c0 .7670622.6218267 1.3888889 1.3888889 1.3888889h4.2222222c.7670622 0 1.3888889-.6218267 1.3888889-1.3888889v-4.3333333c0-.7670622-.6218267-1.3888889-1.3888889-1.3888889zm0-9.9043919c-.7670622 0-1.3888889.62182674-1.3888889 1.38888889v4.34883633c0 .76706218.6218267 1.38888888 1.3888889 1.38888888h4.2222222c.7670622 0 1.3888889-.6218267 1.3888889-1.38888888v-4.34883633c0-.76706215-.6218267-1.38888889-1.3888889-1.38888889z" fill-rule="evenodd"></path></svg>
				</a>

				<h1><?php echo esc_html__( 'Getting Started', '@@textdomain' ); ?></h1>
			</div>

			<a href="<?php echo esc_url( admin_url( '/' ) ); ?>" aria-label="<?php echo esc_attr__( 'Close', '@@textdomain' ); ?>" class="components-button components-icon-button">
				<svg aria-hidden="true" role="img" focusable="false" class="dashicon dashicons-no-alt" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M14.95 6.46L11.41 10l3.54 3.54-1.41 1.41L10 11.42l-3.53 3.53-1.42-1.42L8.58 10 5.05 6.47l1.42-1.42L10 8.58l3.54-3.53z"></path></svg>
			</a>
		</div>


		<?php
	}

	// <svg height="180" viewBox="0 0 947 180" width="947" xmlns="http://www.w3.org/2000/svg"><g fill="#23282d" fill-rule="evenodd"><path d="m229.924437 99.319569v-6.5797179c0-26.9412774 16.893871-45.5245347 44.991044-45.5245347 25.874296 0 41.61227 15.7379739 41.967931 37.4332599h-27.741514c-.622405-7.6466991-5.690566-13.9596717-13.07052-13.9596717-9.247171 0-15.026653 8.5358502-15.026653 22.1398616v6.2240574c0 15.0266534 5.690567 23.4735884 15.115568 23.4735884 9.336086 0 12.625945-6.312973 13.159436-13.337266h27.741513c-.978066 25.696466-19.116748 36.810854-42.323591 36.810854-27.119107 0-44.813214-16.804955-44.813214-46.680431zm142.411603-52.1042526c29.164155 0 45.880195 19.0278328 45.880195 46.1469404v5.6016517c0 29.5198155-16.71604 47.0360915-45.880195 47.0360915-29.4309 0-46.14694-17.516276-46.14694-46.8582613v-5.6016517c0-27.0301924 16.804955-46.3247706 46.14694-46.3247706zm-.088915 22.6733522c-11.203304 0-14.759908 11.2033035-14.759908 23.0290127v7.2021237c0 11.114388 3.289859 23.117928 14.759908 23.117928 11.381133 0 14.670992-11.914625 14.670992-23.117928v-7.2021237c0-12.0035394-3.556604-23.0290127-14.670992-23.0290127zm114.612764 76.0893914c-13.415879 0-23.100189-6.314705-27.009452-16.009111l-1.243856-.02194v16.031051l-30.918715.02194v-120h31v38.3315916h1.340265c3.731569-9.3386483 13.860113-15.5644139 26.920605-15.5644139 21.056711 0 34.73913 15.2086559 34.73913 44.7365726v7.5598587c0 29.172158-13.504726 44.914451-34.827977 44.914451zm-12.349717-23.56897c9.062382 0 15.281664-7.470918 15.281664-22.145937v-5.7810681c0-14.6750188-6.308129-21.9680585-15.281664-21.9680585-9.417769 0-15.992438 7.2041002-15.992438 21.9680585v5.7810681c0 14.763958 6.574669 22.145937 15.992438 22.145937zm57.177694 23.59091v-120h31v120zm86.134368-98.7846836c29.164155 0 45.880195 19.0278328 45.880195 46.1469404v5.6016517c0 29.5198155-16.71604 47.0360915-45.880195 47.0360915-29.430901 0-46.146941-17.516276-46.146941-46.8582613v-5.6016517c0-27.0301924 16.804955-46.3247706 46.146941-46.3247706zm-.088915 22.6733522c-11.203304 0-14.759908 11.2033035-14.759908 23.0290127v7.2021237c0 11.114388 3.289859 23.117928 14.759908 23.117928 11.381133 0 14.670992-11.914625 14.670992-23.117928v-7.2021237c0-12.0035394-3.556604-23.0290127-14.670992-23.0290127zm54.065145 29.4309004v-6.5797179c0-26.9412774 16.89387-45.5245347 44.991044-45.5245347 25.874296 0 41.61227 15.7379739 41.96793 37.4332599h-27.741513c-.622406-7.6466991-5.690567-13.9596717-13.070521-13.9596717-9.247171 0-15.026653 8.5358502-15.026653 22.1398616v6.2240574c0 15.0266534 5.690567 23.4735884 15.115568 23.4735884 9.336087 0 12.625945-6.312973 13.159436-13.337266h27.741513c-.978066 25.696466-19.116748 36.810854-42.32359 36.810854-27.119108 0-44.813214-16.804955-44.813214-46.680431zm126.831859 15.640472v31.039959h-30.942457v-120h30.942457v61.2108506h1.422642l24.89623-36.4652817h34.676892l-32.187269 40.9122673 34.499061 54.3421638h-35.832788l-22.584437-37.443619zm64.707829-36.8022674c0-22.0509465 19.205663-30.9424572 40.900949-30.9424572 22.851182 0 38.766986 10.1363222 38.766986 29.5198154h-26.763447c-.711321-4.8903308-4.00118-9.7806617-12.448115-9.7806617-7.291038 0-11.292218 3.7344345-11.292218 8.4469351 0 8.4469352 14.759907 9.2471711 25.518635 11.2033035 17.338446 3.1120287 28.186089 10.3141524 28.186089 27.0301923 0 20.005899-15.382313 32.365099-43.123827 32.365099-27.652598 0-41.7901-12.625945-41.7901-29.519815h29.875476c.533491 5.601651 5.512737 9.602831 13.337266 9.602831 8.00236 0 12.00354-4.00118 12.00354-8.446935 0-7.735614-12.18137-8.446935-23.384673-10.758728-16.449295-3.467689-29.786561-10.7587279-29.786561-28.7195794z"/><path d="m46.5612086.01468478 86.0095684-.01468138c16.268055-.00277687 22.175432 1.69389142 28.138163 4.88075547 5.962732 3.18686404 10.652814 7.86415053 13.862243 13.82442353 3.209428 5.9602729 4.931785 11.8725228 5.010418 28.1773904l.415737 86.2042012c.078633 16.304868-1.586695 22.217696-4.738629 28.179055-3.151934 5.961358-7.796894 10.640238-13.728878 13.829133-5.931983 3.188894-11.822985 4.887576-28.09104 4.890353l-86.0095683.014682c-16.2680543.002776-22.1754313-1.693892-28.1381629-4.880756-5.9627317-3.186864-10.65281365-7.86415-13.86224245-13.824423-3.20942879-5.960273-4.93178538-11.872523-5.01041877-28.177391l-.4157365-86.204201c-.07863339-16.3048677 1.58669447-22.2176958 4.73862888-28.1790546s7.79689444-10.64023873 13.72887774-13.82913314c5.9319834-3.1888944 11.8229856-4.88757661 28.0910399-4.89035348zm-6.5612086 29.98531522c-5.5228475 0-10 4.4771525-10 10v100c0 5.522847 4.4771525 10 10 10h30c5.5228475 0 10-4.477153 10-10v-100c0-5.5228475-4.4771525-10-10-10zm70 70c-5.522847 0-10 4.477153-10 10v30c0 5.522847 4.477153 10 10 10h30c5.522847 0 10-4.477153 10-10v-30c0-5.522847-4.477153-10-10-10zm0-70c-5.522847 0-10 4.4771525-10 10v30c0 5.5228475 4.477153 10 10 10h30c5.522847 0 10-4.4771525 10-10v-30c0-5.5228475-4.477153-10-10-10z"/></g></svg>
	/**
	 * Page content.
	 */
	public function content() {
	?>
		<div class="coblocks--about-wrap-fixed">
			<div class="coblocks--about-wrap">
			<?php $this->header(); ?>
			<div class="about-description">
				<h2><?php echo esc_html__( 'Welcome to CoBlocks', '@@textdomain' ); ?></h2>
				<h3><?php echo esc_html__( 'Thank you for choosing CoBlocks — the premier page builder for the new WordPress block editor.', '@@textdomain' ); ?></h3>
				<p><?php echo esc_html__( 'You\'ve just added lots of extra useful blocks and a new page builder system to the WordPress block editor. Below you\'ll find a helpful video showcasing what you can do with CoBlocks.', '@@textdomain' ); ?></p>

				<a href="https://youtube.com/watch?v=EsIpvCcTKPw" class="video-frame" title="Watch how to create your first form" data-lity>
					<img src="<?php echo esc_url( COBLOCKS_PLUGIN_URL . 'dist/images/admin/video.jpg' ); ?>" alt="Watch how to create your first form" class="video-thumbnail">
				</a>

				<p><?php echo sprintf( esc_html__( 'If you have any questions or feedback, let us know on %1$sTwitter%2$s or our %3$sFacebook group %4$s. And %5$click here to subscribe%6$s if you want to stay up to date with what\'s new and upcoming at CoBlocks.', '@@textdomain' ), '<a href="https://twitter.com/coblocks" target="_blank">', '</a>', '<a href="https://www.facebook.com/groups/coblocks" target="_blank">', '</a>', '<a href="https://coblocks.us20.list-manage.com/subscribe?u=fd78cec472f9f62b76fca64d1&id=62cbc3526f" target="_blank">', '</a>' ); ?></p>

				<p class="button-wrap">
					<a href="https://coblocks.com/" target="_blank" class="button button-primary"><?php echo esc_html__( 'Subscribe Today', '@@textdomain' ); ?></a>
					<a href="https://www.youtube.com/channel/UCsOcD4k5eUBH_wWhcxPJZcA" target="_blank" class="button button-secondary"><?php echo esc_html__( 'View More Tutorials', '@@textdomain' ); ?></a>
				</p>

			</div>
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

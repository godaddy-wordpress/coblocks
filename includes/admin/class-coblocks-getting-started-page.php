<?php
/**
 * Create a Getting Started page that fires after plugin activation
 *
 * @package CoBlocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * CoBlocks_Getting_Started_Page Class
 */
class CoBlocks_Getting_Started_Page {

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

		// Menu icon.
		$svg = '<svg fill="#a0a5aa" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m4.26414583.01915857 7.65399957-.01909461c1.4476957-.0036116 1.9730418.14581421 2.5030049.42754356.5299632.28172936.9463642.69605707 1.2307358 1.22460786.2843716.5285508.4364185 1.0531452.4400359 2.50084368l.019125 7.65401434c.0036173 1.4476985-.1458061 1.973045-.4275329 2.503008-.2817267.5299631-.6960519.9463632-1.2246006 1.2307333-.5285486.28437-1.0531414.4364151-2.5008371.4400267l-7.6539996.0190946c-1.44769568.0036116-1.97304176-.1458142-2.50300491-.4275435-.52996316-.2817294-.94636416-.6960571-1.23073576-1.2246079s-.43641852-1.0531452-.44003586-2.5008437l-.019125-7.65401429c-.00361735-1.44769847.1458061-1.97304496.4275328-2.50300802.28172671-.52996305.69605197-.9463632 1.22460063-1.23073324.52854865-.28437005 1.05314144-.43641517 2.50083713-.44002678zm-.15303472 2.98084143c-.55228475 0-1 .44771525-1 1v8c0 .5522847.44771525 1 1 1h2c.55228475 0 1-.4477153 1-1v-8c0-.55228475-.44771525-1-1-1zm5.99999999 6c-.55228474 0-.99999999.44771525-.99999999 1v2c0 .5522847.44771525 1 .99999999 1h2c.5522848 0 1-.4477153 1-1v-2c0-.55228475-.4477152-1-1-1zm0-6c-.55228474 0-.99999999.44771525-.99999999 1v2c0 .55228475.44771525 1 .99999999 1h2c.5522848 0 1-.44771525 1-1v-2c0-.55228475-.4477152-1-1-1z" fill-rule="evenodd" transform="translate(1.888889 2)"/></svg>';

		/**
		 * Allow users to nest the CoBlocks menu page
		 *
		 * @var string
		 */
		$submenu_parent_slug = (string) apply_filters( 'coblocks_getting_started_submenu_parent_slug', '' );

		if ( '' !== $submenu_parent_slug ) {

			add_submenu_page(
				$submenu_parent_slug,
				'CoBlocks',
				'CoBlocks',
				apply_filters( 'coblocks_getting_started_screen_capability', 'manage_options' ),
				'coblocks-getting-started',
				array( $this, 'content' )
			);

			return;

		}

		add_management_page(
			'CoBlocks',
			'CoBlocks',
			apply_filters( 'coblocks_getting_started_screen_capability', 'manage_options' ),
			'coblocks-getting-started',
			array( $this, 'content' ),
			'data:image/svg+xml;base64,' . base64_encode( $svg )
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

		// Only enqueue admin scripts and styles on relevant pages.
		if ( false !== strpos( $screen_id, 'coblocks-getting-started' ) ) {

			// Define where the assets are loaded from.
			$dir         = CoBlocks()->asset_source( 'styles' );
			$vendors_dir = CoBlocks()->asset_source( 'js', 'vendors' );

			wp_enqueue_style(
				'coblocks-getting-started',
				$dir . 'coblocks-getting-started' . COBLOCKS_ASSET_SUFFIX . '.css',
				COBLOCKS_VERSION,
				true
			);

			wp_enqueue_script(
				'coblocks-lity',
				$vendors_dir . '/lity' . COBLOCKS_ASSET_SUFFIX . '.js',
				array(),
				COBLOCKS_VERSION,
				true
			);

		}

	}

	/**
	 * Render page content.
	 */
	public function content() {
		?>
		<div class="page--coblocks-getting-started">

			<div class="getting-started__content">

				<div class="logo">
					<a href="https://coblocks.com/" target="_blank">
						<svg height="180" viewBox="0 0 947 180" width="947" xmlns="http://www.w3.org/2000/svg"><g fill="#23282d" fill-rule="evenodd"><path d="m229.924437 99.319569v-6.5797179c0-26.9412774 16.893871-45.5245347 44.991044-45.5245347 25.874296 0 41.61227 15.7379739 41.967931 37.4332599h-27.741514c-.622405-7.6466991-5.690566-13.9596717-13.07052-13.9596717-9.247171 0-15.026653 8.5358502-15.026653 22.1398616v6.2240574c0 15.0266534 5.690567 23.4735884 15.115568 23.4735884 9.336086 0 12.625945-6.312973 13.159436-13.337266h27.741513c-.978066 25.696466-19.116748 36.810854-42.323591 36.810854-27.119107 0-44.813214-16.804955-44.813214-46.680431zm142.411603-52.1042526c29.164155 0 45.880195 19.0278328 45.880195 46.1469404v5.6016517c0 29.5198155-16.71604 47.0360915-45.880195 47.0360915-29.4309 0-46.14694-17.516276-46.14694-46.8582613v-5.6016517c0-27.0301924 16.804955-46.3247706 46.14694-46.3247706zm-.088915 22.6733522c-11.203304 0-14.759908 11.2033035-14.759908 23.0290127v7.2021237c0 11.114388 3.289859 23.117928 14.759908 23.117928 11.381133 0 14.670992-11.914625 14.670992-23.117928v-7.2021237c0-12.0035394-3.556604-23.0290127-14.670992-23.0290127zm114.612764 76.0893914c-13.415879 0-23.100189-6.314705-27.009452-16.009111l-1.243856-.02194v16.031051l-30.918715.02194v-120h31v38.3315916h1.340265c3.731569-9.3386483 13.860113-15.5644139 26.920605-15.5644139 21.056711 0 34.73913 15.2086559 34.73913 44.7365726v7.5598587c0 29.172158-13.504726 44.914451-34.827977 44.914451zm-12.349717-23.56897c9.062382 0 15.281664-7.470918 15.281664-22.145937v-5.7810681c0-14.6750188-6.308129-21.9680585-15.281664-21.9680585-9.417769 0-15.992438 7.2041002-15.992438 21.9680585v5.7810681c0 14.763958 6.574669 22.145937 15.992438 22.145937zm57.177694 23.59091v-120h31v120zm86.134368-98.7846836c29.164155 0 45.880195 19.0278328 45.880195 46.1469404v5.6016517c0 29.5198155-16.71604 47.0360915-45.880195 47.0360915-29.430901 0-46.146941-17.516276-46.146941-46.8582613v-5.6016517c0-27.0301924 16.804955-46.3247706 46.146941-46.3247706zm-.088915 22.6733522c-11.203304 0-14.759908 11.2033035-14.759908 23.0290127v7.2021237c0 11.114388 3.289859 23.117928 14.759908 23.117928 11.381133 0 14.670992-11.914625 14.670992-23.117928v-7.2021237c0-12.0035394-3.556604-23.0290127-14.670992-23.0290127zm54.065145 29.4309004v-6.5797179c0-26.9412774 16.89387-45.5245347 44.991044-45.5245347 25.874296 0 41.61227 15.7379739 41.96793 37.4332599h-27.741513c-.622406-7.6466991-5.690567-13.9596717-13.070521-13.9596717-9.247171 0-15.026653 8.5358502-15.026653 22.1398616v6.2240574c0 15.0266534 5.690567 23.4735884 15.115568 23.4735884 9.336087 0 12.625945-6.312973 13.159436-13.337266h27.741513c-.978066 25.696466-19.116748 36.810854-42.32359 36.810854-27.119108 0-44.813214-16.804955-44.813214-46.680431zm126.831859 15.640472v31.039959h-30.942457v-120h30.942457v61.2108506h1.422642l24.89623-36.4652817h34.676892l-32.187269 40.9122673 34.499061 54.3421638h-35.832788l-22.584437-37.443619zm64.707829-36.8022674c0-22.0509465 19.205663-30.9424572 40.900949-30.9424572 22.851182 0 38.766986 10.1363222 38.766986 29.5198154h-26.763447c-.711321-4.8903308-4.00118-9.7806617-12.448115-9.7806617-7.291038 0-11.292218 3.7344345-11.292218 8.4469351 0 8.4469352 14.759907 9.2471711 25.518635 11.2033035 17.338446 3.1120287 28.186089 10.3141524 28.186089 27.0301923 0 20.005899-15.382313 32.365099-43.123827 32.365099-27.652598 0-41.7901-12.625945-41.7901-29.519815h29.875476c.533491 5.601651 5.512737 9.602831 13.337266 9.602831 8.00236 0 12.00354-4.00118 12.00354-8.446935 0-7.735614-12.18137-8.446935-23.384673-10.758728-16.449295-3.467689-29.786561-10.7587279-29.786561-28.7195794z"/><path d="m46.5612086.01468478 86.0095684-.01468138c16.268055-.00277687 22.175432 1.69389142 28.138163 4.88075547 5.962732 3.18686404 10.652814 7.86415053 13.862243 13.82442353 3.209428 5.9602729 4.931785 11.8725228 5.010418 28.1773904l.415737 86.2042012c.078633 16.304868-1.586695 22.217696-4.738629 28.179055-3.151934 5.961358-7.796894 10.640238-13.728878 13.829133-5.931983 3.188894-11.822985 4.887576-28.09104 4.890353l-86.0095683.014682c-16.2680543.002776-22.1754313-1.693892-28.1381629-4.880756-5.9627317-3.186864-10.65281365-7.86415-13.86224245-13.824423-3.20942879-5.960273-4.93178538-11.872523-5.01041877-28.177391l-.4157365-86.204201c-.07863339-16.3048677 1.58669447-22.2176958 4.73862888-28.1790546s7.79689444-10.64023873 13.72887774-13.82913314c5.9319834-3.1888944 11.8229856-4.88757661 28.0910399-4.89035348zm-6.5612086 29.98531522c-5.5228475 0-10 4.4771525-10 10v100c0 5.522847 4.4771525 10 10 10h30c5.5228475 0 10-4.477153 10-10v-100c0-5.5228475-4.4771525-10-10-10zm70 70c-5.522847 0-10 4.477153-10 10v30c0 5.522847 4.477153 10 10 10h30c5.522847 0 10-4.477153 10-10v-30c0-5.522847-4.477153-10-10-10zm0-70c-5.522847 0-10 4.4771525-10 10v30c0 5.5228475 4.477153 10 10 10h30c5.522847 0 10-4.4771525 10-10v-30c0-5.5228475-4.477153-10-10-10z"/></g></svg>
					</a>
				</div>

				<h1><?php echo esc_html__( 'Thanks for choosing CoBlocks, the premier page builder for the new WordPress block editor.', 'coblocks' ); ?></h1>

				<p>
					<?php
					echo sprintf(
						/* translators: 1: Opening <strong> tag, 2: Closing </strong> tag */
						esc_html__( 'You\'ve just added lots of useful blocks and a new page builder toolkit to the WordPress editor. CoBlocks gives you a game-changing set of features: %1$s tens of blocks%2$s, a %1$s page-builder experience %2$s and %1$s custom typography controls%2$s.', 'coblocks' ),
						'<strong>',
						'</strong>'
					);
					?>
				</p>

				<p><strong><?php echo esc_html__( 'Here are a few videos to help you get started:', 'coblocks' ); ?></strong></p>

				<div class="videos">
					<?php /* translators: CoBlocks plugin name */ ?>
					<a data-lity href="https://youtube.com/watch?v=EsIpvCcTKPw" title="<?php echo sprintf( esc_attr__( 'Watch how to create your first page with %s', 'coblocks' ), 'CoBlocks' ); ?>">
						<img src="<?php echo esc_url( COBLOCKS_PLUGIN_URL . 'dist/images/admin/video.jpg' ); ?>" alt="<?php echo esc_attr__( 'Watch how to create your first page', 'coblocks' ); ?>">
					</a>
					<a data-lity href="https://youtube.com/watch?v=cAQC_L03Z70" title="<?php echo esc_attr__( 'Watch how to use the Row and Shape Divider blocks', 'coblocks' ); ?>">
						<img src="<?php echo esc_url( COBLOCKS_PLUGIN_URL . 'dist/images/admin/video-2.jpg' ); ?>" alt="<?php echo esc_attr__( 'Watch how to use the Row and Shape Divider blocks', 'coblocks' ); ?>">
					</a>
					<a data-lity href="https://youtube.com/watch?v=SZOMMtrd0nw" title="<?php echo esc_attr__( 'Watch how to use the Media Card block', 'coblocks' ); ?>">
						<img src="<?php echo esc_url( COBLOCKS_PLUGIN_URL . 'dist/images/admin/video-3.jpg' ); ?>" alt="<?php echo esc_attr__( 'Watch how to use the Media Card block', 'coblocks' ); ?>">
					</a>
				</div>

				<p>
					<?php
					echo sprintf(
						/* translators: 1: Opening <a> tag to the CoBlocks YouTube channel, 2: Closing </a> tag */
						esc_attr__( 'Like what you see? %1$sSubscribe to our YouTube channel%2$s and we\'ll let you know when new video tutorials are released.', 'coblocks' ),
						'<a href="https://www.youtube.com/channel/UCsOcD4k5eUBH_wWhcxPJZcA" target="_blank">',
						'</a>'
					);
					?>
				</p>

				<p>
					<?php
					echo sprintf(
						/* translators: 1: Opening <a> tag to the CoBlocks Twitter account, 2: Opening <a> tag to the CoBlocks Facebook group, 3: Opening <a> tag to the CoBlocks newsletter,  4: Closing </a> tag */
						esc_html__( 'If you have any questions or feedback, let us know on %1$sTwitter%4$s or our %2$sFacebook group %4$s. Also, %3$ssubscribe to our newsletter%4$s if you want to stay up to date with what\'s new and upcoming at CoBlocks.', 'coblocks' ),
						'<a href="https://twitter.com/coblocks" target="_blank">',
						'<a href="https://www.facebook.com/groups/coblocks" target="_blank">',
						'<a href="https://coblocks.us20.list-manage.com/subscribe?u=fd78cec472f9f62b76fca64d1&id=62cbc3526f" target="_blank">',
						'</a>'
					);
					?>
				</p>

				<p><?php echo esc_html__( 'Enjoy!', 'coblocks' ); ?></p>
			</div>

		</div>
		<?php
	}

	/**
	 * Redirect to the Getting Started page upon plugin activation.
	 *
	 * @param string $plugin The activate plugin name.
	 */
	public function redirect( $plugin ) {

		if ( 'coblocks/class-coblocks.php' !== $plugin ) {

			return;

		}

		$nonce          = filter_input( INPUT_GET, '_wpnonce', FILTER_SANITIZE_STRING );
		$activate_multi = filter_input( INPUT_GET, 'activate-multi', FILTER_VALIDATE_BOOLEAN );

		if ( ! $nonce ) {

			return;

		}

		if ( defined( 'WP_CLI' ) && WP_CLI ) {

			WP_CLI::log(
				WP_CLI::colorize(
					'%b' . sprintf( '🎉 %s %s', __( 'Get started with CoBlocks here:', 'coblocks' ), admin_url( 'admin.php?page=coblocks-getting-started' ) ) . '%n'
				)
			);

			return;

		}

		if ( $activate_multi ) {

			return;

		}

		wp_safe_redirect( admin_url( 'admin.php?page=coblocks-getting-started' ) );

		die();

	}
}

return new CoBlocks_Getting_Started_Page();

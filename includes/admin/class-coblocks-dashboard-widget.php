<?php
/**
 * Create @@pkg.title dashboard widget
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
 * Generates a dashboard widget.
 */
class CoBlocks_Dashboard_Widget {

	/**
	 * Plugin Name.
	 *
	 * @var string $plugin_name
	 */
	public $feed_url;

	/**
	 * Constructor
	 */
	public function __construct() {

		$this->feed_url = 'https://block-options.com/feed/';

		add_filter( 'wp_dashboard_setup', array( $this, 'dashboard_widgets' ) );
	}

	/**
	 * Add the widget.
	 */
	public function dashboard_widgets() {
		global $wp_meta_boxes;

		$dashboard                                    = $wp_meta_boxes['dashboard']['normal']['core'];
		$widget                                       = [ 'coblocks-overview' => $dashboard['coblocks-overview'] ];
		$wp_meta_boxes['dashboard']['normal']['core'] = array_merge( $widget, $dashboard );

		wp_add_dashboard_widget( 'coblocks-overview', __( 'CoBlocks', '@@textdomain' ), array( $this, 'content' ) );
	}

	/**
	 * Widget Content.
	 */
	public function content() {

		$support_url = CoBlocks_URL_Generator()->get_store_url(
			'support',
			array(
				'utm_medium'   => 'coblocks-lite',
				'utm_source'   => 'dashboard',
				'utm_campaign' => 'dashboard-widget',
				'utm_content'  => 'learn-more',
			)
		);

		$blog_url = CoBlocks_URL_Generator()->get_store_url(
			'blog',
			array(
				'utm_medium'   => 'coblocks-lite',
				'utm_source'   => 'dashboard',
				'utm_campaign' => 'dashboard-widget',
				'utm_content'  => 'get-help',
			)
		);
		?>

		<div class="coblocks-dashboard-widget">
			<div class="coblocks-dashboard-widget__header">
				<div class="coblocks-dashboard-widget__version">
					<?php /* translators: 1: Name of this plugin 2: Version. */ ?>
					<span><?php printf( esc_html__( 'You\'re using v%1$s of %2$s.', '@@textdomain' ), esc_html( COBLOCKS_VERSION ), 'CoBlocks' ); ?></span>
				</div>
				<?php if ( current_user_can( 'edit_posts' ) ) { ?>
					<div class="coblocks-dashboard-widget__create">
						<a href="<?php echo esc_url( '' ); ?>" class="button">
							<span aria-hidden="true" class="dashicons dashicons-plus"></span> <?php echo esc_html( 'Create Template', '@@textdomain' ); ?>
						</a>
					</div>
				<?php } ?>
			</div>

			<div class="coblocks-dashboard-widget__feed">
				<h3><?php echo esc_html( 'News & Updates', '@@textdomain' ); ?></h3>

				<ul>
					<?php
					$rss = fetch_feed( $this->feed_url );

					if ( ! is_wp_error( $rss ) ) {

						$maxitems  = $rss->get_item_quantity( 3 );
						$rss_items = $rss->get_items( 0, $maxitems );

						if ( $maxitems > 0 ) {
							foreach ( $rss_items as $item ) {
								$content = $item->get_content();
								$content = wp_html_excerpt( $content, 85 ) . '...';
								$title   = $item->get_title();
								$date    = $item->get_date( 'F jS, Y' );
								?>
									<li class="wp-clearfix">
										<div class="coblocks-dashboard-widget__feed--content">
											<a href="<?php echo esc_url( $item->get_permalink() ); ?>" target="_blank">
												<?php echo esc_html( $title ); ?>
											</a>
											<p><?php echo esc_html( $content ); ?></p>
										</div>
										<div class="coblocks-dashboard-widget__feed--date">
											<span><?php echo esc_html( $date ); ?></span>
										</div>
									</li>
								<?php
							}
						}
					}
					?>
				</ul>
			</div>

			<div class="coblocks-dashboard-widget__footer">
				<ul>
					<li>
						<a href="<?php echo esc_url( $blog_url ); ?>" target="blank">
							<?php esc_html_e( 'Learn More', '@@textdomain' ); ?>
							<span class="screen-reader-text"><?php echo esc_html( '(opens in a new window)', '@@textdomain' ); ?></span>
							<span aria-hidden="true" class="dashicons dashicons-external"></span>
						</a>
					</li>
					<li>
						<a href="<?php echo esc_url( $support_url ); ?>" target="blank">
							<?php esc_html_e( 'Get Help', '@@textdomain' ); ?>
							<span class="screen-reader-text"><?php echo esc_html( '(opens in a new window)', '@@textdomain' ); ?></span>
							<span aria-hidden="true" class="dashicons dashicons-external"></span>
						</a>
					</li>

					<?php
					// Render if we do not have a pro version or Pro is activated.
					if ( CoBlocks()->has_pro() && ! CoBlocks()->is_pro() ) {
					?>
						<li class="is-pro">
							<a href="<?php echo esc_url( $upgrade_url ); ?>" target="blank">
								<?php esc_html_e( 'Upgrade to Pro', '@@textdomain' ); ?>
								<span class="screen-reader-text"><?php echo esc_html( '(opens in a new window)', '@@textdomain' ); ?></span>
								<span aria-hidden="true" class="dashicons dashicons-external"></span>
							</a>
						</li>
					<?php } ?>
				</ul>
			</div>
		</div>
	<?php
	}
}

new CoBlocks_Dashboard_Widget();









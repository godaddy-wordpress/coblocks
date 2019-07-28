<?php
/**
 * Plugin review class.
 * Prompts users to give a review of the plugin on WordPress.org after a period of usage.
 *
 * Heavily based on code by Rhys Wynne
 * https://winwar.co.uk/2014/10/ask-wordpress-plugin-reviews-week/
 *
 * @package CoBlocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Feedback Notice Class
 */
class CoBlocks_Feedback {

	/**
	 * Slug.
	 *
	 * @var string $slug
	 */
	private $slug;

	/**
	 * Name.
	 *
	 * @var string $name
	 */
	private $name;

	/**
	 * Time limit.
	 *
	 * @var string $time_limit
	 */
	private $time_limit;

	/**
	 * No Bug Option.
	 *
	 * @var string $nobug_option
	 */
	public $nobug_option;

	/**
	 * Activation Date Option.
	 *
	 * @var string $date_option
	 */
	public $date_option;

	/**
	 * Class constructor.
	 *
	 * @param string $args Arguments.
	 */
	public function __construct( $args ) {

		$this->slug = $args['slug'];
		$this->name = $args['name'];

		$this->date_option  = $this->slug . '_activation_date';
		$this->nobug_option = $this->slug . '_no_bug';

		if ( isset( $args['time_limit'] ) ) {
			$this->time_limit = $args['time_limit'];
		} else {
			$this->time_limit = WEEK_IN_SECONDS;
		}

		// Add actions.
		add_action( 'admin_init', array( $this, 'check_installation_date' ) );
		add_action( 'admin_init', array( $this, 'set_no_bug' ), 5 );
	}

	/**
	 * Seconds to words.
	 *
	 * @param string $seconds Seconds in time.
	 */
	public function seconds_to_words( $seconds ) {

		// Get the years.
		$years = ( intval( $seconds ) / YEAR_IN_SECONDS ) % 100;
		if ( $years > 1 ) {
			/* translators: Number of years */
			return sprintf( __( '%s years', 'coblocks' ), $years );
		} elseif ( $years > 0 ) {
			return __( 'a year', 'coblocks' );
		}

		// Get the weeks.
		$weeks = ( intval( $seconds ) / WEEK_IN_SECONDS ) % 52;
		if ( $weeks > 1 ) {
			/* translators: Number of weeks */
			return sprintf( __( '%s weeks', 'coblocks' ), $weeks );
		} elseif ( $weeks > 0 ) {
			return __( 'a week', 'coblocks' );
		}

		// Get the days.
		$days = ( intval( $seconds ) / DAY_IN_SECONDS ) % 7;
		if ( $days > 1 ) {
			/* translators: Number of days */
			return sprintf( __( '%s days', 'coblocks' ), $days );
		} elseif ( $days > 0 ) {
			return __( 'a day', 'coblocks' );
		}

		// Get the hours.
		$hours = ( intval( $seconds ) / HOUR_IN_SECONDS ) % 24;
		if ( $hours > 1 ) {
			/* translators: Number of hours */
			return sprintf( __( '%s hours', 'coblocks' ), $hours );
		} elseif ( $hours > 0 ) {
			return __( 'an hour', 'coblocks' );
		}

		// Get the minutes.
		$minutes = ( intval( $seconds ) / MINUTE_IN_SECONDS ) % 60;
		if ( $minutes > 1 ) {
			/* translators: Number of minutes */
			return sprintf( __( '%s minutes', 'coblocks' ), $minutes );
		} elseif ( $minutes > 0 ) {
			return __( 'a minute', 'coblocks' );
		}

		// Get the seconds.
		$seconds = intval( $seconds ) % 60;
		if ( $seconds > 1 ) {
			/* translators: Number of seconds */
			return sprintf( __( '%s seconds', 'coblocks' ), $seconds );
		} elseif ( $seconds > 0 ) {
			return __( 'a second', 'coblocks' );
		}
	}

	/**
	 * Check date on admin initiation and add to admin notice if it was more than the time limit.
	 */
	public function check_installation_date() {

		if ( ! get_site_option( $this->nobug_option ) || false === get_site_option( $this->nobug_option ) ) {

			add_site_option( $this->date_option, time() );

			// Retrieve the activation date.
			$install_date = get_site_option( $this->date_option );

			// If difference between install date and now is greater than time limit, then display notice.
			if ( ( time() - $install_date ) > $this->time_limit ) {
				add_action( 'admin_notices', array( $this, 'display_admin_notice' ) );
			}
		}
	}

	/**
	 * Display the admin notice.
	 */
	public function display_admin_notice() {

		$screen = get_current_screen();

		if ( isset( $screen->base ) && 'plugins' === $screen->base ) {
			$no_bug_url = wp_nonce_url( admin_url( 'plugins.php?' . $this->nobug_option . '=true' ), 'coblocks-feedback-nounce' );
			$time       = $this->seconds_to_words( time() - get_site_option( $this->date_option ) );
			?>

		<style>
		.notice.coblocks-notice {
			border-left-color: #1e35b9 !important;
			padding: 20px;
		}
		.rtl .notice.coblocks-notice {
			border-right-color: #1e35b9 !important;
		}
		.notice.notice.coblocks-notice .coblocks-notice-inner {
			display: table;
			width: 100%;
		}
		.notice.coblocks-notice .coblocks-notice-inner .coblocks-notice-icon,
		.notice.coblocks-notice .coblocks-notice-inner .coblocks-notice-content,
		.notice.coblocks-notice .coblocks-notice-inner .coblocks-install-now {
			display: table-cell;
			vertical-align: middle;
		}
		.notice.coblocks-notice .coblocks-notice-icon {
			color: #509ed2;
			font-size: 13px;
			width: 60px;
		}
		.notice.coblocks-notice .coblocks-notice-icon img {
			width: 64px;
		}
		.notice.coblocks-notice .coblocks-notice-content {
			padding: 0 40px 0 20px;
		}
		.notice.coblocks-notice p {
			padding: 0;
			margin: 0;
		}
		.notice.coblocks-notice h3 {
			margin: 0 0 5px;
		}
		.notice.coblocks-notice .coblocks-install-now {
			text-align: center;
		}
		.notice.coblocks-notice .coblocks-install-now .coblocks-install-button {
			padding: 6px 50px;
			height: auto;
			line-height: 20px;
			background: #1e35b9;
			border-color: #0d1f82 #0d1f82 #0d1f82;
			box-shadow: 0 1px 0 #0d1f82;
			text-shadow: 0 -1px 1px #0d1f82, 1px 0 1px #0d1f82, 0 1px 1px #0d1f82, -1px 0 1px #0d1f82;
		}
		.notice.coblocks-notice .coblocks-install-now .coblocks-install-button:hover {
			background: #182b96;
		}
		.notice.coblocks-notice a.no-thanks {
			display: block;
			margin-top: 10px;
			color: #72777c;
			text-decoration: none;
		}

		.notice.coblocks-notice a.no-thanks:hover {
			color: #444;
		}

		@media (max-width: 767px) {

			.notice.notice.coblocks-notice .coblocks-notice-inner {
				display: block;
			}
			.notice.coblocks-notice {
				padding: 20px !important;
			}
			.notice.coblocks-noticee .coblocks-notice-inner {
				display: block;
			}
			.notice.coblocks-notice .coblocks-notice-inner .coblocks-notice-content {
				display: block;
				padding: 0;
			}
			.notice.coblocks-notice .coblocks-notice-inner .coblocks-notice-icon {
				display: none;
			}

			.notice.coblocks-notice .coblocks-notice-inner .coblocks-install-now {
				margin-top: 20px;
				display: block;
				text-align: left;
			}

			.notice.coblocks-notice .coblocks-notice-inner .no-thanks {
				display: inline-block;
				margin-left: 15px;
			}
		}
		</style>
		<div class="notice updated coblocks-notice">
			<div class="coblocks-notice-inner">
				<div class="coblocks-notice-icon">
					<?php /* translators: 1. Name */ ?>
					<img src="<?php echo esc_url( COBLOCKS_PLUGIN_URL . 'dist/images/admin/icon-notice.jpg' ); ?>" alt="<?php printf( esc_attr__( '%s WordPress Plugin', 'coblocks' ), esc_attr( $this->name ) ); ?>" />
				</div>
				<div class="coblocks-notice-content">
					<?php /* translators: 1. Name */ ?>
					<h3><?php printf( esc_html__( 'Are you enjoying %s?', 'coblocks' ), esc_html( $this->name ) ); ?></h3>
					<p>
						<?php /* translators: 1. Name, 2. Time */ ?>
						<?php printf( esc_html__( 'You have been using %1$s for %2$s now. Mind leaving a review to let us know know what you think? We\'d really appreciate it!', 'coblocks' ), esc_html( $this->name ), esc_html( $time ) ); ?>
					</p>
				</div>
				<div class="coblocks-install-now">
					<?php printf( '<a href="%1$s" class="button button-primary coblocks-install-button" target="_blank">%2$s</a>', esc_url( 'https://wordpress.org/support/view/plugin-reviews/coblocks#new-post' ), esc_html__( 'Leave a Review', 'coblocks' ) ); ?>
					<a href="<?php echo esc_url( $no_bug_url ); ?>" class="no-thanks"><?php echo esc_html__( 'No thanks / I already have', 'coblocks' ); ?></a>
				</div>
			</div>
		</div>
			<?php
		}
	}

	/**
	 * Set the plugin to no longer bug users if user asks not to be.
	 */
	public function set_no_bug() {

		// Bail out if not on correct page.
		if ( ! isset( $_GET['_wpnonce'] ) || ( ! wp_verify_nonce( $_GET['_wpnonce'], 'coblocks-feedback-nounce' ) || ! is_admin() || ! isset( $_GET[ $this->nobug_option ] ) || ! current_user_can( 'manage_options' ) ) ) {
			return;
		}

		add_site_option( $this->nobug_option, true );
	}
}

/*
* Instantiate the CoBlocks_Feedback class.
*/
new CoBlocks_Feedback(
	array(
		'slug'       => 'coblocks_plugin_feedback',
		'name'       => __( 'CoBlocks', 'coblocks' ),
		'time_limit' => WEEK_IN_SECONDS,
	)
);

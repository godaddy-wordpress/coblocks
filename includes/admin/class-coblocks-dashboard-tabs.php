<?php
/**
 * Create @@pkg.title dashboard tabs
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
 * CoBlocks_Dashboard_Tabs Class
 */
class CoBlocks_Dashboard_Tabs {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'views_edit-coblocks', array( $this, 'print_tabs' ) );
		add_action( 'parse_query', array( $this, 'filter_types' ) );
	}

	/**
	 * Add an ID to the portfolio posts.
	 *
	 * @param  array $views Available views.
	 * @return array
	 */
	public function print_tabs( $views ) {
		$current_type = '';

		$active_class = ' nav-tab-active';

		if ( isset( $_REQUEST['coblocks_library_type'] ) && ! empty( esc_html( $_REQUEST['coblocks_library_type'] ) ) ) {
			$current_type = esc_html( $_REQUEST['coblocks_library_type'] );
			$active_class = '';
		}

		$baseurl = admin_url( 'edit.php?post_type=coblocks' );

		$tabs = array(
			'all'      => esc_html__( 'All', '@@textdomain' ),
			'template' => esc_html__( 'Page Templates', '@@textdomain' ),
			'section'  => esc_html__( 'Sections', '@@textdomain' ),
		);

		$tabs = apply_filters( 'coblocks_dashboard_tabs', $tabs );
		?>

		<div id="coblocks-library-tabs-wrapper" class="nav-tab-wrapper">
			<?php
			foreach ( $tabs as $key => $value ) {

				$active_class = '';

				if ( empty( $current_type ) ) {
					$current_type = 'all';
				}

				if ( $current_type === $key ) {
					$active_class = ' nav-tab-active';
				}

				$url = add_query_arg( 'coblocks_library_type', $key, $baseurl );
			?>
				<a class="nav-tab<?php echo esc_attr( $active_class ); ?>" href="<?php echo esc_url( $url ); ?>"><?php echo esc_html( $value ); ?></a>
			<?php } ?>
		</div>

		<?php
		return $views;
	}

	/**
	 * Filter template types in admin query.
	 * Fired by `parse_query` action.
	 *
	 * @param  array $query Query.
	 * @return array
	 */
	public function filter_types( $query ) {
		if ( ! function_exists( 'get_current_screen' ) ) {
			return;
		}

		$current_type      = '';
		$library_screen_id = 'edit-coblocks';
		$current_screen    = get_current_screen();

		if ( ! isset( $current_screen->id ) || $library_screen_id !== $current_screen->id || ! empty( $query->query_vars['meta_key'] ) ) {
			return;
		}

		if ( isset( $_REQUEST['coblocks_library_type'] ) && ! empty( esc_html( $_REQUEST['coblocks_library_type'] ) ) ) {
			$current_type = esc_html( $_REQUEST['coblocks_library_type'] );
		}

		if ( ! empty( $current_type ) && $current_type != 'all' ) {
			$query->query_vars['meta_key']   = 'coblocks_library_type';
			$query->query_vars['meta_value'] = $current_type;
		}
	}
}

return new CoBlocks_Dashboard_Tabs();

<?php
/**
 * Generate markup for the media modal.
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
 * CoBlocks_Modal Class
 */
class CoBlocks_Modal {

	/**
	 * The Constructor.
	 */
	public function __construct() {

		add_action( 'admin_footer', array( $this, 'media_modal' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_scripts' ) );
		add_action( 'coblocks_frame_content', array( $this, 'frame_content' ) );

		// API registration to fetch templates and sections.
		add_action(
			'rest_api_init', function () {
				if ( ! is_user_logged_in() ) {
					wp_die( esc_html__( 'Sorry you are not allowed to access this data.', '@@textdomain' ), 'cheatin eh?', 403 );
				}

				register_rest_route(
					'coblocks/v1', '/library/(?P<type>\w+)/(?P<path>[A-Za-z0-9\-\_\%]+)', array(
						'methods'  => 'GET',
						'callback' => array( $this, 'api' ),
					)
				);

				register_rest_route(
					'coblocks/v1', '/save/(?P<id>[\d]+)/(?P<type>\w+)/(?P<title>[a-zA-Z0-9\-\%]+)', array(
						'methods'  => 'GET',
						'callback' => array( $this, 'save_template' ),
					)
				);

			}
		);
	}

	/**
	 * Load scripts.
	 */
	public function admin_scripts() {

		global $pagenow, $post_type;

		if ( ! in_array( $pagenow, apply_filters( 'coblocks_create_modal_js', array( 'edit.php', 'post.php', 'post-new.php', 'index.php' ) ) ) ) {
			return false;
		}

		if ( in_array( $pagenow, array( 'edit.php' ) ) && $post_type != 'coblocks' ) {
			return false;
		}

		// Define where the asset is loaded from.
		$dir = CoBlocks()->asset_source( 'js' );

		wp_enqueue_script(
			'coblocks-modal',
			$dir . 'coblocks-modal' . COBLOCKS_ASSET_SUFFIX . '.js',
			array( 'jquery' ),
			COBLOCKS_VERSION,
			true
		);

		wp_localize_script(
			'coblocks-modal', 'CoBlocksVars', array(
				'nonce'           => wp_create_nonce( 'coblocks_inserter-nonce' ),
				'inserting'       => __( 'Inserting Selected Content...', '@@textdomain' ),
				'creating'        => __( 'Creating Template...', '@@textdomain' ),
				'create'          => __( 'CoBlocks', '@@textdomain' ),
				'name_section'    => __( 'Name of your Section', '@@textdomain' ),
				'create_section'  => __( 'Create Section', '@@textdomain' ),
				'name_template'   => __( 'Name of your Template', '@@textdomain' ),
				'create_template' => __( 'Create Template', '@@textdomain' ),
				'saved'           => __( 'Saved as draft template. Go to Appearance > All Templates to make any changes.', '@@textdomain' ),
				'has_pro'         => CoBlocks()->has_pro(),
			)
		);

		wp_enqueue_style( 'media-views' );
	}

	public function api( $request ) {
		$type   = $request->get_param( 'type' );
		$return = array();
		if ( in_array( $type, array( 'sections', 'templates', 'theme', 'template', 'saved', 'content', 'count', 'apiKey', 'theme_sections', 'template_type', 'convert', 'saved_templates', 'saved_sections' ) ) ) {
			$loader = new CoBlocks_Template_Loader();

			switch ( $type ) {
				case 'templates':
					$return = $loader->raw_data( 'templates' );
					break;

				case 'theme':
					$return = $loader->raw_data( 'theme' );
					break;

				case 'sections':
					$return = $loader->raw_data( 'sections' );
					break;

				case 'theme_sections':
					$return = $loader->raw_data( 'theme_sections' );
					break;

				case 'template':
					$path = $request->get_param( 'path' );
					if ( ! is_wp_error( $type ) ) {
						if ( ! class_exists( 'WP_Filesystem' ) ) {
							require_once ABSPATH . 'wp-admin/includes/file.php';
						}
						WP_Filesystem();
						global $wp_filesystem;

						$path = urldecode( $path );
						$path = str_replace( 'SLSH', '/', $path );

						if ( $wp_filesystem->exists( $path . 'content.txt' ) ) {
							$return = $wp_filesystem->get_contents( $path . 'content.txt' );
						}
					}
					break;

				case 'saved_templates':
					global $wpdb;

					$blocks = $wpdb->get_results( "SELECT p.post_title, p.ID, p.post_date, pm.meta_value FROM $wpdb->posts as p INNER JOIN $wpdb->postmeta AS pm ON pm.post_id = p.ID AND pm.meta_key='coblocks_library_type' AND pm.meta_value='template' WHERE p.post_type='coblocks' AND p.post_status = 'publish' ORDER BY post_title ASC" );

					// get post thumbnails
					if ( ! empty( $blocks ) ) {
						foreach ( $blocks as $block ) {
							if ( has_post_thumbnail( $block->ID ) ) {
								$block->thumbnail = get_the_post_thumbnail_url( $block->ID );
							} else {
								$block->thumbnail = '';
							}
						}
					}

					return $blocks;

					break;

				case 'saved_sections':
					global $wpdb;

					$blocks = $wpdb->get_results( "SELECT p.post_title, p.ID, p.post_date, pm.meta_value FROM $wpdb->posts as p INNER JOIN $wpdb->postmeta AS pm ON pm.post_id = p.ID AND pm.meta_key='coblocks_library_type' AND pm.meta_value='section' WHERE p.post_type='coblocks' AND p.post_status = 'publish' ORDER BY post_title ASC" );

					// get post thumbnails
					if ( ! empty( $blocks ) ) {
						foreach ( $blocks as $block ) {
							if ( has_post_thumbnail( $block->ID ) ) {
								$block->thumbnail = get_the_post_thumbnail_url( $block->ID );
							} else {
								$block->thumbnail = '';
							}
						}
					}

					return $blocks;

					break;

				case 'saved':
					global $wpdb;

					$blocks = $wpdb->get_results( "SELECT p.post_title, p.ID, p.post_date, pm.meta_value FROM $wpdb->posts as p INNER JOIN $wpdb->postmeta AS pm ON pm.post_id = p.ID AND pm.meta_key='coblocks_library_type'WHERE p.post_type='coblocks' AND p.post_status = 'publish' ORDER BY post_title ASC" );

					// get post thumbnails
					if ( ! empty( $blocks ) ) {
						foreach ( $blocks as $block ) {
							if ( has_post_thumbnail( $block->ID ) ) {
								$block->thumbnail = get_the_post_thumbnail_url( $block->ID );
							} else {
								$block->thumbnail = '';
							}
						}
					}

					return $blocks;

					break;

				case 'content':
						$path = $request->get_param( 'path' );
						$meta = get_post_meta( $path, '_coblocks_attr', true );
					return array(
						'meta'    => $meta,
						'content' => get_post_field( 'post_content', $path ),
					);
					break;

				case 'template_type':
						$path = $request->get_param( 'path' );
						$meta = get_post_meta( $path, 'coblocks_library_type', true );
					return array(
						'meta' => $meta,
					);
					break;

				case 'count':
					if ( CoBlocks()->has_pro() ) {
						// check for pro version
						return '-1';
					}
					return wp_count_posts( 'coblocks' );
					break;

				case 'apiKey':
					return get_option( 'coblocks-map-apiKey' );
					break;

				default:
					// code...
					break;
			}
		}
		return $return;
	}

	/**
	 * Template save function.
	 */
	function save_template( $request ) {
		$id    = $request->get_param( 'id' );
		$type  = $request->get_param( 'type' );
		$title = $request->get_param( 'title' );

		if ( ! in_array( $type, array( 'template', 'section' ), true ) ) {
			return;
		}
		if ( ! empty( $id ) && ! empty( $type ) ) {
			$fonts = get_post_meta( $id, '_coblocks_attr', true );
			$new   = array(
				'post_title'   => urldecode( $title ),
				'post_content' => get_post_field( 'post_content', $id ),
				'post_type'    => 'coblocks',
				'post_status'  => 'publish',
				'meta_input'   => array(
					'coblocks_library_type' => $type,
					'_coblocks_id'          => $id,
					'_coblocks_attr'        => $fonts,
				),
			);

			$post_id = wp_insert_post( $new );
			if ( $post_id ) {
				return 'created';
			}
		}
	}

	/**
	 * Render modal.
	 */
	public function media_modal() {
		global $post; ?>
			<div class="coblocks-default-ui-wrapper" style="display: none;">

				<div class="coblocks-default-ui coblocks image-meta <?php echo ( isset( $_GET['add-new'] ) && sanitize_text_field( $_GET['add-new'] ) ) ? 'coblocks-autoOpen' : ''; ?>" data-post-id="<?php echo esc_attr( ( isset( $post->ID ) ) ? $post->ID : '' ); ?>">

					<div class="media-modal wp-core-ui no-sidebar">

						<button type="button" class="media-modal-close"><span class="media-modal-icon"><span class="screen-reader-text"><?php esc_html_e( 'Close media panel', '@@textdomain' ); ?></span></span></button>

						<div class="media-modal-content">

							<div class="media-frame wp-core-ui hide-menu coblocks-meta-wrap">

								<div class="media-frame-title">
									<h1><?php esc_html_e( 'CoBlocks', '@@textdomain' ); ?></h1>
								</div>

								<div class="media-frame-content" data-columns="3">
									<div class="attachments-browser">
										<div class="coblocks-spinner"><span class="spinner is-active"></span></div>
										<?php echo do_action( 'coblocks_frame_content' ); ?>
									</div>
								</div>

							</div>

						</div>

					</div>

					<div class="media-modal-backdrop"></div>

				</div>

			</div>
		<?php
	}

	/**
	 * Content.
	 */
	public function frame_content( $post ) {

	?>
		<div class="coblocks-create attachments">
			<form class="coblocks-creation" method="POST">
				<input type="hidden" name="coblocks[postid]" value="<?php echo esc_attr( ( isset( $post->ID ) ) ? $post->ID : '' ); ?>" />
				<input type="hidden" name="coblocks_action" value="create_template" />
				<p>
					<label for="blocktemplate-name"><?php esc_html_e( 'Name of your Template', '@@textdomain' ); ?></label>
					<input type="text" name="coblocks[name]" class="blocktemplate-required" id="blocktemplate-name" />
				</p>
				<p>
					<label for="blocktemplate-type"><?php esc_html_e( 'Select Type', '@@textdomain' ); ?></label>
					<select name="coblocks[type]" class="blocktemplate-required" id="blocktemplate-type">
						<option value="template"><?php esc_html_e( 'Page Template', '@@textdomain' ); ?></option>
						<option value="section"><?php esc_html_e( 'Section', '@@textdomain' ); ?></option>
					</select>
				</p>
					<input type="submit" class="button button-primary" value="<?php esc_html_e( 'Create Template', '@@textdomain' ); ?>" />
			</form>
		</div>
	<?php
	}
}

return new CoBlocks_Modal();

<?php
/**
 * Crop settings extension.
 *
 * @package CoBlocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Crop Settings Class
 */
class CoBlocks_Crop_Settings {

	const ORIGINAL_META_KEY = 'original-image-id';

	const CROP_META_KEY = 'crop-image-data';

	/**
	 * This class's instance.
	 *
	 * @var CoBlocks
	 * @since 1.14.0
	 */
	private static $instance;

	/**
	 * Main CoBlocks_Crop_Settings Instance.
	 *
	 * Insures that only one instance of CoBlocks_Crop_Settings exists in memory at any one
	 * time. Also prevents needing to define globals all over the place.
	 *
	 * @since 1.14.0
	 * @static
	 * @return object|CoBlocks_Crop_Settings The one true CoBlocks_Crop_Settings
	 */
	public static function instance() {

		if ( empty( self::$instance ) ) {

			self::$instance = new CoBlocks_Crop_Settings();

		}

		return self::$instance;

	}

	/**
	 * Register the ajax endpoints
	 *
	 * @since 1.14.0
	 */
	public function register_endpoints() {

		add_filter( 'ajax_query_attachments_args', array( $this, 'hide_cropped_from_library' ) );
		add_action( 'wp_ajax_coblocks_crop_settings', array( $this, 'api_crop' ) );
		add_action( 'wp_ajax_coblocks_crop_settings_original_image', array( $this, 'get_original_image' ) );

	}

	/**
	 * Hide the cropped image from the media library
	 *
	 * @param array $query The post query.
	 * @return array Media attachments query array.
	 */
	public function hide_cropped_from_library( $query ) {

		$tag = get_term_by( 'slug', 'coblocks-cropped', 'post_tag' );

		if ( ! empty( $tag ) ) {

			$query['tag__not_in'][] = $tag->term_id;

		}

		return $query;

	}

	/**
	 * Retrieve the original image.
	 */
	public function get_original_image() {
		$nonce = filter_input( INPUT_POST, 'nonce' );

		if ( ! $nonce ) {

			wp_send_json_error( 'No nonce value present.' );

		}

		if ( ! wp_verify_nonce( htmlspecialchars( $nonce ), 'cropSettingsOriginalImageNonce' ) ) {

			wp_send_json_error( 'Invalid nonce value.' );

		}

		$id = filter_input( INPUT_POST, 'id', FILTER_SANITIZE_NUMBER_INT );

		if ( ! $id ) {

			wp_send_json_error( 'Missing id value.' );

		}

		$attachment_meta   = wp_get_attachment_metadata( $id );
		$original_image_id = isset( $attachment_meta[ self::ORIGINAL_META_KEY ] ) ? $attachment_meta[ self::ORIGINAL_META_KEY ] : $id;

		$crop = isset( $attachment_meta[ self::CROP_META_KEY ] ) ? $attachment_meta[ self::CROP_META_KEY ] : null;

		wp_send_json_success(
			array(
				'id'   => $original_image_id,
				'url'  => wp_get_attachment_image_url( $original_image_id, 'original' ),
				'crop' => $crop,
			)
		);

	}

	/**
	 * Cropping.
	 */
	public function api_crop() {
		$nonce = filter_input( INPUT_POST, 'nonce' );

		if ( ! $nonce ) {

			wp_send_json_error( 'No nonce value present.' );

		}

		if ( ! wp_verify_nonce( htmlspecialchars( $nonce ), 'cropSettingsNonce' ) ) {

			wp_send_json_error( 'Invalid nonce value.' );

		}

		if (
			! isset( $_POST['id'] ) ||
			! isset( $_POST['cropX'] ) ||
			! isset( $_POST['cropY'] ) ||
			! isset( $_POST['cropWidth'] ) ||
			! isset( $_POST['cropHeight'] ) ||
			! isset( $_POST['cropRotation'] )
		) {

			wp_send_json_error();

		}

		$new_id = $this->image_media_crop(
			intval( $_POST['id'] ),
			floatval( $_POST['cropX'] ),
			floatval( $_POST['cropY'] ),
			floatval( $_POST['cropWidth'] ),
			floatval( $_POST['cropHeight'] ),
			floatval( $_POST['cropRotation'] )
		);

		if ( null === $new_id ) {

			wp_send_json_error();

		}

		wp_send_json_success(
			array(
				'success' => true,
				'id'      => $new_id,
				'url'     => wp_get_attachment_image_url( $new_id, 'original' ),
			)
		);

	}

	/**
	 * Crop the image
	 *
	 * @param int   $id The attachment id.
	 * @param float $offset_x The x offset.
	 * @param float $offset_y The y offset.
	 * @param float $width The width.
	 * @param float $height The height.
	 * @param float $rotate THe rotation.
	 *
	 * @return id|null The cropped image id.
	 */
	public function image_media_crop( $id, $offset_x, $offset_y, $width, $height, $rotate ) {

		require_once ABSPATH . 'wp-admin/includes/image.php';

		$attachment_meta   = wp_get_attachment_metadata( $id );
		$original_image_id = isset( $attachment_meta[ self::ORIGINAL_META_KEY ] ) ? $attachment_meta[ self::ORIGINAL_META_KEY ] : $id;

		$file_path = get_attached_file( $original_image_id );

		if ( empty( $file_path ) ) {

			return null;

		}

		$image_editor = wp_get_image_editor( $file_path );
		$loaded       = $image_editor->load();

		if ( ! $loaded ) {

			return null;

		}

		$nr = ( 360 - round( $rotate ) ) % 360;
		$sz = $image_editor->get_size();

		if ( 0 !== $nr && 180 !== $nr ) {

			$original_width = $sz['width'];
			$sz['width']    = $sz['height'];
			$sz['height']   = $original_width;

		}

		$nx = round( $sz['width'] * $offset_x / 100 );
		$ny = round( $sz['height'] * $offset_y / 100 );
		$nw = round( $sz['width'] * $width / 100 );
		$nh = round( $sz['height'] * $height / 100 );

		$new_name = 'crop-' . $nx . '-' . $ny . '-' . $nw . '-' . $nh . '-' . $nr . '-' . basename( $file_path );
		$filename = rtrim( dirname( $file_path ), '/' ) . '/' . $new_name;

		$existing_attachment = get_page_by_title( $new_name, ARRAY_A, 'attachment' );

		if ( ! empty( $existing_attachment ) ) {

			return $existing_attachment['ID'];

		}

		if ( ! empty( $nr ) ) {

			$image_editor->rotate( $nr );

		}

		$cropped = $image_editor->crop( $nx, $ny, $nw, $nh );

		if ( ! $cropped ) {

			return null;

		}

		$saved_image = $image_editor->save( $filename );

		if ( $saved_image instanceof WP_Error ) {

			return null;

		}

		$filename  = $saved_image['path'];
		$mime_type = $saved_image['mime-type'];

		$attachment_id = wp_insert_attachment(
			array(
				'guid'           => $filename,
				'post_mime_type' => $mime_type,
				'post_title'     => $new_name,
				'post_content'   => '',
				'post_status'    => 'inherit',
			),
			$filename,
			0
		);

		$metadata = wp_generate_attachment_metadata( $attachment_id, $filename );

		$metadata[ self::ORIGINAL_META_KEY ] = $original_image_id;
		$metadata[ self::CROP_META_KEY ]     = array(
			'offsetX'  => $offset_x,
			'offsetY'  => $offset_y,
			'width'    => $width,
			'height'   => $height,
			'rotation' => $rotate,
		);

		wp_update_attachment_metadata( $attachment_id, $metadata );

		wp_set_post_tags( $attachment_id, 'coblocks-cropped', true );

		return $attachment_id;

	}
}

CoBlocks_Crop_Settings::instance()->register_endpoints();

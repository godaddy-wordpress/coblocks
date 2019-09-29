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

	private static $instance;

	public static function instance() {

		if ( empty( self::$instance ) ) {

			self::$instance = new CoBlocks_Crop_Settings();

		}

		return self::$instance;

	}

	public function register_endpoints() {

		add_filter( 'ajax_query_attachments_args', [ $this, 'hide_cropped_from_library' ] );
		add_action( 'wp_ajax_coblocks_crop_settings', [ $this, 'api_crop' ] );
		add_action( 'wp_ajax_coblocks_crop_settings_original_image', [ $this, 'get_original_image' ] );

	}

	/**
	 * Hide the cropped image from the media library
	 *
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

		$id = filter_input( INPUT_POST, 'id', FILTER_SANITIZE_NUMBER_INT );

		if ( ! $id ) {

			wp_send_json_error();

		}

		$attachment_meta   = wp_get_attachment_metadata( $id );
		$original_image_id = isset( $attachment_meta[ self::ORIGINAL_META_KEY ] ) ? $attachment_meta[ self::ORIGINAL_META_KEY ] : $id;

		$crop = isset( $attachment_meta[ self::CROP_META_KEY ] ) ? $attachment_meta[ self::CROP_META_KEY ] : null;

		wp_send_json_success(
			[
				'id'   => $original_image_id,
				'url'  => wp_get_attachment_image_url( $original_image_id, 'original' ),
				'crop' => $crop,
			]
		);

	}

	/**
	 * Cropping.
	 */
	public function api_crop() {

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
			[
				'success' => true,
				'id'      => $new_id,
				'url'     => wp_get_attachment_image_url( $new_id, 'original' ),
			]
		);

	}

	public function image_media_crop( $id, $offset_x, $offset_y, $width, $height, $rotate ) {

		require_once( ABSPATH . 'wp-admin/includes/image.php' );

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
			[
				'guid'           => $filename,
				'post_mime_type' => $mime_type,
				'post_title'     => $new_name,
				'post_content'   => '',
				'post_status'    => 'inherit',
			],
			$filename,
			0
		);

		$metadata = wp_generate_attachment_metadata( $attachment_id, $filename );

		$metadata[ self::ORIGINAL_META_KEY ] = $original_image_id;
		$metadata[ self::CROP_META_KEY ]     = [
			'offsetX'  => $offset_x,
			'offsetY'  => $offset_y,
			'width'    => $width,
			'height'   => $height,
			'rotation' => $rotate,
		];

		wp_update_attachment_metadata( $attachment_id, $metadata );

		wp_set_post_tags( $attachment_id, 'coblocks-cropped', true );

		return $attachment_id;

	}
}

CoBlocks_Crop_Settings::instance()->register_endpoints();

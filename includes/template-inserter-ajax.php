<?php
/**
 * Process AJAX.
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

function coblocks_ajax_inserter() {
	$response = array( 'errors' => array() );
	if ( ! isset( $_POST['method'] ) ) {
		return;
	}
	if ( ! isset( $_POST['nonce'] ) ) {
		return;
	}

	if ( ! wp_verify_nonce( $_POST['nonce'], 'coblocks_inserter-nonce' ) ) {
		return;
	}

	switch ( $_POST['method'] ) {

		case 'create_template':
			if ( ! $_POST['formdata'] ) {
				return;
			}

			$formdata = wp_parse_str( $_POST['formdata'], $data );

			if ( isset( $data['coblocks'] ) && isset( $data['coblocks']['name'] ) && ! empty( $data['coblocks']['name'] ) ) {

				$new = array(
					'post_title'  => $data['coblocks']['name'],
					'post_type'   => 'coblocks',
					'post_status' => 'draft',
					'meta_input'  => array(
						'coblocks_library_type' => $data['coblocks']['type'],
					),
				);

				$post_id = wp_insert_post( $new );

				if ( $post_id ) {
					$response['templateid'] = $post_id;
					$response['redirect']   = admin_url( 'post.php?post=' . $post_id . '&action=edit' );
				}
			}

			break;

		case 'save_template':
			if ( ! $_POST['formdata'] ) {
				return;
			}

			$formdata = wp_parse_str( $_POST['formdata'], $data );

			if ( isset( $data['coblocks'] ) && isset( $data['coblocks']['name'] ) && ! empty( $data['coblocks']['name'] ) ) {

				$new = array(
					'post_title'   => $data['coblocks']['name'],
					'post_content' => get_post_field( 'post_content', $data['coblocks']['postid'] ),
					'post_type'    => 'coblocks',
					'post_status'  => 'draft',
					'meta_input'   => array(
						'coblocks_library_type' => $data['coblocks']['type'],
					),
				);

				$post_id = wp_insert_post( $new );

				if ( $post_id ) {
					$response['templateid'] = $post_id;
				}
			}
			break;

		case 'load_limit':
			$response['wp_count_posts'] = wp_count_posts( 'coblocks' );
			break;

		default:
			break;
	}

	$response['response']   = 'success';
	$response['closeModal'] = true;
	$response               = (object) $response;

	echo wp_json_encode( $response );

	die();
}
add_action( 'wp_ajax_coblocks_ajax_inserter', 'coblocks_ajax_inserter' );

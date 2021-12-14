<?php
/**
 * Handle search function to proxy Opentable request.
 *
 * @package CoBlocks
 */

/**
 * Base Class for proxying Opentable requests.
 */
class Coblocks_Opentable {

	/**
	 * Holds the pase path to our search proxy to send into JS.
	 *
	 * @var string
	 */
	private $search_proxy_path = '/opentable/search/';

	/**
	 * Function constructor.
	 */
	public function __construct() {

		add_action( 'rest_api_init', array( $this, 'api_endpoints' ) );

		add_action( 'enqueue_block_editor_assets', array( $this, 'editor_scripts' ) );

	}

	/**
	 * Registering REST APi proxy.
	 *
	 * @return void
	 */
	public function api_endpoints() {

		register_rest_route(
			COBLOCKS_API_NAMESPACE,
			$this->search_proxy_path . '(?P<query>.*)',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'permission_callback' => function() {
					// See https://wordpress.org/support/article/roles-and-capabilities/#edit_posts.
					return current_user_can( 'edit_posts' );
				},
				'show_in_index'       => false,
				'args'                => array(
					'query' => array(
						'description'       => 'The query to send opentable.',
						'type'              => 'string',
						'sanitize_callback' => 'sanitize_text_field',
					),
				),
				'callback'            => array( $this, 'api_proxy' ),
			)
		);

	}

	/**
	 * Make the request to the Opentable API and return the result.
	 *
	 * @param \WP_REST_Request $request Contains the rest request object.
	 *
	 * @return \WP_REST_Response
	 */
	public function api_proxy( \WP_REST_Request $request ) {

		$api_resp = wp_remote_get(
			'https://www.opentable.com/widget/reservation/restaurant-search?pageSize=15&query=' . $request->get_param( 'query' ),
			array(
				// Without this user agent syntax the API doesn't respond at all...
				'user-agent' => 'Mozilla/5.0 Chrome/96 Safari/537',
				'headers'    => array(
					'Accept' => 'application/json',
				),
			)
		);

		if ( is_wp_error( $api_resp ) ) {

			return rest_ensure_response( $api_resp );

		}

		try {

			$body = json_decode( $api_resp['body'], true );

		} catch ( exception $e ) {

			return new \WP_Error( 'parsing_error', 'Error reading body of response.', array( 'status' => 500 ) );

		}

		return rest_ensure_response(
			new \WP_REST_Response(
				$body,
				$api_resp['response']['code']
			)
		);

	}

	/**
	 * Localize script to tell the API proxy path to JavaScript.
	 *
	 * @return void
	 */
	public function editor_scripts() {

		wp_localize_script(
			'coblocks-editor',
			'coblocksOpentable',
			array(
				'searchProxy' => COBLOCKS_API_NAMESPACE . $this->search_proxy_path,
			)
		);

	}

}

new Coblocks_Opentable();

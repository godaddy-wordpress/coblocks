<?php
/**
 * Proxy for Yelp API requests
 *
 * @package coblocks
 */

/**
 * Base class for proxying Yelp Block requests
 */
class Coblocks_Yelp_Proxy {

	/**
	 * Base path for the Yelp API Proxy for Business Searches
	 *
	 * @var string
	 */
	private $yelp_biz_search_proxy_path = '/yelp/biz_search';

	/**
	 * Base path for the Yelp API Proxy for Business Reviews
	 *
	 * @var string
	 */
	private $yelp_biz_reviews_proxy_path = '/yelp/biz_reviews';

	/**
	 * Function constructor
	 */
	public function __construct() {

		add_action( 'rest_api_init', array( $this, 'yelp_api_endpoints' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'editor_scripts' ) );

	}

	/**
	 * Registering REST API proxy.
	 *
	 * @return void
	 */
	public function yelp_api_endpoints() {

		register_rest_route(
			COBLOCKS_API_NAMESPACE,
			$this->yelp_biz_search_proxy_path,
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'permission_callback' => function() {
					return current_user_can( 'edit_posts' );    // See https://wordpress.org/support/article/roles-and-capabilities/#edit_posts.
				},
				'show_in_index'       => false,
				'args'                => array(
					'biz_name' => array(
						'description'       => 'The name of the business to query yelp for.',
						'type'              => 'string',
						'sanitize_callback' => 'sanitize_text_field',
					),
					'biz_loc'  => array(
						'description'       => 'The location of the business to query yelp for.',
						'type'              => 'string',
						'sanitize_callback' => 'sanitize_text_field',
					),
				),
				'callback'            => array( $this, 'yelp_biz_search_api_proxy' ),
			)
		);

		register_rest_route(
			COBLOCKS_API_NAMESPACE,
			$this->yelp_biz_reviews_proxy_path,
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'permission_callback' => function() {
					return current_user_can( 'edit_posts' );    // See https://wordpress.org/support/article/roles-and-capabilities/#edit_posts.
				},
				'show_in_index'       => false,
				'args'                => array(
					'biz_id' => array(
						'description'       => 'The yelp business id of the business to get reviews for.',
						'type'              => 'string',
						'sanitize_callback' => 'sanitize_text_field',
					),
				),
				'callback'            => array( $this, 'yelp_biz_reviews_api_proxy' ),
			)
		);

	}

	/**
	 * Forwards requests to Yelp's business search API and returns results.
	 *
	 * @param \WP_REST_Request $request Contains the rest request object.
	 *
	 * @return \WP_REST_Response
	 */
	public function yelp_biz_search_api_proxy( \WP_REST_Request $request ) {

		$response = wp_remote_get(
			'https://www.yelp.com/search_suggest/v2/prefetch?loc=' . $request->get_param( 'biz_loc' ) . '&loc_name_param=loc&prefix=' . $request->get_param( 'biz_name' ),
			array(
				// Without this user agent syntax the API doesn't respond at all...
				'user-agent' => 'Mozilla/5.0 Chrome/96 Safari/537',
				'headers'    => array(
					'Accept' => 'application/json',
				),
			)
		);

		// Return early with server response if response is instanceof WP_Error.
		if ( is_wp_error( $response ) ) {
			return rest_ensure_response( $response );
		}

		try {
			$body = json_decode( $response['body'], true );
		} catch ( exception $e ) {
			return new \WP_Error( 'parsing_error', 'Error reading body of response.', array( 'status' => 500 ) );
		}

		return rest_ensure_response(
			new \WP_REST_Response(
				$body,
				$response['response']['code']
			)
		);

	}

	/**
	 * Forwards requests to Yelp's reviews API and returns results.
	 *
	 * @param \WP_REST_Request $request Contains the rest request object.
	 *
	 * @return \WP_REST_Response
	 */
	public function yelp_biz_reviews_api_proxy( \WP_REST_Request $request ) {

		// For storing transients name.
		$transients_name = 'cb_reviews_' . $request->get_param( 'biz_id' ) . '_' . $request->get_param( 'paginateStart' );

		// Check if the request data was cached.
		$res_body = get_transient( $transients_name );

		if ( ! $res_body ) {
			// request not cached. make the API call and cache the response using transients.
			$response = wp_remote_get(
				'https://www.yelp.com/biz/' . $request->get_param( 'biz_id' ) . '/review_feed?start=' . $request->get_param( 'paginateStart' ),
				array(
					// Without this user agent syntax the API doesn't respond at all...
					'user-agent' => 'Mozilla/5.0 Chrome/96 Safari/537',
					'headers'    => array(
						'Accept' => 'application/json',
					),
				)
			);

			// return early with server response if response is instanceof WP_Error. errors are not cached.
			if ( is_wp_error( $response ) ) {
				return rest_ensure_response( $response );
			}

			// get the response body.
			try {
				$res_body = json_decode( $response['body'], true );
			} catch ( exception $e ) {
				return new \WP_Error( 'parsing_error', 'Error reading body of response.', array( 'status' => 500 ) );
			}

			// cache the body of the response for 10 min for future identical requests to use.
			// ignoring the return value here, as there isn't much we can do if storing the response fails.
			set_transient( $transients_name, $res_body, 600 );
			$res_body['cached'] = false;
		} else {
			$res_body['cached'] = true;
		}

		// return the response body (from cache or from api response).
		return rest_ensure_response(
			new \WP_REST_Response(
				$res_body,
				200
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
			'coblocksYelp',
			array(
				'bizSearchProxy' => COBLOCKS_API_NAMESPACE . $this->yelp_biz_search_proxy_path,
				'bizReviewsProxy' => COBLOCKS_API_NAMESPACE . $this->yelp_biz_reviews_proxy_path,
			)
		);

	}

}

new Coblocks_Yelp_Proxy();

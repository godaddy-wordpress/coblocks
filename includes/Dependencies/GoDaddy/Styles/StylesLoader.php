<?php
/**
 * The StylesLoader class.
 *
 * @package GoDaddy
 */

namespace GoDaddy\WordPress\Plugins\CoBlocks\Dependencies\GoDaddy\Styles;

/**
 * The StylesLoader class.
 */
class StylesLoader {
	/**
	 * The plugin version.
	 *
	 * @var string
	 */
	const VERSION = '2.0.2';

	/**
	 * The style handle.
	 *
	 * @var string
	 */
	const HANDLE = 'godaddy-styles';

	/**
	 * The base path.
	 *
	 * @var string
	 */
	protected $base_path;

	/**
	 * The base url.
	 *
	 * @var string
	 */
	protected $base_url;

	/**
     * The current instance.
     *
     * @var static
     */
    protected static $instance;

	/**
     * Get the instance.
     *
     * @return static
     */
    public static function getInstance() {
        if ( is_null( static::$instance ) ) {
            static::$instance = new static;
        }

        return static::$instance;
    }

    /**
     * Set the instance.
     *
     * @param  StylesLoader|null  $instance
     * @return StylesLoader|static
     */
    public static function setInstance( StylesLoader $instance = null ) {
        return static::$instance = $instance;
    }

	public function boot() {
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue' ) );
	}

	public function enqueue() {
		if (
			$this->hasRegistered() &&
			! $this->isMustUse() &&
			version_compare( static::VERSION, $this->getRegisteredVersion(), '>' )
		) {
			wp_styles()->remove( static::HANDLE );
		}

		$path_partial = $this->assetPathPartial();
		$build_file_path = $this->base_path . 'build/' . $path_partial . '.asset.php';

		$asset_file = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG && file_exists( $build_file_path )
			? include $build_file_path
			: array(
				'dependencies' => array( 'wp-components' ),
				'version'      => static::VERSION,
			);

		wp_enqueue_style(
			static::HANDLE,
			$this->base_url . 'build/' . $path_partial . '.css',
			$asset_file['dependencies'],
			$asset_file['version']
		);
	}

	public function setBasePath( $path ) {
		$this->base_path = $path;
	}

	public function setBaseUrl( $url ) {
		$this->base_url = $url;
	}

	public function hasRegistered() {
		return wp_styles()->query( static::HANDLE ) !== false;
	}

	public function getRegistered() {
		return wp_styles()->query( static::HANDLE );
	}

	public function isMustUse() {
		$src = $this->getRegistered()->src;
		return ! empty( $src ) && strpos( $src, 'mu-plugins' ) !== false;
	}

	public function getRegisteredVersion() {
		return $this->getRegistered()->ver;
	}

	public function assetPathPartial() {
		global $wp_version;
		$version_parts = explode( '.', $wp_version );

		// Array containing version number target order.
		$version_targets = array();

		// If the current version has a minor part (the betas and RCs don't have one)
		if ( array_key_exists( 2, $version_parts )) {
			// Build and push minor version numbers to targets array.
			for ($minor_version = 0; $minor_version <= $version_parts[2]; $minor_version++) {
				array_push(
					$version_targets,
					implode('.', array($version_parts[0], $version_parts[1], $minor_version))
				);
			}
		}

		// Sort in reverse order so the latest minor version is first.
		rsort( $version_targets );

		$asset_path_partial = null;

		// Look for the stylesheet matching the current version number.
		foreach( $version_targets as $version_number ) {
			if ( file_exists( $this->base_path . 'build/wp/' . $version_number . '.css' ) ) {
				$asset_path_partial = 'wp/' . $version_number;
				break;
			}
		}

		// Default to latest.css if no versioned file was found.
		if ( empty( $asset_path_partial ) ) {
			$asset_path_partial = 'latest';
		}

		return $asset_path_partial;
	}
}

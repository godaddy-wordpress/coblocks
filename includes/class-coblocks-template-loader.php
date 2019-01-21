<?php
/**
 * Load templates and
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
 * Main @@pkg.title Template Loader Class
 *
 * @since 1.0.0
 */
class CoBlocks_Template_Loader {

	/**
	 * Load the core plugin templates.
	 *
	 * @access public
	 */
	public function load_templates() {
		$templates = array();

		foreach ( glob( dirname( __DIR__ ) . '/includes/templates/*/template.txt' ) as $template ) {
			$folder            = str_replace( '/template.txt', '/', $template );
			$file_data         = get_file_data(
				$template, array(
					'name'        => 'Template Name',
					'type'        => 'Template Type',
					'description' => 'Description',
					'version'     => 'Version',
					'slug'        => 'Slug',
					'uri'         => 'Template URI',
					'tags'        => 'Tags',
					'pro'         => 'Pro',
					'fonts'       => 'Fonts',
				)
			);
			$file_data['path'] = $folder;

			// check if pro available and change template path
			if ( CoBlocks()->has_pro() && $file_data['pro'] ) {
				$file_data['has_pro'] = true;
				$file_data['path']    = str_replace( '/coblocks/', '/coblocks-pro/', $folder );
			}

			$file_data['url']        = plugin_dir_url( $template );
			$file_data['screenshot'] = $file_data['url'] . 'screenshot.jpg';

			// Store to templates array.
			$templates[ $file_data['slug'] ] = $file_data;
		}

		return $templates;
	}

	/**
	 * Load the core plugin sections, which are collections of pre-designed blocks.
	 *
	 * @access public
	 */
	public function load_sections() {
		$sections = array();

		foreach ( glob( dirname( __DIR__ ) . '/includes/sections/*/section.txt' ) as $section ) {
			$folder            = str_replace( '/section.txt', '/', $section );
			$file_data         = get_file_data(
				$section, array(
					'name'        => 'Template Name',
					'type'        => 'Template Type',
					'description' => 'Description',
					'version'     => 'Version',
					'slug'        => 'Slug',
					'uri'         => 'Template URI',
					'tags'        => 'Tags',
					'pro'         => 'Pro',
					'fonts'       => 'Fonts',
				)
			);
			$file_data['path'] = $folder;

			// check if pro available and change template path
			if ( CoBlocks()->has_pro() && $file_data['pro'] ) {
				$file_data['has_pro'] = true;
				$file_data['path']    = str_replace( '/coblocks/', '/coblocks-pro/', $folder );
			}

			$file_data['url']        = plugin_dir_url( $section );
			$file_data['screenshot'] = $file_data['url'] . 'screenshot.jpg';

			// Store to sections array.
			$sections[ $file_data['slug'] ] = $file_data;
		}

		return $sections;
	}

	/**
	 * Load any templates included by a theme.
	 *
	 * @access public
	 */
	public function load_theme_templates() {
		$templates = array();

		foreach ( glob( get_stylesheet_directory() . '/coblocks/templates/*/template.txt' ) as $template ) {
			$folder    = str_replace( '/template.txt', '/', $template );
			$file_data = get_file_data(
				$template, array(
					'name'        => 'Template Name',
					'type'        => 'Template Type',
					'description' => 'Description',
					'version'     => 'Version',
					'slug'        => 'Slug',
					'uri'         => 'Template URI',
					'tags'        => 'Tags',
					'pro'         => 'Pro',
				)
			);

			$theme_folder            = str_replace( realpath( get_stylesheet_directory() ), '', $folder );
			$file_data['type']       = 'theme';
			$file_data['path']       = $folder;
			$file_data['url']        = get_stylesheet_directory_uri( $template ) . $theme_folder;
			$file_data['screenshot'] = $file_data['url'] . '/screenshot.jpg';

			// Store to templates array.
			$templates[ $file_data['slug'] ] = $file_data;
		}

		return $templates;
	}

	/**
	 * Load any sections included by a theme.
	 *
	 * @access public
	 */
	public function load_theme_sections() {
		$templates = array();

		foreach ( glob( get_stylesheet_directory() . '/coblocks/sections/*/section.txt' ) as $section ) {
			$folder                  = str_replace( '/section.txt', '/', $section );
			$file_data               = get_file_data(
				$section, array(
					'name'        => 'Template Name',
					'type'        => 'Template Type',
					'description' => 'Description',
					'version'     => 'Version',
					'slug'        => 'Slug',
					'uri'         => 'Template URI',
					'tags'        => 'Tags',
					'pro'         => 'Pro',
				)
			);
			$theme_folder            = str_replace( realpath( get_stylesheet_directory() ), '', $folder );
			$file_data['path']       = $folder;
			$file_data['url']        = get_stylesheet_directory_uri( $section ) . $theme_folder;
			$file_data['screenshot'] = $file_data['url'] . 'screenshot.jpg';

			// Store to sections array.
			$sections[ $file_data['slug'] ] = $file_data;
		}

		return $sections;
	}

	/**
	 * Load any stylesheets required by a template or section.
	 *
	 * @access public
	 */
	public function load_styles() {
		$styles = array();

		// Load styles for templates.
		foreach ( glob( dirname( __DIR__ ) . '/includes/templates/*/style.css' ) as $template ) {
			$details                        = str_replace( '/style.css', '/template.txt', $template );
			$data                           = get_file_data(
				$details, array(
					'version' => 'Version',
					'slug'    => 'Slug',
				)
			);
			$data['type']                   = 'template';
			$data['url']                    = plugin_dir_url( $template ) . 'style.css';
			$styles[ 't-' . $data['slug'] ] = $data;
		}

		// Load styles for sections.
		foreach ( glob( dirname( __DIR__ ) . '/includes/sections/*/style.css' ) as $section ) {
			$file                                = str_replace( '/style.css', '/section.txt', $section );
			$file_data                           = get_file_data(
				$file, array(
					'version' => 'Version',
					'slug'    => 'Slug',
				)
			);
			$file_data['type']                   = 'section';
			$file_data['url']                    = plugin_dir_url( $section ) . 'style.css';
			$styles[ 's-' . $file_data['slug'] ] = $file_data;
		}

		return $styles;
	}

	/**
	 * Process raw data.
	 *
	 * @access public
	 */
	public function raw_data( $type ) {
		switch ( $type ) {
			case 'templates':
				$templates = $this->load_templates();
				return $templates;
			break;

			case 'theme':
				$templates = $this->load_theme_templates();
				return $templates;
			break;

			case 'sections':
				$templates = $this->load_sections();
				return $templates;
			break;

			case 'theme_sections':
				$templates = $this->load_theme_sections();
				return $templates;
			break;

			default:
				break;
		}
	}
}

<?php
/**
 * CoBlocks_Block_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Block_Migration class.
 *
 * An abstract class providing common functionality to make block
 * migrations to a "dynamic block" with relative attributes easier.
 */
abstract class CoBlocks_Block_Migration {
	/**
	 * The DOMDocument instance.
	 *
	 * @var DOMDocument
	 */
	protected $document;

	/**
	 * The DOMXPath instance.
	 *
	 * @var DOMXPath
	 */
	protected $xpath;

	/**
	 * The DOMNode for the block wrapper element.
	 *
	 * @var DOMNode || []
	 */
	private $block_wrapper;

	/**
	 * The block attributes array detected.
	 *
	 * @var array
	 */
	protected $block_attributes;

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->document = new DOMDocument( '1.0', 'UTF-8' );
	}

	/**
	 * Migrate the parsed block into a "dynamic block" or "server rendered" block.
	 *
	 * @param array  $parsed_block_attributes the JSON attributes parsed from the block.
	 * @param string $parsed_block_html the HTML parsed from the block.
	 *
	 * @return array new block attributes.
	 */
	public function migrate( $parsed_block_attributes, $parsed_block_html ) {
		$this->block_wrapper    = null;
		$this->block_attributes = empty( $parsed_block_attributes ) ? array() : $parsed_block_attributes;

		if ( ! empty( $parsed_block_html ) ) {
			// libxml can't parse HTML5 elements still so disable warnings for it.
			libxml_use_internal_errors( true );

			$html = iconv( 'UTF-8', 'UTF-8//IGNORE', $parsed_block_html );
			$this->document->loadHTML( '<?xml encoding="UTF-8">' . $html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD );
			$this->xpath = new DOMXPath( $this->document );

			libxml_clear_errors();
		}

		return array_filter( $this->migrate_attributes() );
	}

	/**
	 * Returns the name of the block.
	 *
	 * @return string the block name.
	 */
	abstract public static function block_name();

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @return array the new block attributes.
	 */
	abstract protected function migrate_attributes();

	/**
	 * Returns the DOMNode for the block wrapper element.
	 *
	 * @return DOMNode|array The block wrapper DOMNode or an empty array.
	 */
	protected function block_wrapper() {
		// If we already have it just return it.
		if ( ! empty( $this->block_wrapper ) ) {
			return $this->block_wrapper;
		}

		$block_wrapper_classname = 'wp-block-' . str_replace( '/', '-', $this->block_name() );
		$this->block_wrapper     = $this->query_selector( '//*[contains(@class,"' . $block_wrapper_classname . '")]' );
		return empty( $this->block_wrapper ) ? array() : $this->block_wrapper;
	}

	/**
	 * Find the attribute value from the prefixed classname.
	 *
	 * @param string     $classname_prefix prefix to search for value.
	 * @param DOMElement $element the DOMElement to search.
	 *
	 * @return string attribute value.
	 */
	protected function get_attribute_from_classname( $classname_prefix, $element ) {
		if ( is_null( $element ) ) {
			return '';
		}

		$class_attribute = $element->attributes->getNamedItem( 'class' );
		if ( empty( $class_attribute ) ) {
			return '';
		}

		$filter_classname = array_filter(
			explode( ' ', $class_attribute->value ),
			function( $class ) use ( $classname_prefix ) {
				return false !== strpos( $class, $classname_prefix );
			}
		);
		if ( empty( $filter_classname ) ) {
			return null;
		}

		// If the classname_prefix is the entire classname, a boolean true value is expected.
		$value = str_replace( $classname_prefix, '', array_pop( $filter_classname ) );
		return empty( $value ) ? true : $value;
	}

	/**
	 * Get a value from the attribute of an DOMElement.
	 *
	 * @param DOMElement|null $element element to search for attribute.
	 * @param string          $attribute attribute name to find.
	 *
	 * @return string|null retrieved value.
	 */
	protected function get_element_attribute( $element, $attribute ) {
		if ( null === $element ) {
			return null;
		}

		if ( 'textContent' === $attribute ) {
			return $element->textContent; // @phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
		}

		if ( 'innerHTML' === $attribute ) {
			if ( ! property_exists( $element, 'childNodes' ) ) {
				return '';
			}

			// Get child nodes to iterate.
			$elem_child_nodes = $element->childNodes; // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
			$inner_html       = '';
			foreach ( $elem_child_nodes as $child ) {
				// phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
				$inner_html .= $child->ownerDocument->saveHTML( $child );
			}
			return $inner_html;
		}

		$attr = $element->attributes->getNamedItem( $attribute );
		return empty( $attr ) ? null : $attr->nodeValue; // @phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
	}

	/**
	 * Get a new attribute array from the provided mapping.
	 *
	 * @param DOMElement|null $element element to search for attributes.
	 * @param array           $attribute_mapping define which element attributes to map.
	 *
	 * @return array the new values mapped to their attribute.
	 */
	protected function get_element_attributes( $element, array $attribute_mapping ) {
		return array_filter(
			array_map(
				function( $attribute ) use ( $element ) {
					return $this->get_element_attribute( $element, $attribute );
				},
				$attribute_mapping
			)
		);
	}

	/**
	 * Evaluates the given XPath expression and returns the full DOMNodeList.
	 *
	 * @param string  $expression The XPath expression to execute.
	 * @param DOMNode $context_node The optional context_node can be specified for doing relative XPath queries.
	 *
	 * @return DOMNodeList|false all nodes matching the given XPath expression.
	 */
	protected function query_selector_all( $expression, DOMNode $context_node = null ) {
		return empty( $this->xpath ) ? new DOMNodeList() : $this->xpath->query( $expression, $context_node );
	}

	/**
	 * Evaluates the given XPath expression and returns the node at the first position in the DOMNodeList.
	 *
	 * @param string  $expression The XPath expression to execute.
	 * @param DOMNode $context_node The optional context_node can be specified for doing relative XPath queries.
	 *
	 * @return DOMNode|null The node at the first position in the DOMNodeList, or null if that is not a valid index.
	 */
	protected function query_selector( $expression, DOMNode $context_node = null ) {
		return $this->query_selector_all( $expression, $context_node )->item( 0 );
	}

	/**
	 * Append class strings with a space separation.
	 *
	 * @param  string $class_to_add Class to add.
	 * @param  array  $attributes       Block attributes.
	 *
	 * @return array New combined classes.
	 */
	protected function add_to_class( $class_to_add, $attributes ) {
		if ( array_key_exists( 'className', $attributes ) ) {
			$existing_class         = $attributes['className'];
			return $existing_class .= " {$class_to_add}";
		} else {
			return $class_to_add;
		}
	}
}

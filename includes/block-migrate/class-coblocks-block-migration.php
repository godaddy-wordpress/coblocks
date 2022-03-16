<?php

abstract class CoBlocks_Block_Migration {
	protected $document;
	protected $xpath;

	public function __construct() {
		$this->document = new DOMDocument();
	}

	public function migrate( string $parsed_block_html ) {
		// libxml can't parse HTML5 elements still so disable warnings for it.
		libxml_use_internal_errors( true );

		$this->document->loadHTML( $parsed_block_html );
		$this->xpath = new DOMXPath( $this->document );

		libxml_clear_errors();

		return array_filter( $this->migrate_attributes() );
	}

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @return array the new block attributes.
	 */
	abstract protected function migrate_attributes();

	/**
	 * Find the attribute value from the prefixed classname.
	 *
	 * @param string $classname_prefix prefix to search for value.
	 * @param DOMElement $element the DOMElement to search
	 *
	 * @return string attribute value.
	 */
	protected function get_attribute_from_classname( string $classname_prefix, DOMElement $element ) {
		$class_attribute = $element->attributes->getNamedItem( 'class' );
		if ( empty( $class_attribute ) ) return '';

		$filter_classname = array_filter(
			explode( ' ', $class_attribute->value ),
			function( $class ) use ( $classname_prefix ) {
				return false !== strpos( $class, $classname_prefix );
			}
		);
		if ( empty( $filter_classname ) ) return null;

		// If the classname_prefix is the entire classname, a boolean value is expected.
		$value = str_replace( $classname_prefix, '', array_pop( $filter_classname ) );
		return empty( $value ) ?? $value;
	}

	/**
	 * Get a value from the attribute of an DOMElement.
	 *
	 * @param DOMElement|null $element elemtn to search for attribute.
	 * @param string $attribute attribute name to find.
	 *
	 * @return string|null retrieved value.
	 */
	protected function get_value_from_element_attribute( $element, $attribute ) {
		if ( null === $element ) return null;

		if ( 'textContent' === $attribute ) {
			return $element->textContent;
		}

		$attr = $element->attributes->getNamedItem( $attribute );
		return empty( $attr ) ? null : $attr->nodeValue;
	}

	/**
	 * Evaluates the given XPath expression and returns the full DOMNodeList.
	 *
	 * @param string $expression The XPath expression to execute.
	 * @param DOMNode $context_node The optional context_node can be specified for doing relative XPath queries.
	 *
	 * @return DOMNodeList|false all nodes matching the given XPath expression.
	 */
	protected function query_selector_all( string $expression, DOMNode $context_node = null ) {
		return $this->xpath->query( $expression, $context_node );
	}

	/**
	 * Evaluates the given XPath expression and returns the node at the first position in the DOMNodeList.
	 *
	 * @param string $expression The XPath expression to execute.
	 * @param DOMNode $context_node The optional context_node can be specified for doing relative XPath queries.
	 *
	 * @return DOMNode|null The node at the first position in the DOMNodeList, or null if that is not a valid index.
	 */
	protected function query_selector( string $expression, DOMNode $context_node = null ) {
		return $this->query_selector_all( $expression, $context_node )->item(0);
	}
}

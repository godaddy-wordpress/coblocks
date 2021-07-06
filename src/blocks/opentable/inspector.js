/**
 * External dependencies.
 */

/**
 * Internal dependencies
 */

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

const Inspector = ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;

	return (
		<InspectorControls>
		</InspectorControls>
	);
};

export default Inspector;

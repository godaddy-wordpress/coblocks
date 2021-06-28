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
			<PanelBody title={ __( 'OpenTable settings', 'coblocks' ) }>
				<TextControl
					label={ __( 'Restaurant ID', 'coblocks' ) }
					className="components-text-control--opentable-restaurant-id"
					value={ attributes.restaurantID }
					onChange={ ( rID ) => {
						setAttributes( { restaurantID: rID } );
					} }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;

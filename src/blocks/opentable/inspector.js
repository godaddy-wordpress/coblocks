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
import { SelectControl, PanelBody, Notice } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

const Inspector = ( props ) => {
	const {
		attributes,
		setAttributes,
		className,
	} = props;

	return (
		<InspectorControls>
			{ ( className.substring( className.lastIndexOf( '-' ) + 1 ) === 'button' ) && ( attributes.restaurantIDs.length > 1 ) &&
			<Notice
				isDismissible={ false }
				status="warning">
				{ __( 'The button style does not support multiple restaurants. Clicking the button navigates to the first provided Restaurant.', 'coblocks' ) }
			</Notice>
			}
			{ /* language selector */ }
			<PanelBody title={ __( 'OpenTable settings', 'coblocks' ) } className="block-coblocks__inspector-block-settings-panel-body">
				<SelectControl
					label={ __( 'Language', 'coblocks' ) }
					value={ attributes.language }
					onChange={ ( language ) => {
						setAttributes( { language } );
					} }
					options={ [
						{ value: '', label: __( 'Select language', 'coblocks' ), disabled: true },
						{ value: 'en-US', label: 'English-US' },
						{ value: 'fr-CA', label: 'Français-CA' },
						{ value: 'de-DE', label: 'Deutsch-DE' },
						{ value: 'es-MX', label: 'Español-MX' },
						{ value: 'ja-JP', label: '日本語-JP' },
						{ value: 'nl-NL', label: 'Nederlands-NL' },
						{ value: 'it-IT', label: 'Italiano-IT' },
					] } >
				</SelectControl>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;

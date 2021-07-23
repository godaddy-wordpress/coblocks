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
import { SelectControl, PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

const Inspector = ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;

	return (
		<InspectorControls>
			{ /* language selector */ }
			<PanelBody title={ __( 'OpenTable settings', 'coblocks' ) } className="block-coblocks__inspector-block-settings-panel-body">
				<SelectControl
					label={ __( 'Language', 'coblocks' ) }
					value={ attributes.language }
					onChange={ ( language ) => {
						setAttributes( { language } );
					} }
					options={ [
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

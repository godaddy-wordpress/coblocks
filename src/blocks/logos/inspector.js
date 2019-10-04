/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

const Inspector = props => {
	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Logos Settings' ) }
			>
				<ToggleControl
					label={ __( 'Black & White' ) }
					help={ __( 'Toggle to add a black and white filter.' ) }
					checked={ props.attributes.grayscale }
					onChange={ () => props.setAttributes( { grayscale: ! props.attributes.grayscale } ) }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;

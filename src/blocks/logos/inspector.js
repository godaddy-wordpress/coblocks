/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

const Inspector = ( props ) => {
	const {
		setAttributes,
		attributes,
	} = props;

	const {
		grayscale,
	} = attributes;

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Logos Settings', 'coblocks' ) }
			>
				<ToggleControl
					label={ __( 'Black & White', 'coblocks' ) }
					help={ __( 'Toggle to add a black and white filter.', 'coblocks' ) }
					checked={ grayscale }
					onChange={ () => setAttributes( { grayscale: ! grayscale } ) }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;

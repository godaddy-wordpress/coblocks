/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl } = wp.components;

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

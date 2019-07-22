/**
 * WordPress dependencies.
 */
 const { __ } = wp.i18n;
 const { InspectorControls } = wp.blockEditor;
 const { PanelBody, ToggleControl } = wp.components;

const Controls = props => {
	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Logos Settings' ) }
				className="components-coblocks-block-settings-sidebar"
			>
				<ToggleControl
					label={ __( 'Black & White' ) }
					help={ __( 'Toggle to add a black and white filter.' ) }
					checked={ props.attributes.blackAndWhite }
					onChange={ () => setAttributes( { blackAndWhite: ! props.attributes.blackAndWhite } ) }
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default Controls;

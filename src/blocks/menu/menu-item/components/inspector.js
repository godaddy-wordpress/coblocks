/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { PanelBody, ToggleControl } = wp.components;
const { InspectorControls } = wp.blockEditor;

const Inspector = props => {
	const { attributes, setAttributes } = props;
	return (
		<InspectorControls>
			<PanelBody title={ __( 'Menu Item Settings' ) } initialOpen={ true }>
				<ToggleControl
					label={ __( 'Image' ) }
					help={
						attributes.showImage ?
							__( 'Showing image for this item.' ) :
							__( 'Toggle to show image for this item.' )
					}
					checked={ attributes.showImage }
					onChange={ () => setAttributes( { showImage: ! attributes.showImage } ) }
				/>
				<ToggleControl
					label={ __( 'Price' ) }
					help={
						attributes.showPrice ?
							__( 'Showing the price for this item.' ) :
							__( 'Toggle to show the price for this item.' )
					}
					checked={ attributes.showPrice }
					onChange={ () => setAttributes( { showPrice: ! attributes.showPrice } ) }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;

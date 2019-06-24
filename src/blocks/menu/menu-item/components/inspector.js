/**
 * Internal dependencies.
 */
import icons from '../../components/icons';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { PanelBody, ToggleControl, CheckboxControl } = wp.components;
const { InspectorControls, BlockIcon } = wp.blockEditor;

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
				<div className='components-menu-item-attributes'>
				<p className='components-menu-item-attributes__label'>{ __( 'Attributes' ) }</p>
				<p className='components-base-control__help'>{ __( 'Duis mollis, est non commodo luctus.' ) }</p>
					<CheckboxControl
						label={ __( 'Spicy' ) }
						checked={ attributes.spicy }
						onChange={ () => setAttributes( { spicy: ! attributes.spicy } ) }
					/>
					<CheckboxControl
						label={ __( 'Vegetarian' ) }
						checked={ attributes.vegetarian }
						onChange={ () => setAttributes( { vegetarian: ! attributes.vegetarian } ) }
					/>
					<CheckboxControl
						label={ __( 'Gluten Free' ) }
						checked={ attributes.glutenFree }
						onChange={ () => setAttributes( { glutenFree: ! attributes.glutenFree } ) }
					/>
				</div>


			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;

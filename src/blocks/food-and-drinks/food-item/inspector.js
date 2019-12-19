/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { PanelBody, ToggleControl, CheckboxControl, FocalPointPicker, ExternalLink, TextareaControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

const Inspector = props => {
	const {
		attributes,
		setAttributes,
		setSpicyTo,
		setHotTo,
	} = props;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Item Settings', 'coblocks' ) } initialOpen={ true }>
				<ToggleControl
					label={ __( 'Image', 'coblocks' ) }
					help={
						attributes.showImage ?
							__( 'Showing an image for this item.', 'coblocks' ) :
							__( 'Toggle to show an image for this item.', 'coblocks' )
					}
					checked={ attributes.showImage }
					onChange={ () => setAttributes( { showImage: ! attributes.showImage } ) }
				/>
				<ToggleControl
					label={ __( 'Price', 'coblocks' ) }
					help={
						attributes.showPrice ?
							__( 'Showing the price for this item.', 'coblocks' ) :
							__( 'Toggle to show the price for this item.', 'coblocks' )
					}
					checked={ attributes.showPrice }
					onChange={ () => setAttributes( { showPrice: ! attributes.showPrice } ) }
				/>
				<div className="components-food-item-attributes">
					<p className="components-food-item-attributes__label">
						{ __( 'Item Attributes', 'coblocks' ) }
					</p>
					<CheckboxControl
						label={ __( 'Popular', 'coblocks' ) }
						checked={ attributes.popular }
						onChange={ () => setAttributes( { popular: ! attributes.popular } ) }
					/>
					<CheckboxControl
						label={ __( 'Gluten Free', 'coblocks' ) }
						checked={ attributes.glutenFree }
						onChange={ () => setAttributes( { glutenFree: ! attributes.glutenFree } ) }
					/>
					<CheckboxControl
						label={ __( 'Pescatarian', 'coblocks' ) }
						checked={ attributes.pescatarian }
						onChange={ () => setAttributes( { pescatarian: ! attributes.pescatarian } ) }
					/>
					<CheckboxControl
						label={ __( 'Spicy', 'coblocks' ) }
						checked={ attributes.spicy }
						onChange={ setSpicyTo }
					/>
					<CheckboxControl
						label={ __( 'Spicier', 'coblocks' ) }
						checked={ attributes.spicier }
						onChange={ setHotTo }
					/>
					<CheckboxControl
						label={ __( 'Vegan', 'coblocks' ) }
						checked={ attributes.vegan }
						onChange={ () => setAttributes( { vegan: ! attributes.vegan } ) }
					/>
					<CheckboxControl
						label={ __( 'Vegetarian', 'coblocks' ) }
						checked={ attributes.vegetarian }
						onChange={ () => setAttributes( { vegetarian: ! attributes.vegetarian } ) }
					/>
				</div>
			</PanelBody>
			{ attributes.url &&
				<PanelBody title={ __( 'Image Settings', 'coblocks' ) } initialOpen={ false }>
					<TextareaControl
						label={ __( 'Alt Text (Alternative Text)', 'coblocks' ) }
						value={ attributes.alt }
						onChange={ ( value ) => setAttributes( { alt: value } ) }
						help={
							<Fragment>
								<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
									{ __( 'Describe the purpose of the image', 'coblocks' ) }
								</ExternalLink>
								{ __( 'Leave empty if the image is purely decorative.', 'coblocks' ) }
							</Fragment>
						}
					/>
					<FocalPointPicker
						label={ __( 'Focal Point', 'coblocks' ) }
						url={ attributes.url }
						value={ attributes.focalPoint }
						onChange={ ( value ) => setAttributes( { focalPoint: value } ) }
					/>
				</PanelBody>
			}
		</InspectorControls>
	);
};

export default Inspector;

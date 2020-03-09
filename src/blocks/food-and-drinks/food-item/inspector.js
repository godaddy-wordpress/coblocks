/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { PanelBody, ToggleControl, CheckboxControl, FocalPointPicker, ExternalLink, TextareaControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

const Inspector = ( props ) => {
	const {
		attributes,
		setAttributes,
		setSpicyTo,
		setHotTo,
	} = props;

	const {
		alt,
		focalPoint,
		glutenFree,
		pescatarian,
		popular,
		showImage,
		showPrice,
		spicier,
		spicy,
		url,
		vegan,
		vegetarian,
	} = attributes;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Item settings', 'coblocks' ) } initialOpen={ true }>
				<ToggleControl
					label={ __( 'Image', 'coblocks' ) }
					help={
						showImage ?
							__( 'Showing an image for this item.', 'coblocks' ) :
							__( 'Toggle to show an image for this item.', 'coblocks' )
					}
					checked={ showImage }
					onChange={ () => setAttributes( { showImage: ! showImage } ) }
				/>
				<ToggleControl
					label={ __( 'Price', 'coblocks' ) }
					help={
						showPrice ?
							__( 'Showing the price for this item.', 'coblocks' ) :
							__( 'Toggle to show the price for this item.', 'coblocks' )
					}
					checked={ showPrice }
					onChange={ () => setAttributes( { showPrice: ! showPrice } ) }
				/>
				<div className="components-food-item-attributes">
					<p className="components-food-item-attributes__label">
						{ __( 'Item attributes', 'coblocks' ) }
					</p>
					<CheckboxControl
						label={ __( 'Popular', 'coblocks' ) }
						checked={ popular }
						onChange={ () => setAttributes( { popular: ! popular } ) }
					/>
					<CheckboxControl
						label={ __( 'Gluten Free', 'coblocks' ) }
						checked={ glutenFree }
						onChange={ () => setAttributes( { glutenFree: ! glutenFree } ) }
					/>
					<CheckboxControl
						label={ __( 'Pescatarian', 'coblocks' ) }
						checked={ pescatarian }
						onChange={ () => setAttributes( { pescatarian: ! pescatarian } ) }
					/>
					<CheckboxControl
						label={ __( 'Spicy', 'coblocks' ) }
						checked={ spicy }
						onChange={ setSpicyTo }
					/>
					<CheckboxControl
						label={ __( 'Spicier', 'coblocks' ) }
						checked={ spicier }
						onChange={ setHotTo }
					/>
					<CheckboxControl
						label={ __( 'Vegan', 'coblocks' ) }
						checked={ vegan }
						onChange={ () => setAttributes( { vegan: ! vegan } ) }
					/>
					<CheckboxControl
						label={ __( 'Vegetarian', 'coblocks' ) }
						checked={ vegetarian }
						onChange={ () => setAttributes( { vegetarian: ! vegetarian } ) }
					/>
				</div>
			</PanelBody>
			{ url &&
				<PanelBody title={ __( 'Image settings', 'coblocks' ) } initialOpen={ false }>
					<TextareaControl
						label={ __( 'Alt text (alternative text)', 'coblocks' ) }
						value={ alt }
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
						label={ __( 'Focal point', 'coblocks' ) }
						url={ url }
						value={ focalPoint }
						onChange={ ( value ) => setAttributes( { focalPoint: value } ) }
					/>
				</PanelBody>
			}
		</InspectorControls>
	);
};

export default Inspector;

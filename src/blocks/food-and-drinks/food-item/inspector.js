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
		price,
	} = attributes;

	const showImageOnChange = () => {
		if ( ! showImage ) {
			setAttributes( {
				showImage: true,
				url: JSON.parse( localStorage.getItem( 'urlAttribute' ) ) || url,
			} );
		} else {
			localStorage.setItem( 'urlAttribute', JSON.stringify( url ) );
			setAttributes( {
				showImage: false,
				url: '',
			} );
		}
	};

	const showPriceOnChange = () => {
		if ( ! showPrice ) {
			setAttributes( {
				showPrice: true,
				price: JSON.parse( localStorage.getItem( 'priceAttribute' ) ) || price,
			} );
		} else {
			localStorage.setItem( 'priceAttribute', JSON.stringify( price ) );
			setAttributes( {
				showPrice: false,
				price: '',
			} );
		}
	};

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Item Settings', 'coblocks' ) } initialOpen={ true }>
				<ToggleControl
					label={ __( 'Image', 'coblocks' ) }
					help={
						showImage ?
							__( 'Showing an image for this item.', 'coblocks' ) :
							__( 'Toggle to show an image for this item.', 'coblocks' )
					}
					checked={ showImage }
					onChange={ () => showImageOnChange() }
				/>
				<ToggleControl
					label={ __( 'Price', 'coblocks' ) }
					help={
						showPrice ?
							__( 'Showing the price for this item.', 'coblocks' ) :
							__( 'Toggle to show the price for this item.', 'coblocks' )
					}
					checked={ showPrice }
					onChange={ () => showPriceOnChange() }
				/>
				<div className="components-food-item-attributes">
					<p className="components-food-item-attributes__label">
						{ __( 'Item Attributes', 'coblocks' ) }
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
				<PanelBody title={ __( 'Image Settings', 'coblocks' ) } initialOpen={ false }>
					<TextareaControl
						label={ __( 'Alt Text (Alternative Text)', 'coblocks' ) }
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
						label={ __( 'Focal Point', 'coblocks' ) }
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

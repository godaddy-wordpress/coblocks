/**
 * Internal dependencies.
 */
import { hasEmptyAttributes } from '../../../utils/block-helpers';
import InspectorControls from './inspector';
import fromEntries from '../../../js/coblocks-fromEntries';
import icons from './icons';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { IconButton, DropZone, Spinner } from '@wordpress/components';
import { dispatch, select } from '@wordpress/data';
import { RichText, MediaPlaceholder } from '@wordpress/block-editor';
import { mediaUpload } from '@wordpress/editor';
import { isBlobURL } from '@wordpress/blob';

/**
 * Handle creation and removal of placeholder elements so that we always have one available to use.
 *
 * @param {Integer} childClientId The child block's ClientId.
 * @param {String} blockName The block to insert.
 * @param {Object} blockAttributes The attributes for the placeholder block.
 */
const handlePlaceholderPlacement = (
	childClientId,
	blockName,
	blockAttributes = {}
) => {
	const itemClientId = select( 'core/block-editor' ).getBlockRootClientId(
		childClientId
	);

	const foodItems = select( 'core/block-editor' ).getBlocksByClientId(
		itemClientId
	)[ 0 ].innerBlocks;

	const filledFoodItems = foodItems.filter(
		item => item.name === 'coblocks/food-item' && ! isEmpty( item.attributes ) );

	const placeholders = foodItems.filter(
		item => item.name === blockName && isEmpty( item.attributes )
	);

	// Remove trailing placholders if there are more than two.
	dispatch( 'core/block-editor' ).removeBlocks(
		placeholders
			.filter( ( item, index ) => item.clientId !== childClientId && index !== 0 && filledFoodItems.length >= 1 )
			.map( item => item.clientId ),
		false
	);

	// Add a placeholder if there are none.
	if ( placeholders.length === 0 ) {
		const newFoodItem = wp.blocks.createBlock( blockName, blockAttributes );
		dispatch( 'core/block-editor' ).insertBlocks(
			newFoodItem,
			foodItems.length,
			itemClientId,
			false
		);
	}
};

const isEmpty = attributes => {
	const attributesToCheck = [ 'url', 'title', 'description', 'price' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	if ( typeof Object.fromEntries === 'undefined' ) {
		return hasEmptyAttributes( fromEntries( newAttributes ) );
	}

	return hasEmptyAttributes( Object.fromEntries( newAttributes ) );
};

class FoodAndDrinksEdit extends Component {
	constructor() {
		super( ...arguments );

		this.replaceImage = this.replaceImage.bind( this );
		this.setSpicyTo = this.setSpicyTo.bind( this );
		this.setHotTo = this.setHotTo.bind( this );
	}

	componentDidUpdate( prevProps ) {
		if (
			isEmpty( prevProps.attributes ) !== isEmpty( this.props.attributes ) ||
			( ! prevProps.isSelected && this.props.isSelected )
		) {
			const { showImage, showPrice } = this.props.attributes;
			handlePlaceholderPlacement( this.props.clientId, 'coblocks/food-item', {
				showImage,
				showPrice,
			} );
		}
	}

	replaceImage( files ) {
		mediaUpload( {
			allowedTypes: [ 'image' ],
			filesList: files,
			onFileChange: ( [ media ] ) =>
				this.props.setAttributes( { url: media.url, alt: media.alt } ),
		} );
	}

	setSpicyTo() {
		const { attributes, setAttributes } = this.props;

		if ( !! attributes.spicier ) {
			setAttributes( { spicier: ! attributes.spicier } );
		}

		setAttributes( { spicy: ! attributes.spicy } );
	}

	setHotTo() {
		const { attributes, setAttributes } = this.props;

		if ( ! attributes.spicy ) {
			setAttributes( { spicy: ! attributes.spicier } );
		}

		setAttributes( { spicier: ! attributes.spicier } );
	}

	renderImage() {
		const { attributes, setAttributes, isSelected } = this.props;

		const classes = classnames( 'wp-block-coblocks-food-item__figure', {
			'is-transient': isBlobURL( attributes.url ),
			'is-selected': isSelected,
		} );

		const dropZone = (
			<DropZone
				onFilesDrop={ this.replaceImage }
				label={ __( 'Drop image to replace', 'coblocks' ) }
			/>
		);

		return (
			<Fragment>
				<figure className={ classes }>
					{ isSelected && (
						<div className="wp-block-coblocks-food-item__remove-menu">
							<IconButton
								icon="no-alt"
								onClick={ () => setAttributes( { url: '' } ) }
								className="coblocks-gallery-item__button"
								label={ __( 'Remove Image', 'coblocks' ) }
								disabled={ ! isSelected }
							/>
						</div>
					) }
					{ dropZone }
					{ isBlobURL( attributes.url ) && <Spinner /> }
					<img
						src={ attributes.url }
						alt={ attributes.alt }
						style={ {
							objectPosition: attributes.focalPoint ?
								`${ attributes.focalPoint.x * 100 }% ${ attributes.focalPoint.y *
										100 }%` :
								undefined,
						} }
					/>
				</figure>
			</Fragment>
		);
	}

	renderPlaceholder() {
		const { setAttributes } = this.props;
		return (
			<MediaPlaceholder
				allowedTypes={ [ 'image' ] }
				multiple={ false }
				icon="format-image"
				labels={ {
					title: ' ',
				} }
				onSelect={ el => setAttributes( { url: el.url, alt: el.alt } ) }
			/>
		);
	}

	render() {
		const { className, attributes, setAttributes, isSelected } = this.props;

		const richTextAttributes = {
			keepPlaceholderOnFocus: true,
			formattingControls: [ 'bold', 'italic' ],
		};

		return (
			<Fragment>
				<InspectorControls
					{ ...this.props }
					setSpicyTo={ this.setSpicyTo }
					setHotTo={ this.setHotTo }
				/>
				<div
					className={ classnames( className, {
						'is-empty': isEmpty( attributes ),
					} ) }
				>
					{ !! attributes.showImage &&
						( attributes.url ? this.renderImage() : this.renderPlaceholder() ) }
					<div className="wp-block-coblocks-food-item__content">
						<div className="wp-block-coblocks-food-item__heading-wrapper">
							<RichText
								value={ attributes.title }
								tagName="h4"
								wrapperClassName="wp-block-coblocks-food-item__heading"
								placeholder={ __( 'Add title…', 'coblocks' ) }
								onChange={ title => setAttributes( { title } ) }
								{ ...richTextAttributes }
							/>
							<div className="wp-block-coblocks-food-item__attributes">
								{ ( ( isSelected && attributes.title ) || ( !! attributes.popular ) ) && (
									<IconButton
										icon={ icons.popular }
										label={ __( 'Popular', 'coblocks' ) }
										className={ classnames( 'wp-block-coblocks-food-item__attribute', 'wp-block-coblocks-food-item__attribute--popular', {
											'is-toggled': attributes.popular,
										} ) }
										onClick={ () =>
											setAttributes( { popular: ! attributes.popular } )
										}
									/>
								) }
								{ ( ( isSelected && attributes.title ) || ( !! attributes.spicy ) ) && (
									<IconButton
										icon={ icons.spicy }
										label={ __( 'Spicy', 'coblocks' ) }
										className={ classnames( 'wp-block-coblocks-food-item__attribute', 'wp-block-coblocks-food-item__attribute--spicy', {
											'is-toggled': attributes.spicy,
										} ) }
										onClick={ this.setSpicyTo }
										isToggled={ attributes.spicy }
									/>
								) }
								{ ( ( isSelected && attributes.title && !! attributes.spicy ) || ( !! attributes.spicier ) ) && (
									<IconButton
										icon={ icons.spicy }
										label={ __( 'Hot', 'coblocks' ) }
										className={ classnames( 'wp-block-coblocks-food-item__attribute', 'wp-block-coblocks-food-item__attribute--spicier', {
											'is-toggled': attributes.spicier,
										} ) }
										onClick={ () =>
											setAttributes( { spicier: ! attributes.spicier } )
										}
										isToggled={ attributes.spicier }
									/>
								) }
								{ ( ( isSelected && attributes.title ) || ( !! attributes.vegetarian ) ) && (
									<IconButton
										icon={ icons.vegetarian }
										className={ classnames( 'wp-block-coblocks-food-item__attribute', 'wp-block-coblocks-food-item__attribute--vegetarian', {
											'is-toggled': attributes.vegetarian,
										} ) }
										label={ __( 'Vegetarian', 'coblocks' ) }
										onClick={ () =>
											setAttributes( {
												vegetarian: ! attributes.vegetarian,
											} )
										}
										isToggled={ attributes.vegetarian }
									/>
								) }
								{ ( ( isSelected && !! attributes.glutenFree ) || ( !! attributes.glutenFree ) ) && (
									// Only renders if the option is checked within the Settings sidebar.
									<IconButton
										icon={ icons.glutenFree }
										className={ classnames( 'wp-block-coblocks-food-item__attribute', 'wp-block-coblocks-food-item__attribute--glutenFree', {
											'is-toggled': attributes.glutenFree,
										} ) }
										onClick={ () =>
											setAttributes( {
												glutenFree: ! attributes.glutenFree,
											} ) }
										label={ __( 'Gluten Free', 'coblocks' ) }
										isToggled={ attributes.glutenFree }
									/>
								) }
								{ ( ( isSelected && !! attributes.pescatarian ) || ( !! attributes.pescatarian ) ) && (
									// Only renders if the option is checked within the Settings sidebar.
									<IconButton
										icon={ icons.pescatarian }
										label={ __( 'Pescatarian', 'coblocks' ) }
										className={ classnames( 'wp-block-coblocks-food-item__attribute', 'wp-block-coblocks-food-item__attribute--pescatarian', {
											'is-toggled': attributes.pescatarian,
										} ) }
										onClick={ () =>
											setAttributes( {
												pescatarian: ! attributes.pescatarian,
											} )
										}
										isToggled={ attributes.pescatarian }
									/>
								) }
								{ ( ( isSelected && !! attributes.vegan ) || ( !! attributes.vegan ) ) && (
									// Only renders if the option is checked within the Settings sidebar.
									<IconButton
										icon={ icons.vegan }
										className={ classnames( 'wp-block-coblocks-food-item__attribute', 'wp-block-coblocks-food-item__attribute--vegan', {
											'is-toggled': attributes.vegan,
										} ) }
										onClick={ () =>
											setAttributes( { vegan: ! attributes.vegan } )
										}
										isToggled={ attributes.vegan }
									/>
								) }
							</div>
						</div>
						<RichText
							value={ attributes.description }
							tagName="p"
							wrapperClassName="wp-block-coblocks-food-item__description"
							placeholder={ __( 'Add description…', 'coblocks' ) }
							onChange={ description => setAttributes( { description } ) }
							{ ...richTextAttributes }
						/>
						{ !! attributes.showPrice && ( attributes.price || isSelected ) && (
							<RichText
								value={ attributes.price }
								tagName="p"
								wrapperClassName="wp-block-coblocks-food-item__price"
								placeholder={ __( '$0.00', 'coblocks' ) }
								onChange={ price => setAttributes( { price } ) }
								{ ...richTextAttributes }
							/>
						) }
					</div>
				</div>
			</Fragment>
		);
	}
}

export default FoodAndDrinksEdit;

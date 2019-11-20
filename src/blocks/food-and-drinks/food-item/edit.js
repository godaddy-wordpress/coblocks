/**
 * Internal dependencies.
 */
import { hasEmptyAttributes } from '../../../utils/block-helpers';
import InspectorControls from './inspector';
import icons from './icons';
import fromEntries from '../../../js/coblocks-fromEntries';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { IconButton, DropZone, Spinner, Icon } from '@wordpress/components';
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

	if ( ! Object.fromEntries ) {
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
								{ isSelected && attributes.title ? (
									<span>
										<IconButton
											icon={ icons.popular }
											className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--popular"
											onClick={ () =>
												setAttributes( { popular: ! attributes.popular } )
											}
											label={ __( 'Popular', 'coblocks' ) }
											isToggled={ attributes.popular }
										/>
									</span>
								) : (
									!! attributes.popular && (
										<Icon
											icon={ icons.popular }
											className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--popular"
										/>
									)
								) }
								{ isSelected && attributes.title ? (
									<span>
										<IconButton
											icon={ icons.spicy }
											className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--spicy"
											onClick={ this.setSpicyTo }
											label={ __( 'Spicy', 'coblocks' ) }
											isToggled={ attributes.spicy }
										/>
									</span>
								) : (
									!! attributes.spicy && (
										<Icon
											icon={ icons.spicy }
											className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--spicy"
										/>
									)
								) }
								{ isSelected && attributes.title && !! attributes.spicy ? (
									<span>
										<IconButton
											icon={ icons.spicy }
											className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--spicier"
											onClick={ () =>
												setAttributes( { spicier: ! attributes.spicier } )
											}
											label={ __( 'Hot', 'coblocks' ) }
											isToggled={ attributes.spicier }
										/>
									</span>
								) : (
									!! attributes.spicier && (
										<Icon
											icon={ icons.spicy }
											className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--spicier"
										/>
									)
								) }
								{ isSelected && attributes.title ? (
									<span>
										<IconButton
											icon={ icons.vegetarian }
											className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--vegetarian"
											onClick={ () =>
												setAttributes( {
													vegetarian: ! attributes.vegetarian,
												} )
											}
											label={ __( 'Vegetarian', 'coblocks' ) }
											isToggled={ attributes.vegetarian }
										/>
									</span>
								) : (
									!! attributes.vegetarian && (
										<Icon
											icon={ icons.vegetarian }
											className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--vegetarian"
										/>
									)
								) }
								{ isSelected &&
								attributes.title && !! attributes.glutenFree &&
								( ! attributes.pescatarian && ! attributes.vegan ) ? (
									// disable reason: 10 tabs seems to be correct indent
									// eslint-disable-next-line react/jsx-indent
										<span>
											<IconButton
												icon={ icons.glutenFree }
												className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--gf"
												onClick={ () =>
													setAttributes( {
														glutenFree: ! attributes.glutenFree,
													} )
												}
												label={ __( 'Gluten Free', 'coblocks' ) }
												isToggled={ attributes.glutenFree }
											/>
										</span>
									) : (
										!! attributes.glutenFree && (
											<Icon
												icon={ icons.glutenFree }
												className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--gf"
											/>
										)
									) }
								{ isSelected && !! attributes.pescatarian ? (
									// Only renders if the option is checked within the Settings sidebar.
									<span>
										<IconButton
											icon={ icons.pescatarian }
											className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--pescatarian"
											onClick={ () =>
												setAttributes( {
													pescatarian: ! attributes.pescatarian,
												} )
											}
											label={ __( 'Pescatarian', 'coblocks' ) }
											isToggled={ attributes.pescatarian }
										/>
									</span>
								) : (
									!! attributes.pescatarian && (
										<Icon
											icon={ icons.pescatarian }
											className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--pescatarian"
										/>
									)
								) }
								{ isSelected && !! attributes.vegan ? (
									// Only renders if the option is checked within the Settings sidebar.
									<span>
										<IconButton
											icon={ icons.vegan }
											className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--vegan"
											onClick={ () =>
												setAttributes( { vegan: ! attributes.vegan } )
											}
											label={ __( 'Vegan', 'coblocks' ) }
											isToggled={ attributes.vegan }
										/>
									</span>
								) : (
									!! attributes.vegan && (
										<Icon
											icon={ icons.vegan }
											className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--vegan"
										/>
									)
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

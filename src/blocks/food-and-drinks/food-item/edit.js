/**
 * Internal dependencies.
 */
import { hasEmptyAttributes } from '../../../utils/block-helpers';
import Inspector from './inspector';
import Controls from '../controls';
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
import { useState, useEffect } from '@wordpress/element';
import { Button, DropZone, Spinner, ButtonGroup } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { RichText, MediaPlaceholder } from '@wordpress/block-editor';
import { mediaUpload } from '@wordpress/editor';
import { isBlobURL } from '@wordpress/blob';
import { createBlock } from '@wordpress/blocks';
import { compose, usePrevious } from '@wordpress/compose';
import { closeSmall } from '@wordpress/icons';

const isEmpty = ( attributes ) => {
	const attributesToCheck = [ 'url', 'title', 'description', 'price' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	return hasEmptyAttributes( fromEntries( newAttributes ) );
};

const FoodItem = ( props ) => {
	const {
		getBlockRootClientId,
		getBlocksByClientId,
		removeBlocks,
		insertBlocks,
		setAttributes,
		attributes,
		clientId,
		isSelected,
		className,
	} = props;

	const {
		showPrice,
		showImage,
		description,
		glutenFree,
		pescatarian,
		popular,
		spicier,
		spicy,
		title,
		vegan,
		vegetarian,
		headingLevel,
	} = attributes;

	const [ url, setUrl ] = useState( attributes.url || '' );
	const [ price, setPrice ] = useState( attributes.price || '' );

	const prevShowPrice = usePrevious( showPrice );
	const prevShowImage = usePrevious( showImage );
	const prevSelected = usePrevious( isSelected );

	useEffect( () => {
		// Handle placeholder
		if (
			prevShowImage !== showImage ||
			( ! prevSelected && isSelected )
		) {
			handlePlaceholderPlacement( clientId, 'coblocks/food-item', {
				showImage,
				showPrice,
			} );
		}

		if ( showPrice !== prevShowPrice ) {
			setAttributes( { price: showPrice ? price : '' } );
		}

		if ( showImage !== prevShowPrice ) {
			setAttributes( { url: showImage ? url : '' } );
		}

		if ( !! url && url !== attributes.url ) {
			setAttributes( { url } );
		}
	}, [ prevShowPrice, isSelected, prevSelected, prevShowImage, clientId, showImage, showPrice, price, url, attributes ] );

	/**
	 * Handle creation and removal of placeholder elements so that we always have one available to use.
	 *
	 * @param {number} childClientId   The child block's ClientId.
	 * @param {string} blockName       The block to insert.
	 * @param {Object} blockAttributes The attributes for the placeholder block.
	 */
	const handlePlaceholderPlacement = ( childClientId, blockName, blockAttributes = {} ) => {
		const itemClientId = getBlockRootClientId( childClientId );
		const foodItems = getBlocksByClientId( itemClientId )[ 0 ].innerBlocks;

		const filledFoodItems = foodItems.filter(
			( item ) => item.name === 'coblocks/food-item' && ! isEmpty( item.attributes )
		);
		const placeholders = foodItems.filter(
			( item ) => item.name === blockName && isEmpty( item.attributes )
		);

		// Remove trailing placeholders if there are more than two.
		removeBlocks(
			placeholders
				.filter( ( item, index ) => item.clientId !== childClientId && index !== 0 && filledFoodItems.length >= 1 )
				.map( ( item ) => item.clientId ),
			false
		);

		// Add a placeholder if there are none.
		if ( placeholders.length === 0 ) {
			const newFoodItem = createBlock( blockName, blockAttributes );
			insertBlocks(
				newFoodItem,
				foodItems.length,
				itemClientId,
				false
			);
		}
	};

	const onChangeHeadingLevel = ( newHeadingLevel ) => {
		setAttributes( { headingLevel: newHeadingLevel } );
	};

	const replaceImage = ( files ) => {
		mediaUpload( {
			allowedTypes: [ 'image' ],
			filesList: files,
			onFileChange: ( [ media ] ) => {
				setUrl( media.url );
				setAttributes( { url: media.url, alt: media.alt } );
			},
		} );
	};

	const setSpicyTo = () => {
		if ( !! attributes.spicier ) {
			setAttributes( { spicier: ! attributes.spicier } );
		}

		setAttributes( { spicy: ! attributes.spicy } );
	};

	const setHotTo = () => {
		if ( ! attributes.spicy ) {
			setAttributes( { spicy: ! attributes.spicier } );
		}

		setAttributes( { spicier: ! attributes.spicier } );
	};

	const renderImage = () => {
		const {
			url: attributeUrl,
			alt,
			focalPoint,
		} = attributes;

		const classes = classnames( 'wp-block-coblocks-food-item__figure', {
			'is-transient': isBlobURL( attributeUrl ),
			'is-selected': isSelected,
		} );

		const dropZone = (
			<DropZone
				onFilesDrop={ replaceImage }
				label={ __( 'Drop image to replace', 'coblocks' ) }
			/>
		);

		return (
			<>
				<figure className={ classes }>
					{ isSelected && (
						<ButtonGroup className="block-library-gallery-item__inline-menu is-right is-visible">
							<Button
								icon={ closeSmall }
								onClick={ () => {
									setAttributes( { url: '' } );
									setUrl( '' );
								} }
								className="coblocks-gallery-item__button"
								label={ __( 'Remove image', 'coblocks' ) }
								disabled={ ! isSelected }
							/>
						</ButtonGroup>
					) }
					{ dropZone }
					{ isBlobURL( attributeUrl ) && <Spinner /> }
					<img
						src={ attributeUrl }
						alt={ alt }
						style={ {
							objectPosition: focalPoint
								? `${ focalPoint.x * 100 }% ${ focalPoint.y *
										100 }%`
								: undefined,
						} }
					/>
				</figure>
			</>
		);
	};

	const renderPlaceholder = () => {
		return (
			<div className="wp-block-coblocks-food-item__figure">
				<MediaPlaceholder
					allowedTypes={ [ 'image' ] }
					multiple={ false }
					icon="format-image"
					labels={ {
						title: ' ',
					} }
					onSelect={ ( imageEntity ) => {
						if ( isBlobURL( imageEntity?.url ) ) {
							return;
						}

						setUrl( imageEntity?.url );
						setAttributes( { alt: imageEntity?.alt } );
					}
					}
				/>
			</div>
		);
	};

	const richTextAttributes = {
		allowedFormats: [ 'bold', 'italic' ],
	};

	return (
		<>
			<Controls
				{ ...props }
				onChangeHeadingLevel={ onChangeHeadingLevel }
			/>
			<Inspector
				{ ...props }
				setSpicyTo={ setSpicyTo }
				setHotTo={ setHotTo }
			/>
			<div
				className={ classnames( className, {
					'is-empty': isEmpty( attributes ),
				} ) }
			>
				{ !! showImage &&
					( url ? renderImage() : renderPlaceholder() ) }
				<div className="wp-block-coblocks-food-item__content">
					<div className="wp-block-coblocks-food-item__heading-wrapper">
						<RichText
							value={ title }
							tagName={ `h${ headingLevel }` }
							wrapperClassName="wp-block-coblocks-food-item__heading"
							placeholder={ __( 'Add title…', 'coblocks' ) }
							onChange={ ( newTitle ) => setAttributes( { title: newTitle } ) }
							{ ...richTextAttributes }
						/>
						<div className="wp-block-coblocks-food-item__attributes">
							{ ( ( isSelected && title ) || ( !! popular ) ) && (
								<Button
									icon={ icons.popular }
									label={ __( 'Popular', 'coblocks' ) }
									className={ classnames( 'wp-block-coblocks-food-item__attribute', 'wp-block-coblocks-food-item__attribute--popular', {
										'is-toggled': popular,
									} ) }
									onClick={ () =>
										setAttributes( { popular: ! popular } )
									}
								/>
							) }
							{ ( ( isSelected && title ) || ( !! spicy ) ) && (
								<Button
									icon={ icons.spicy }
									label={ __( 'Spicy', 'coblocks' ) }
									className={ classnames( 'wp-block-coblocks-food-item__attribute', 'wp-block-coblocks-food-item__attribute--spicy', {
										'is-toggled': spicy,
									} ) }
									onClick={ setSpicyTo }
									isToggled={ spicy }
								/>
							) }
							{ ( ( isSelected && title && !! spicy ) || ( !! spicier ) ) && (
								<Button
									icon={ icons.spicy }
									label={ __( 'Hot', 'coblocks' ) }
									className={ classnames( 'wp-block-coblocks-food-item__attribute', 'wp-block-coblocks-food-item__attribute--spicier', {
										'is-toggled': spicier,
									} ) }
									onClick={ () =>
										setAttributes( { spicier: ! spicier } )
									}
									isToggled={ spicier }
								/>
							) }
							{ ( ( isSelected && title ) || ( !! vegetarian ) ) && (
								<Button
									icon={ icons.vegetarian }
									className={ classnames( 'wp-block-coblocks-food-item__attribute', 'wp-block-coblocks-food-item__attribute--vegetarian', {
										'is-toggled': vegetarian,
									} ) }
									label={ __( 'Vegetarian', 'coblocks' ) }
									onClick={ () =>
										setAttributes( {
											vegetarian: ! vegetarian,
										} )
									}
									isToggled={ vegetarian }
								/>
							) }
							{ ( ( isSelected && !! glutenFree ) || ( !! glutenFree ) ) && (
								// Only renders if the option is checked within the Settings sidebar.
								<Button
									icon={ icons.glutenFree }
									className={ classnames( 'wp-block-coblocks-food-item__attribute', 'wp-block-coblocks-food-item__attribute--gluten-free', {
										'is-toggled': glutenFree,
									} ) }
									onClick={ () =>
										setAttributes( {
											glutenFree: ! glutenFree,
										} ) }
									label={ __( 'Gluten free', 'coblocks' ) }
									isToggled={ glutenFree }
								/>
							) }
							{ ( ( isSelected && !! pescatarian ) || ( !! pescatarian ) ) && (
								// Only renders if the option is checked within the Settings sidebar.
								<Button
									icon={ icons.pescatarian }
									label={ __( 'Pescatarian', 'coblocks' ) }
									className={ classnames( 'wp-block-coblocks-food-item__attribute', 'wp-block-coblocks-food-item__attribute--pescatarian', {
										'is-toggled': pescatarian,
									} ) }
									onClick={ () =>
										setAttributes( {
											pescatarian: ! pescatarian,
										} )
									}
									isToggled={ pescatarian }
								/>
							) }
							{ ( ( isSelected && !! vegan ) || ( !! vegan ) ) && (
								// Only renders if the option is checked within the Settings sidebar.
								<Button
									icon={ icons.vegan }
									className={ classnames( 'wp-block-coblocks-food-item__attribute', 'wp-block-coblocks-food-item__attribute--vegan', {
										'is-toggled': vegan,
									} ) }
									onClick={ () =>
										setAttributes( { vegan: ! vegan } )
									}
									isToggled={ vegan }
								/>
							) }
						</div>
					</div>
					<RichText
						value={ description }
						tagName="p"
						wrapperClassName="wp-block-coblocks-food-item__description"
						placeholder={ __( 'Add description…', 'coblocks' ) }
						onChange={ ( newDescription ) => setAttributes( { description: newDescription } ) }
						{ ...richTextAttributes }
					/>
					{ !! showPrice && ( price || isSelected ) && (
						<RichText
							value={ price }
							tagName="p"
							wrapperClassName="wp-block-coblocks-food-item__price"
							placeholder={ __( '$0.00', 'coblocks' ) }
							onChange={ ( newPrice ) => {
								setPrice( newPrice );
								setAttributes( { price: newPrice } );
							} }
							{ ...richTextAttributes }
						/>
					) }
				</div>
			</div>
		</>
	);
};

const applyWithSelect = withSelect( ( select, props ) => {
	const {
		getBlockRootClientId,
		getBlockSelectionStart,
		getBlocksByClientId,
	} = select( 'core/block-editor' );

	const selectedClientId = getBlockSelectionStart();
	const parentClientId = getBlockRootClientId( selectedClientId );
	const innerItems = getBlocksByClientId( props.clientId )[ 0 ].innerBlocks;

	return {
		selectedParentClientId: parentClientId,
		innerItems,
		getBlockRootClientId,
		getBlockSelectionStart,
		getBlocksByClientId,
	};
} );

const applyWithDispatch = withDispatch( ( dispatch ) => {
	const {
		insertBlocks,
		removeBlocks,
		updateBlockAttributes,
	} = dispatch( 'core/block-editor' );

	return {
		insertBlocks,
		removeBlocks,
		updateBlockAttributes,
	};
} );

export default compose( [ applyWithSelect, applyWithDispatch ] )( FoodItem );

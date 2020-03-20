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
import { Component, Fragment } from '@wordpress/element';
import { IconButton, DropZone, Spinner } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { RichText, MediaPlaceholder } from '@wordpress/block-editor';
import { mediaUpload } from '@wordpress/editor';
import { isBlobURL } from '@wordpress/blob';
import { createBlock } from '@wordpress/blocks';
import { compose } from '@wordpress/compose';

const isEmpty = ( attributes ) => {
	const attributesToCheck = [ 'url', 'title', 'description', 'price' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	if ( typeof Object.fromEntries === 'undefined' ) {
		return hasEmptyAttributes( fromEntries( newAttributes ) );
	}

	return hasEmptyAttributes( Object.fromEntries( newAttributes ) );
};

class FoodItem extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			url: this.props.attributes.url ||'',
			price: this.props.attributes.price || '',
		}
		this.replaceImage = this.replaceImage.bind( this );
		this.setSpicyTo = this.setSpicyTo.bind( this );
		this.setHotTo = this.setHotTo.bind( this );
		this.updateInnerAttributes = this.updateInnerAttributes.bind( this );
		this.onChangeHeadingLevel = this.onChangeHeadingLevel.bind( this );
	}

	/**
	 * Handle creation and removal of placeholder elements so that we always have one available to use.
	 *
	 * @param {number} childClientId The child block's ClientId.
	 * @param {string} blockName The block to insert.
	 * @param {Object} blockAttributes The attributes for the placeholder block.
	 */
	handlePlaceholderPlacement( childClientId, blockName, blockAttributes = {} ) {
		const { getBlockRootClientId, getBlocksByClientId, removeBlocks, insertBlocks } = this.props;

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
	}

	updateInnerAttributes( blockName, newAttributes ) {
		const { getBlocksByClientId, updateBlockAttributes } = this.props;
		const innerItems = getBlocksByClientId(	this.props.clientId )[ 0 ].innerBlocks;

		innerItems.forEach( ( item ) => {
			if ( item.name === blockName ) {
				updateBlockAttributes(
					item.clientId,
					newAttributes
				);
			}
		} );
	}

	onChangeHeadingLevel( headingLevel ) {
		const { setAttributes } = this.props;

		setAttributes( { headingLevel } );
	}

	componentDidUpdate( prevProps ) {
		const { attributes, clientId, isSelected, setAttributes } = this.props;
		const { showPrice, showImage } = attributes;

		// Handle placeholder
		if (
			isEmpty( prevProps.attributes ) !== isEmpty( attributes ) ||
			( ! prevProps.isSelected && isSelected )
		) {
			this.handlePlaceholderPlacement( clientId, 'coblocks/food-item', {
				showImage,
				showPrice,
			} );
		}

		if ( showPrice !== prevProps.attributes.showPrice ) {
			setAttributes( { price: showPrice ? this.state.price : '' } );
		}

		if ( showImage !== prevProps.attributes.showImage ) {
			setAttributes( { url: showImage ? this.state.url : '' } );
		}
	}

	replaceImage( files ) {
		mediaUpload( {
			allowedTypes: [ 'image' ],
			filesList: files,
			onFileChange: ( [ media ] ) => {
				this.setState( { url: media.url } );
				this.props.setAttributes( { url: media.url, alt: media.alt } );
			}
		} );
	}

	setSpicyTo() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		if ( !! attributes.spicier ) {
			setAttributes( { spicier: ! attributes.spicier } );
		}

		setAttributes( { spicy: ! attributes.spicy } );
	}

	setHotTo() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		if ( ! attributes.spicy ) {
			setAttributes( { spicy: ! attributes.spicier } );
		}

		setAttributes( { spicier: ! attributes.spicier } );
	}

	renderImage() {
		const {
			attributes,
			setAttributes,
			isSelected,
		} = this.props;

		const {
			url,
			alt,
			focalPoint,
		} = attributes;

		const classes = classnames( 'wp-block-coblocks-food-item__figure', {
			'is-transient': isBlobURL( url ),
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
								onClick={ () => {
									setAttributes( { url: '' } )
									this.setState( { url: '' } );
								} }
								className="coblocks-gallery-item__button"
								label={ __( 'Remove image', 'coblocks' ) }
								disabled={ ! isSelected }
							/>
						</div>
					) }
					{ dropZone }
					{ isBlobURL( url ) && <Spinner /> }
					<img
						src={ url }
						alt={ alt }
						style={ {
							objectPosition: focalPoint ?
								`${ focalPoint.x * 100 }% ${ focalPoint.y *
										100 }%` :
								undefined,
						} }
					/>
				</figure>
			</Fragment>
		);
	}

	renderPlaceholder() {
		const {
			setAttributes,
		} = this.props;

		return (
			<div className="wp-block-coblocks-food-item__figure">
				<MediaPlaceholder
					allowedTypes={ [ 'image' ] }
					multiple={ false }
					icon="format-image"
					labels={ {
						title: ' ',
					} }
					onSelect={ ( el ) => setAttributes( { url: el.url, alt: el.alt } ) }
				/>
			</div>
		);
	}

	render() {
		const {
			attributes,
			className,
			isSelected,
			setAttributes,
		} = this.props;

		const {
			description,
			glutenFree,
			pescatarian,
			popular,
			price,
			showImage,
			showPrice,
			spicier,
			spicy,
			title,
			url,
			vegan,
			vegetarian,
			headingLevel,
		} = attributes;

		const richTextAttributes = {
			keepPlaceholderOnFocus: true,
			formattingControls: [ 'bold', 'italic' ],
		};

		return (
			<Fragment>
				<Controls
					{ ...this.props }
					onChangeHeadingLevel={ this.onChangeHeadingLevel }
				/>
				<Inspector
					{ ...this.props }
					setSpicyTo={ this.setSpicyTo }
					setHotTo={ this.setHotTo }
				/>
				<div
					className={ classnames( className, {
						'is-empty': isEmpty( attributes ),
					} ) }
				>
					{ !! showImage &&
						( url ? this.renderImage() : this.renderPlaceholder() ) }
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
									<IconButton
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
									<IconButton
										icon={ icons.spicy }
										label={ __( 'Spicy', 'coblocks' ) }
										className={ classnames( 'wp-block-coblocks-food-item__attribute', 'wp-block-coblocks-food-item__attribute--spicy', {
											'is-toggled': spicy,
										} ) }
										onClick={ this.setSpicyTo }
										isToggled={ spicy }
									/>
								) }
								{ ( ( isSelected && title && !! spicy ) || ( !! spicier ) ) && (
									<IconButton
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
									<IconButton
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
									<IconButton
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
									<IconButton
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
									<IconButton
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
									this.setState( { price: newPrice } );
									this.props.setAttributes( { price : newPrice}) 
								} }
								{ ...richTextAttributes }
							/>
						) }
					</div>
				</div>
			</Fragment>
		);
	}
}

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

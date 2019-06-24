/**
 * Internal dependencies.
 */
import { hasEmptyAttributes } from '../../../../utils/block-helpers';
import InspectorControls from './inspector';
import icons from './icons';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { IconButton, Toolbar, DropZone, Spinner, Icon } = wp.components;
const { dispatch, select } = wp.data;
const {
	RichText,
	MediaPlaceholder,
	MediaUpload,
	BlockControls,
} = wp.blockEditor;
const { mediaUpload } = wp.editor;
const { isBlobURL } = wp.blob;

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
	const menuClientId = select( 'core/editor' ).getBlockRootClientId(
		childClientId
	);

	const menuItems = select( 'core/editor' ).getBlocksByClientId( menuClientId )[ 0 ]
		.innerBlocks;

	const placeholders = menuItems.filter(
		item => item.name === blockName && isEmpty( item.attributes )
	);

	// Remove trailing placholders if there are more than one.
	dispatch( 'core/editor' ).removeBlocks(
		placeholders
			.filter( ( item, index ) => item.clientId !== childClientId && index !== 0 )
			.map( item => item.clientId ),
		false
	);

	// Add a placeholder if there are none.
	if ( placeholders.length === 0 ) {
		const newMenuItem = wp.blocks.createBlock( blockName, blockAttributes );
		dispatch( 'core/editor' ).insertBlocks(
			newMenuItem,
			menuItems.length,
			menuClientId,
			false
		);
	}
};

const isEmpty = attributes => {
	const attributesToCheck = [ 'imageUrl', 'title', 'description', 'itemPrice' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	return hasEmptyAttributes( Object.fromEntries( newAttributes ) );
};

class MenuItem extends Component {
	constructor() {
		super( ...arguments );

		this.replaceImage = this.replaceImage.bind( this );
	}

	componentDidUpdate( prevProps ) {
		if (
			isEmpty( prevProps.attributes ) !== isEmpty( this.props.attributes ) ||
			( ! prevProps.isSelected && this.props.isSelected )
		) {
			const { showImage, showPrice } = this.props.attributes;
			handlePlaceholderPlacement( this.props.clientId, 'coblocks/menu-item', {
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
				this.props.setAttributes( { imageUrl: media.url, imageAlt: media.alt } ),
		} );
	}

	renderImage() {
		const { attributes, setAttributes, isSelected } = this.props;

		const classes = classnames( 'wp-block-coblocks-menu-item__image', {
			'is-transient': isBlobURL( attributes.imageUrl ),
			'is-selected': isSelected,
		} );

		const dropZone = (
			<DropZone
				onFilesDrop={ this.replaceImage }
				label={ __( 'Drop file to replace' ) }
			/>
		);

		return (
			<Fragment>
				{ this.renderToolbarEditButton() }
				<figure className={ classes }>
					{ isSelected && (
						<div className="wp-block-coblocks-menu-item__remove-menu">
							<IconButton
								icon="no-alt"
								onClick={ () => setAttributes( { imageUrl: '' } ) }
								className="coblocks-gallery-item__button"
								label={ __( 'Remove Image' ) }
								disabled={ ! isSelected }
							/>
						</div>
					) }
					{ dropZone }
					{ isBlobURL( attributes.imageUrl ) && <Spinner /> }
					<img src={ attributes.imageUrl } alt={ '' } />
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
				onSelect={ el => setAttributes( { imageUrl: el.url, imageAlt: el.alt } ) }
			/>
		);
	}

	renderToolbarEditButton() {
		const { setAttributes } = this.props;
		return (
			<BlockControls>
				<Toolbar>
					<MediaUpload
						allowedTypes={ [ 'image' ] }
						multiple={ false }
						onSelect={ media =>
							setAttributes( { imageUrl: media.url, imageAlt: media.alt } )
						}
						render={ ( { open } ) => (
							<IconButton
								className="components-toolbar__control"
								label={ __( 'Edit media' ) }
								icon="edit"
								onClick={ open }
							/>
						) }
					/>
				</Toolbar>
			</BlockControls>
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
				<InspectorControls { ...this.props } />
				<div
					className={ classnames( className, {
						'is-empty': isEmpty( attributes ),
					} ) }
				>
					{ !! attributes.showImage &&
						( attributes.imageUrl ?
							this.renderImage() :
							this.renderPlaceholder() ) }
					<div className="wp-block-coblocks-menu-item__content">
						<div className="wp-block-coblocks-menu-item__heading-wrapper">
							<RichText
								value={ attributes.title }
								tagName="h4"
								wrapperClassName="wp-block-coblocks-menu-item__heading"
								placeholder={ __( 'Add menu item...' ) }
								onChange={ title => setAttributes( { title } ) }
								{ ...richTextAttributes }
							/>
							<div className="wp-block-coblocks-menu-item__attributes">
								{ isSelected && attributes.title ?
									<IconButton
										icon={ icons.spicy }
										className="wp-block-coblocks-menu-item__attribute wp-block-coblocks-menu-item__attribute--spicy"
										onClick={ () => setAttributes( { spicy: ! attributes.spicy } ) }
										label={ __( 'Spicy' ) }
										isToggled={ attributes.spicy }
									/>
									: !! attributes.spicy && <Icon
										icon={ icons.spicy }
										className="wp-block-coblocks-menu-item__attribute wp-block-coblocks-menu-item__attribute--spicy"
									/>
								}
								{ isSelected && attributes.title ?
									<IconButton
										icon={ icons.vegetarian }
										className="wp-block-coblocks-menu-item__attribute wp-block-coblocks-menu-item__attribute--vegetarian"
										onClick={ () => setAttributes( { vegetarian: ! attributes.vegetarian } ) }
										label={ __( 'Spicy' ) }
										isToggled={ attributes.vegetarian }
									/>
									: !! attributes.vegetarian && <Icon
										icon={ icons.vegetarian }
										className="wp-block-coblocks-menu-item__attribute wp-block-coblocks-menu-item__attribute--vegetarian"
									/>
								}
								{ isSelected && attributes.title ?
									<IconButton
										icon={ icons.glutenFree }
										className="wp-block-coblocks-menu-item__attribute wp-block-coblocks-menu-item__attribute--gf"
										onClick={ () => setAttributes( { glutenFree: ! attributes.glutenFree } ) }
										label={ __( 'Gluten Free' ) }
										isToggled={ attributes.glutenFree }
									/>
									: !! attributes.glutenFree && <Icon
										icon={ icons.glutenFree }
										className="wp-block-coblocks-menu-item__attribute wp-block-coblocks-menu-item__attribute--gf"
									/>
								}
							</div>
						</div>
						<RichText
							value={ attributes.description }
							tagName="p"
							wrapperClassName="wp-block-coblocks-menu-item__description"
							placeholder={ __( 'Add description...' ) }
							onChange={ description => setAttributes( { description } ) }
							{ ...richTextAttributes }
						/>
						{ !! attributes.showPrice && ( attributes.itemPrice || isSelected ) && (
							<RichText
								value={ attributes.itemPrice }
								tagName="p"
								wrapperClassName="wp-block-coblocks-menu-item__price"
								placeholder={ __( '$0.00' ) }
								onChange={ itemPrice => setAttributes( { itemPrice } ) }
								{ ...richTextAttributes }
							/>
						) }
					</div>
				</div>
			</Fragment>
		);
	}
}

export default MenuItem;

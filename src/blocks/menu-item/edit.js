/**
 * Internal dependencies.
 */
import { hasEmptyAttributes } from '../../utils/block-helpers';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { PanelBody, ToggleControl, IconButton, Toolbar } = wp.components;
const { dispatch, select } = wp.data;
const {
	InspectorControls,
	RichText,
	MediaPlaceholder,
	MediaUpload,
	BlockControls,
} = wp.editor;

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

	// Add a placeholder if there are none. Remove trailing placholders if there are more than one.
	if ( placeholders.length === 0 ) {
		const newMenuItem = wp.blocks.createBlock( blockName, blockAttributes );
		dispatch( 'core/editor' ).insertBlocks(
			newMenuItem,
			menuItems.length,
			menuClientId,
			false
		);
	} else if ( placeholders.length > 1 ) {
		const extraPlaceholders = placeholders.filter(
			item => item.clientId !== childClientId
		);
		dispatch( 'core/editor' ).removeBlocks(
			extraPlaceholders.map( item => item.clientId ),
			false
		);
	}
};

const isEmpty = attributes => {
	const attributesToCheck = [
		'imageUrl',
		'title',
		'description',
		'itemPrice',
	];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	return hasEmptyAttributes( Object.fromEntries( newAttributes ) );
};

class MenuItem extends Component {
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

	renderInspectorControls() {
		const { attributes, setAttributes } = this.props;
		return (
			<InspectorControls>
				<PanelBody title={ __( 'Menu Item Settings' ) } initialOpen={ true }>
					<ToggleControl
						label={ __( 'Image' ) }
						help={
							attributes.showImage ?
								__( 'Showing image for this item' ) :
								__( 'Toggle to show image for this item.' )
						}
						checked={ attributes.showImage }
						onChange={ () => setAttributes( { showImage: ! attributes.showImage } ) }
					/>
					<ToggleControl
						label={ __( 'Price' ) }
						help={
							attributes.showPrice ?
								__( 'Showing the price for this item' ) :
								__( 'Toggle to show the price for this item.' )
						}
						checked={ attributes.showPrice }
						onChange={ () => setAttributes( { showPrice: ! attributes.showPrice } ) }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}

	renderImage() {
		const { attributes } = this.props;
		return (
			<Fragment>
				{ this.renderToolbarEditButton() }
				<figure>
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
				onSelect={ el => setAttributes( { imageUrl: el.url } ) }
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
						onSelect={ media => setAttributes( { imageUrl: media.url } ) }
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
				{ this.renderInspectorControls() }
				<div
					className={ classnames( className, {
						'is-empty': isEmpty( attributes ),
					} ) }
				>
					{ attributes.showImage &&
						( attributes.imageUrl ?
							this.renderImage() :
							this.renderPlaceholder() ) }
					<div className="wp-block-coblocks-menu__content">
						<RichText
							value={ attributes.title }
							tagName="h4"
							placeholder={ __( 'Add menu item...' ) }
							onChange={ title => setAttributes( { title } ) }
							{ ...richTextAttributes }
						/>
						<RichText
							value={ attributes.description }
							tagName="p"
							placeholder={ __( 'Add description...' ) }
							onChange={ description => setAttributes( { description } ) }
							{ ...richTextAttributes }
						/>
						{ attributes.showPrice && ( attributes.itemPrice || isSelected ) && (
							<RichText
								value={ attributes.itemPrice }
								tagName="p"
								className="wp-block-coblocks-menu__price"
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

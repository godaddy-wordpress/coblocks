/**
 * Internal dependencies.
 */
import { hasEmptyAttributes } from '../../utils/block-helpers';

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
 */
const handlePlaceholderPlacement = childClientId => {
	const menuClientId = select( 'core/editor' ).getBlockRootClientId(
		childClientId
	);

	const menuItems = select( 'core/editor' ).getBlocksByClientId( menuClientId )[ 0 ]
		.innerBlocks;

	const placeholders = menuItems.filter(
		item => item.name === 'coblocks/menu-item' && isEmpty( item.attributes )
	);

	// Add a placeholder if there are none. Remove trailing placholders if there are more than one.
	if ( placeholders.length === 0 ) {
		const newMenuItem = wp.blocks.createBlock( 'coblocks/menu-item', {} );
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
		'itemImage',
		'itemName',
		'itemDescription',
		'itemCost',
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
			handlePlaceholderPlacement( this.props.clientId );
		}
	}

	renderInspectorControls() {
		const { attributes, setAttributes } = this.props;
		return (
			<InspectorControls>
				<PanelBody title={ __( 'Menu Settings' ) } initialOpen={ true }>
					<ToggleControl
						label={ __( 'Images' ) }
						help={
							attributes.showImage ?
								__( 'Showing image for this item' ) :
								__( 'Toggle to show image for this item.' )
						}
						checked={ attributes.showImage }
						onChange={ () => setAttributes( { showImage: ! attributes.showImage } ) }
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
					<img src={ attributes.itemImage } alt={ '' } />
				</figure>
			</Fragment>
		);
	}

	renderPlaceholder() {
		const { setAttributes } = this.props;
		return (
			<MediaPlaceholder
				allowedTypes={ [ 'image' ] }
				onSelect={ el => setAttributes( { itemImage: el.url } ) }
			/>
		);
	}

	renderToolbarEditButton() {
		return (
			<BlockControls>
				<Toolbar>
					<MediaUpload
						allowedTypes={ [ 'image' ] }
						multiple={ false }
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
		const { className, attributes, setAttributes } = this.props;

		const richTextAttributes = {
			keepPlaceholderOnFocus: true,
			formattingControls: [ 'bold', 'italic' ],
		};

		return (
			<Fragment>
				{ this.renderInspectorControls() }
				<div className={ className }>
					{ attributes.showImage &&
						( attributes.itemImage ?
							this.renderImage() :
							this.renderPlaceholder() ) }
					<RichText
						value={ attributes.itemName }
						tagName="h4"
						placeholder={ __( 'Add menu item...' ) }
						onChange={ itemName => setAttributes( { itemName } ) }
						{ ...richTextAttributes }
					/>
					<RichText
						value={ attributes.itemDescription }
						tagName="p"
						placeholder={ __( 'Add description...' ) }
						onChange={ itemDescription => setAttributes( { itemDescription } ) }
						{ ...richTextAttributes }
					/>
					<RichText
						value={ attributes.itemCost }
						tagName="p"
						placeholder={ __( '$0.00' ) }
						onChange={ itemCost => setAttributes( { itemCost } ) }
						{ ...richTextAttributes }
					/>
				</div>
			</Fragment>
		);
	}
}

export default MenuItem;

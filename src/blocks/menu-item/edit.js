/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { PanelBody, ToggleControl, IconButton, Toolbar } = wp.components;
const {
	InspectorControls,
	RichText,
	MediaPlaceholder,
	MediaUpload,
	BlockControls,
} = wp.editor;

class MenuItem extends Component {

	componentDidMount() {
		const { attributes, setAttributes } = this.props;
		if ( !! attributes.itemImage ) {
			setAttributes( { showImage: true } );
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
				multiple = { false }
				labels = {
					{ instructions: '' }
				}
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

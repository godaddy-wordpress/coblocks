/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { PanelBody, ToggleControl } = wp.components;
const { InspectorControls, RichText } = wp.editor;

class MenuItem extends Component {
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

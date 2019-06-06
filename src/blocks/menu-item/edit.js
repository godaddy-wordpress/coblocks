/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { PanelBody, ToggleControl } = wp.components;
const { InspectorControls } = wp.editor;

class MenuItem extends Component {
	render() {
		const { className, attributes, setAttributes } = this.props;

		return (
			<Fragment>
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
							onChange={ () =>
								setAttributes( { showImage: ! attributes.showImage } )
							}
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ className }>
					<pre style={ { fontSize: 12 } }>
						{ JSON.stringify( this.props, null, 2 ) }
					</pre>
				</div>
			</Fragment>
		);
	}
}

export default MenuItem;

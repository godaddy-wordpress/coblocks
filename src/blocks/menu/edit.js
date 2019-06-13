/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { PanelBody, ToggleControl } = wp.components;
const { dispatch, select } = wp.data;
const { InspectorControls, InnerBlocks } = wp.editor;

const ALLOWED_BLOCKS = [ 'coblocks/menu-item' ];

const TEMPLATE = [
	[ 'core/heading', { level: 3, content: __( 'Appetizers' ), align: 'center' } ],
	[
		'coblocks/menu-item',
		{
			itemImage: '',
			itemName: __( 'Bread Sticks' ),
			itemDescription: __( 'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.' ),
			itemCost: __( '$4.75' ),
		},
	],
	[
		'coblocks/menu-item',
		{
			itemImage: '',
			itemName: __( 'Onion Rings' ),
			itemDescription: __( 'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.' ),
			itemCost: __( '$4.75' ),
		},
	],
	[
		'coblocks/menu-item',
		{
			itemImage: '',
			itemName: __( 'Nachos Supreme' ),
			itemDescription: __( 'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.' ),
			itemCost: __( '$4.75' ),
		},
	],
	[
		'coblocks/menu-item',
		{
			itemImage: '',
			itemName: __( 'Jalepeno Poppers' ),
			itemDescription: __( 'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.' ),
			itemCost: __( '$4.75' ),
		},
	],
	[ 'coblocks/menu-item' ],
];

class Menu extends Component {
	toggleImages = () => {
		const { clientId, attributes, setAttributes } = this.props;

		const showImages = ! attributes.showImages;

		setAttributes( { showImages } );

		const menuItems = select( 'core/editor' ).getBlocksByClientId( clientId )[ 0 ]
			.innerBlocks;

		menuItems.map( item => {
			dispatch( 'core/editor' ).updateBlockAttributes( item.clientId, {
				showImage: showImages,
			} );
		} );
	};

	render() {
		const { className, attributes } = this.props;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Menu Settings' ) } initialOpen={ true }>
						<ToggleControl
							label={ __( 'Images' ) }
							help={
								attributes.showImages ?
									__( 'Showing images for each item' ) :
									__( 'Toggle to show images for each item.' )
							}
							checked={ attributes.showImages }
							onChange={ this.toggleImages }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ className }>
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
					/>
				</div>
			</Fragment>
		);
	}
}

export default Menu;

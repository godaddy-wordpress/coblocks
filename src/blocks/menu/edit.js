/**
 * Internal dependencies.
 */
import MenuAppender from './components/menu-appender';

/**
 * External dependencies.
 */
import { find } from 'lodash';
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { PanelBody, ToggleControl } = wp.components;
const { compose } = wp.compose;
const { withSelect, dispatch, select } = wp.data;
const { InspectorControls, InnerBlocks } = wp.editor;
const { ENTER, SPACE } = wp.keycodes;
const TokenList = wp.tokenList;

const ALLOWED_BLOCKS = [ 'coblocks/menu-item' ];

const TEMPLATE = [
	[ 'core/heading', { level: 3, content: __( 'Appetizers' ), align: 'center' } ],
	[
		'coblocks/menu-item',
		{
			itemImage: '',
			itemName: __( 'Bread Sticks' ),
			itemDescription: __(
				'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.'
			),
			itemPrice: __( '$4.75' ),
		},
	],
	[
		'coblocks/menu-item',
		{
			itemImage: '',
			itemName: __( 'Onion Rings' ),
			itemDescription: __(
				'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.'
			),
			itemPrice: __( '$4.75' ),
		},
	],
	[
		'coblocks/menu-item',
		{
			itemImage: '',
			itemName: __( 'Nachos Supreme' ),
			itemDescription: __(
				'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.'
			),
			itemPrice: __( '$4.75' ),
		},
	],
	[
		'coblocks/menu-item',
		{
			itemImage: '',
			itemName: __( 'Jalepeno Poppers' ),
			itemDescription: __(
				'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.'
			),
			itemPrice: __( '$4.75' ),
		},
	],
	[ 'coblocks/menu-item' ],
];

const layoutOptions = [
	{
		name: 'grid',
		label: __( 'Grid' ),
		icon: <svg height="26" viewBox="0 0 56 26" width="56" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fill-rule="evenodd"><path d="m5 6h13v.87858073 1.12141927h-13z"/><path d="m8 18h6v.8785807 1.1214193h-6z"/><path d="m0 10h23v.8785807 1.1214193h-23z"/><path d="m3 14h17v.8785807 1.1214193h-17z"/><path d="m38 6h13v.87858073 1.12141927h-13z"/><path d="m41 18h6v.8785807 1.1214193h-6z"/><path d="m33 10h23v.8785807 1.1214193h-23z"/><path d="m36 14h17v.8785807 1.1214193h-17z"/></g></svg>,
		iconWithImages: <svg height="26" viewBox="0 0 56 26" width="56" xmlns="http://www.w3.org/2000/svg"><g fill-rule="evenodd"><path d="m0 0h24v14h-24z"/><path d="m3 16h18v.8785807 1.1214193h-18z"/><path d="m1 20h22v.8785807 1.1214193h-22z"/><path d="m4 24h16v.8785807 1.1214193h-16z"/><path d="m32 0h24v14h-24z"/><path d="m35 16h18v.8785807 1.1214193h-18z"/><path d="m33 20h22v.8785807 1.1214193h-22z"/><path d="m36 24h16v.8785807 1.1214193h-16z"/></g></svg>,
		isDefault: true,
	},
	{
		name: 'list',
		label: __( 'List' ),
		icon: <svg height="26" viewBox="0 0 56 26" width="56" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fill-rule="evenodd"><path d="m14 0h18v.87858073 1.12141927h-18z"/><path d="m14 4h28v.87858073 1.12141927h-28z"/><path d="m14 8h20v.87858073 1.12141927h-20z"/><path d="m14 16h18v.8785807 1.1214193h-18z"/><path d="m14 20h28v.8785807 1.1214193h-28z"/><path d="m14 24h20v.8785807 1.1214193h-20z"/></g></svg>,
		iconWithImages: <svg height="26" viewBox="0 0 56 26" width="56" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fill-rule="evenodd"><path d="m10 0h10v10h-10z"/><path d="m22 0h14v.87858073 1.12141927h-14z"/><path d="m22 4h22v.87858073 1.12141927h-22z"/><path d="m22 8h16v.87858073 1.12141927h-16z"/><path d="m10 16h10v10h-10z"/><path d="m22 16h14v.8785807 1.1214193h-14z"/><path d="m22 20h22v.8785807 1.1214193h-22z"/><path d="m22 24h16v.8785807 1.1214193h-16z"/></g></svg>,
	},
];

/**
 * Returns the active style from the given className.
 *
 * @param {Array} styles Block style variations.
 * @param {string} className  Class name
 *
 * @return {Object?} The active style.
 */
function getActiveStyle( styles, className ) {
	for ( const style of new TokenList( className ).values() ) {
		if ( style.indexOf( 'is-style-' ) === -1 ) {
			continue;
		}

		const potentialStyleName = style.substring( 9 );
		const activeStyle = find( styles, { name: potentialStyleName } );

		if ( activeStyle ) {
			return activeStyle;
		}
	}

	return find( styles, 'isDefault' );
}

/**
 * Replaces the active style in the block's className.
 *
 * @param {string}  className   Class name.
 * @param {Object?} activeStyle The replaced style.
 * @param {Object}  newStyle    The replacing style.
 *
 * @return {string} The updated className.
 */
function replaceActiveStyle( className, activeStyle, newStyle ) {
	const list = new TokenList( className );

	if ( activeStyle ) {
		list.remove( 'is-style-' + activeStyle.name );
	}

	list.add( 'is-style-' + newStyle.name );

	return list.value;
}

class Menu extends Component {
	updateInnerAttributes = ( blockName, newAttributes ) => {
		const innerItems = select( 'core/editor' ).getBlocksByClientId(
			this.props.clientId
		)[ 0 ].innerBlocks;

		innerItems.map( item => {
			if ( item.name === blockName ) {
				dispatch( 'core/editor' ).updateBlockAttributes(
					item.clientId,
					newAttributes
				);
			}
		} );
	};

	toggleImages = () => {
		const { attributes, setAttributes } = this.props;

		const showImages = ! attributes.showImages;
		setAttributes( { showImages } );

		this.updateInnerAttributes( 'coblocks/menu-item', { showImage: showImages } );
	};

	togglePrices = () => {
		const { attributes, setAttributes } = this.props;

		const showPrices = ! attributes.showPrices;
		setAttributes( { showPrices } );

		this.updateInnerAttributes( 'coblocks/menu-item', { showPrice: showPrices } );
	};

	updateStyle = style => {
		const { className, attributes, setAttributes } = this.props;

		const activeStyle = getActiveStyle( layoutOptions, className );
		const updatedClassName = replaceActiveStyle(
			attributes.className,
			activeStyle,
			style
		);

		setAttributes( { className: updatedClassName } );
	};

	insertNewMenu = () => {
		const { clientId, attributes } = this.props;

		const blockOrder = select( 'core/editor' ).getBlockOrder();
		const insertAtIndex = blockOrder.indexOf( clientId ) + 1;

		const innerBlocks = TEMPLATE.map( ( [ blockName, blockAttributes ] ) =>
			wp.blocks.createBlock(
				blockName,
				Object.assign( {}, blockAttributes, {
					showImage: attributes.showImages,
					showPrice: attributes.showPrices,
				} )
			)
		);

		const newMenu = wp.blocks.createBlock(
			'coblocks/menu',
			attributes,
			innerBlocks
		);

		dispatch( 'core/editor' ).insertBlock( newMenu, insertAtIndex );
	};

	render() {
		const {
			className,
			attributes,
			isSelected,
			clientId,
			selectedParentClientId,
		} = this.props;

		const activeStyle = getActiveStyle( layoutOptions, className );

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Styles' ) } initialOpen={ true }>
						<div className="editor-block-styles block-editor-block-styles coblocks-editor-block-styles">
							{ layoutOptions.map( style => (
								<div
									key={ `menu-style-${ style.name }` }
									className={ classnames(
										'editor-block-styles__item block-editor-block-styles__item',
										{
											'is-active': activeStyle === style,
										}
									) }
									onClick={ () => this.updateStyle( style ) }
									onKeyDown={ event => {
										if ( ENTER === event.keyCode || SPACE === event.keyCode ) {
											event.preventDefault();
											this.updateStyle( style );
										}
									} }
									role="button"
									tabIndex="0"
									aria-label={ style.label || style.name }
								>
									<div className="editor-block-styles__item-preview block-editor-block-styles__item-preview">
										{ attributes.showImages ? style.iconWithImages : style.icon }
									</div>
									<div className="editor-block-styles__item-label block-editor-block-styles__item-label">
										{ style.label || style.name }
									</div>
								</div>
							) ) }
						</div>
					</PanelBody>

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
						<ToggleControl
							label={ __( 'Prices' ) }
							help={
								attributes.showPrices ?
									__( 'Showing the price of each item' ) :
									__( 'Toggle to show the price of each item.' )
							}
							checked={ attributes.showPrices }
							onChange={ this.togglePrices }
						/>
					</PanelBody>
				</InspectorControls>
				<div
					className={ classnames( className, {
						'child-selected': isSelected || clientId === selectedParentClientId,
					} ) }
				>
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateInsertUpdatesSelection={ false }
					/>
					{ ( isSelected || clientId === selectedParentClientId ) && (
						<MenuAppender onClick={ this.insertNewMenu } />
					) }
				</div>
			</Fragment>
		);
	}
}

const applyWithSelect = withSelect( () => {
	const selectedClientId = select( 'core/editor' ).getBlockSelectionStart();
	const parentClientId = select( 'core/editor' ).getBlockRootClientId(
		selectedClientId
	);

	return {
		selectedParentClientId: parentClientId,
	};
} );

export default compose( applyWithSelect )( Menu );

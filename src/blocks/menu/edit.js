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
			itemCost: __( '$4.75' ),
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
			itemCost: __( '$4.75' ),
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
			itemCost: __( '$4.75' ),
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
			itemCost: __( '$4.75' ),
		},
	],
	[ 'coblocks/menu-item' ],
];

const layoutOptions = [
	{ name: 'grid', label: __( 'Grid' ), isDefault: true },
	{ name: 'grid-justify', label: __( 'Justified Grid' ) },
	{ name: 'list', label: __( 'List' ) },
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

		const newMenu = wp.blocks.createBlock( 'coblocks/menu', attributes );
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
					<PanelBody title={ __( 'Styles' ) } initialOpen={ false }>
						<div className="editor-block-styles block-editor-block-styles">
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
										{ style.icon }
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
					</PanelBody>
				</InspectorControls>
				<div className={ className }>
					<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } template={ TEMPLATE } />
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

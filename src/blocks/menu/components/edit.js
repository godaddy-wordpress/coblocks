/**
 * Internal dependencies.
 */
import MenuAppender from './menu-appender';
import InspectorControls from './inspector';
import icons from './icons';

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
const { compose } = wp.compose;
const { withSelect, dispatch, select } = wp.data;
const { InnerBlocks } = wp.blockEditor;
const TokenList = wp.tokenList;

const ALLOWED_BLOCKS = [ 'coblocks/menu-item' ];

const TEMPLATE = [
	[ 'core/heading', { level: 3, content: __( 'Appetizers' ), align: 'center' } ],
	[
		'coblocks/menu-item',
		{
			imageUrl: '',
			title: __( 'Bread Sticks' ),
			description: __(
				'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.'
			),
			itemPrice: __( '$4.75' ),
		},
	],
	[
		'coblocks/menu-item',
		{
			imageUrl: '',
			title: __( 'Onion Rings' ),
			description: __(
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
		icon: icons.layoutGridIcon,
		iconWithImages: icons.layoutGridIconWithImages,
		isDefault: true,
	},
	{
		name: 'list',
		label: __( 'List' ),
		icon: icons.layoutListIcon,
		iconWithImages: icons.layoutListIconWithImages,
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
				<InspectorControls
					attributes={ attributes }
					activeStyle={ activeStyle }
					layoutOptions={ layoutOptions }
					onToggleImages={ this.toggleImages }
					onTogglePrices={ this.togglePrices }
					onUpdateStyle={ this.updateStyle }
				/>
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
	const selectedClientId = select( 'core/block-editor' ).getBlockSelectionStart();
	const parentClientId = select( 'core/block-editor' ).getBlockRootClientId(
		selectedClientId
	);

	return {
		selectedParentClientId: parentClientId,
	};
} );

export default compose( applyWithSelect )( Menu );

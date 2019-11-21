/**
 * Internal dependencies.
 */
import CustomAppender from './appender';
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
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect, dispatch, select } from '@wordpress/data';
import { InnerBlocks } from '@wordpress/block-editor';
const TokenList = wp.tokenList;

const ALLOWED_BLOCKS = [ 'coblocks/food-item' ];

const TEMPLATE = [
	[ 'core/heading', { level: 3, placeholder: __( 'Menu title…', 'coblocks' ), align: 'center' } ],
	[ 'coblocks/food-item' ],
	[ 'coblocks/food-item' ],
];

const layoutOptions = [
	{
		name: 'grid',
		/* translators: block style */
		label: __( 'Grid', 'coblocks' ),
		icon: icons.layoutGridIcon,
		iconWithImages: icons.layoutGridIconWithImages,
		isDefault: true,
	},
	{
		name: 'list',
		/* translators: block style */
		label: __( 'List', 'coblocks' ),
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

class FoodItem extends Component {
	constructor( ) {
		super( ...arguments );

		this.updateInnerAttributes = this.updateInnerAttributes.bind( this );
		this.toggleImages = this.toggleImages.bind( this );
		this.togglePrices = this.togglePrices.bind( this );
		this.setColumns = this.setColumns.bind( this );
		this.updateStyle = this.updateStyle.bind( this );
		this.insertNewItem = this.insertNewItem.bind( this );
	}

	updateInnerAttributes( blockName, newAttributes ) {
		const innerItems = select( 'core/block-editor' ).getBlocksByClientId(
			this.props.clientId
		)[ 0 ].innerBlocks;

		innerItems.map( item => {
			if ( item.name === blockName ) {
				dispatch( 'core/block-editor' ).updateBlockAttributes(
					item.clientId,
					newAttributes
				);
			}
		} );
	}

	toggleImages() {
		const { attributes, setAttributes } = this.props;

		const showImages = ! attributes.showImages;
		setAttributes( { showImages } );

		this.updateInnerAttributes( 'coblocks/food-item', { showImage: showImages } );
	}

	togglePrices() {
		const { attributes, setAttributes } = this.props;

		const showPrices = ! attributes.showPrices;
		setAttributes( { showPrices } );

		this.updateInnerAttributes( 'coblocks/food-item', { showPrice: showPrices } );
	}

	setColumns( value ) {
		const { setAttributes } = this.props;

		setAttributes( { columns: parseInt( value ) } );
	}

	updateStyle( style ) {
		const { className, attributes, setAttributes } = this.props;

		const activeStyle = getActiveStyle( layoutOptions, className );
		const updatedClassName = replaceActiveStyle(
			attributes.className,
			activeStyle,
			style
		);

		setAttributes( { className: updatedClassName } );
	}

	insertNewItem() {
		const { clientId, attributes } = this.props;

		const blockOrder = select( 'core/block-editor' ).getBlockOrder();
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

		const newItem = wp.blocks.createBlock(
			'coblocks/food-and-drinks',
			attributes,
			innerBlocks
		);

		dispatch( 'core/block-editor' ).insertBlock( newItem, insertAtIndex );
	}

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
					onSetColumns={ this.setColumns }
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
						<CustomAppender onClick={ this.insertNewItem } />
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

export default compose( applyWithSelect )( FoodItem );

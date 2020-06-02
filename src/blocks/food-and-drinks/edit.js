/**
 * Internal dependencies.
 */
import CustomAppender from './appender';
import Inspector from './inspector';
import Controls from './controls';
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
import { withDispatch, withSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import TokenList from '@wordpress/token-list';

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

class FoodAndDrinksEdit extends Component {
	constructor() {
		super( ...arguments );

		this.insertNewItem = this.insertNewItem.bind( this );
		this.onChangeHeadingLevel = this.onChangeHeadingLevel.bind( this );
		this.setColumns = this.setColumns.bind( this );
		this.setGutter = this.setGutter.bind( this );
		this.toggleImages = this.toggleImages.bind( this );
		this.togglePrices = this.togglePrices.bind( this );
		this.updateInnerAttributes = this.updateInnerAttributes.bind( this );
		this.updateStyle = this.updateStyle.bind( this );
	}

	componentDidUpdate( prevProps ) {
		const { attributes } = this.props;
		const activeStyle = getActiveStyle( layoutOptions, attributes.className );
		const lastActiveStyle = getActiveStyle( layoutOptions, prevProps.attributes.className );

		if ( activeStyle !== lastActiveStyle ) {
			if ( 'list' === activeStyle.name ) {
				this.setColumns( 1 );
			}

			if ( 'grid' === activeStyle.name ) {
				this.setColumns( 2 );
			}
		}
	}

	updateInnerAttributes( blockName, newAttributes ) {
		const { innerBlocks, updateBlockAttributes } = this.props;

		innerBlocks.forEach( ( item ) => {
			if ( item.name === blockName ) {
				updateBlockAttributes(
					item.clientId,
					newAttributes
				);
			}
		} );
	}

	onChangeHeadingLevel( headingLevel ) {
		const { setAttributes } = this.props;

		setAttributes( { headingLevel } );
		this.updateInnerAttributes( 'coblocks/food-item', { headingLevel } );
	}

	toggleImages() {
		const { attributes, setAttributes } = this.props;

		const showImages = !attributes.showImages;
		setAttributes( { showImages } );

		this.updateInnerAttributes( 'coblocks/food-item', { showImage: showImages } );
	}

	togglePrices() {
		const { attributes, setAttributes } = this.props;

		const showPrices = !attributes.showPrices;
		setAttributes( { showPrices } );

		this.updateInnerAttributes( 'coblocks/food-item', { showPrice: showPrices } );
	}

	setColumns( value ) {
		const { setAttributes } = this.props;

		setAttributes( { columns: parseInt( value ) } );
	}

	setGutter( value ) {
		const { setAttributes } = this.props;

		setAttributes( { gutter: value } );
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
		const { clientId, attributes, insertBlock, getBlockOrder } = this.props;

		const blockOrder = getBlockOrder();
		const insertAtIndex = blockOrder.indexOf( clientId ) + 1;

		const innerBlocks = TEMPLATE.map( ( [ blockName, blockAttributes ] ) =>
			createBlock(
				blockName,
				Object.assign( {}, blockAttributes, {
					showImage: attributes.showImages,
					showPrice: attributes.showPrices,
				} )
			)
		);

		const newItem = createBlock(
			'coblocks/food-and-drinks',
			attributes,
			innerBlocks
		);

		insertBlock( newItem, insertAtIndex );
	}

	render() {
		const {
			className,
			attributes,
			isSelected,
		} = this.props;

		const activeStyle = getActiveStyle( layoutOptions, className );

		const {
			columns,
			gutter,
		} = attributes;

		const classes = classnames( className, {
			'has-columns': columns > 1,
			'has-responsive-columns': columns > 1,
			[ `has-${columns}-columns` ]: columns > 1,
			[ `has-${gutter}-gutter` ]: gutter,
		} );

		return (
			<Fragment>
				<Controls
					{ ...this.props }
					onChangeHeadingLevel={ this.onChangeHeadingLevel }
				/>
				<Inspector
					attributes={ attributes }
					activeStyle={ activeStyle }
					layoutOptions={ layoutOptions }
					onToggleImages={ this.toggleImages }
					onTogglePrices={ this.togglePrices }
					onUpdateStyle={ this.updateStyle }
					onSetColumns={ this.setColumns }
					onSetGutter={ this.setGutter }
				/>
				<div className={ classes }>
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateInsertUpdatesSelection={ false }
					/>
					{ isSelected &&
						<CustomAppender onClick={ this.insertNewItem } />
					}
				</div>
			</Fragment>
		);
	}
}

export default compose( [

	withSelect( ( select, props ) => {
		const {
			getBlockOrder,
			getBlockRootClientId,
			getBlockSelectionStart,
			getBlocks,
			getBlocksByClientId,
		} = select( 'core/block-editor' );

		// Get clientId of the parent block.
		const parentClientId = getBlockRootClientId( getBlockSelectionStart() );

		return {
			getBlockOrder,
			getBlocksByClientId,
			isSelected: props.isSelected || props.clientId === parentClientId,
			innerBlocks: getBlocks( props.clientId ),
		};
	} ),

	withDispatch( ( dispatch ) => {
		const {
			insertBlock,
			insertBlocks,
			updateBlockAttributes,
		} = dispatch( 'core/block-editor' );

		return {
			insertBlock,
			insertBlocks,
			updateBlockAttributes,
		};
	} ),

	// Ensure there is a minimum of one coblocks/food-item innerBlock per column set.
	( WrappedComponent ) => ( ownProps ) => {
		// This is a newly added block if we have zero innerBlocks. We want the TEMPLATE definition to be used in this case.
		if ( ownProps.innerBlocks.length > 0 ) {
			const foodItemBlocksCount = ownProps.innerBlocks.reduce( ( acc, cur ) => acc + ( cur.name === 'coblocks/food-item' ), 0 );

			// Add a new block if the count is less than the columns set.
			// We don't need a loop here because this will trigger a component update as soon as we insert a block (triggering this HOC again).
			if ( foodItemBlocksCount < ownProps.attributes.columns ) {
				ownProps.insertBlock(
					createBlock( 'coblocks/food-item', {
						showImage: ownProps.attributes.showImages,
						showPrice: ownProps.attributes.showPrices,
					} ),
					ownProps.innerBlocks.length,
					ownProps.clientId,
					false
				);
			}
		}

		return <WrappedComponent { ...ownProps } />;
	},

] )( FoodAndDrinksEdit );

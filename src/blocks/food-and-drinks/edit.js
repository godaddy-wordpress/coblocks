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
import { useEffect } from '@wordpress/element';
import { compose, usePrevious } from '@wordpress/compose';
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
 * @param {Array}  styles    Block style variations.
 * @param {string} className Class name
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

const FoodAndDrinksEdit = ( props ) => {
	const {
		className,
		attributes,
		updateBlockAttributes,
		innerBlocks,
		setAttributes,
		clientId,
		insertBlock,
		getBlockOrder,
		isSelected,
	} = props;

	const prevClassName = usePrevious( className );

	const {
		columns,
		gutter,
	} = attributes;

	const activeStyle = getActiveStyle( layoutOptions, className );

	const classes = classnames( className, {
		'has-columns': columns > 1,
		'has-responsive-columns': columns > 1,
		[ `has-${ columns }-columns` ]: columns > 1,
		[ `has-${ gutter }-gutter` ]: gutter,
	} );

	useEffect( () => {
		const lastActiveStyle = getActiveStyle( layoutOptions, prevClassName );

		if ( activeStyle !== lastActiveStyle ) {
			if ( 'list' === activeStyle.name ) {
				setColumns( 1 );
			}

			if ( 'grid' === activeStyle.name ) {
				setColumns( 2 );
			}
		}
	}, [ attributes, prevClassName ] );

	const updateInnerAttributes = ( blockName, newAttributes ) => {
		innerBlocks.forEach( ( item ) => {
			if ( item.name === blockName ) {
				updateBlockAttributes(
					item.clientId,
					newAttributes
				);
			}
		} );
	};

	const onChangeHeadingLevel = ( headingLevel ) => {
		setAttributes( { headingLevel } );
		updateInnerAttributes( 'coblocks/food-item', { headingLevel } );
	};

	const toggleImages = () => {
		const showImages = ! attributes.showImages;
		setAttributes( { showImages } );
		updateInnerAttributes( 'coblocks/food-item', { showImage: showImages } );
	};

	const togglePrices = () => {
		const showPrices = ! attributes.showPrices;
		setAttributes( { showPrices } );
		updateInnerAttributes( 'coblocks/food-item', { showPrice: showPrices } );
	};

	const setColumns = ( value ) => {
		setAttributes( { columns: parseInt( value ) } );
	};

	const setGutter = ( value ) => {
		setAttributes( { gutter: value } );
	};

	const updateStyle = ( style ) => {
		const updatedClassName = replaceActiveStyle(
			attributes.className,
			activeStyle,
			style
		);

		setAttributes( { className: updatedClassName } );
	};

	const insertNewItem = () => {
		const blockOrder = getBlockOrder();
		const insertAtIndex = blockOrder.indexOf( clientId ) + 1;

		const newInnerBlocks = TEMPLATE.map( ( [ blockName, blockAttributes ] ) =>
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
			newInnerBlocks
		);

		insertBlock( newItem, insertAtIndex );
	};

	return (
		<>
			<Controls
				{ ...props }
				onChangeHeadingLevel={ onChangeHeadingLevel }
			/>
			<Inspector
				activeStyle={ activeStyle }
				attributes={ attributes }
				layoutOptions={ layoutOptions }
				onSetColumns={ setColumns }
				onSetGutter={ setGutter }
				onToggleImages={ toggleImages }
				onTogglePrices={ togglePrices }
				onUpdateStyle={ updateStyle }
			/>
			<div className={ classes }>
				<InnerBlocks
					__experimentalCaptureToolbars={ true }
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
					templateInsertUpdatesSelection={ false }
				/>
				{ isSelected &&
					<CustomAppender onClick={ insertNewItem } />
				}
			</div>
		</>
	);
};

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
		const {
			attributes,
			clientId,
			innerBlocks,
			insertBlock,
		} = ownProps;

		// This is a newly added block if we have zero innerBlocks. We want the TEMPLATE definition to be used in this case.
		if ( innerBlocks.length > 0 ) {
			const foodItemBlocksCount = innerBlocks.reduce( ( acc, cur ) => acc + ( cur.name === 'coblocks/food-item' ), 0 );

			// Add a new block if the count is less than the columns set.
			// We don't need a loop here because this will trigger a component update as soon as we insert a block (triggering this HOC again).
			if ( foodItemBlocksCount < attributes.columns ) {
				insertBlock(
					createBlock( 'coblocks/food-item', {
						showImage: attributes.showImages,
						showPrice: attributes.showPrices,
					} ),
					innerBlocks.length,
					clientId,
					false
				);
			}
		}

		return <WrappedComponent { ...ownProps } />;
	},

] )( FoodAndDrinksEdit );

/**
 * External dependencies.
 */
import { find } from 'lodash';
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import InspectorControls from './inspector';
import icons from './icons';
import HeadingToolbar from '../../components/heading-toolbar';
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import TokenList from '@wordpress/token-list';
import { createBlock } from '@wordpress/blocks';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { AlignmentToolbar, BlockControls, InnerBlocks } from '@wordpress/block-editor';
/**
 * Constants
 */
const ALLOWED_BLOCKS = [ 'coblocks/service-column' ];
const TEMPLATE = [ [ 'coblocks/service-column' ] ];

const layoutOptions = [
	{
		name: 'threebyfour',
		label: '4:3',
		icon: icons.service43,
		isDefault: true,
	},
	{
		name: 'sixbynine',
		label: '16:9',
		icon: icons.service169,
	},
	{
		name: 'square',
		label: __( 'Square', 'coblocks' ),
		icon: icons.serviceSquare,
	},
	{
		name: 'circle',
		label: __( 'Circle', 'coblocks' ),
		icon: icons.serviceCircle,
		defaultAlign: 'center',
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

const Edit = ( props ) => {
	const {	className, attributes, setAttributes, clientId } = props;

	const [ removedServiceColumns, setRemovedServiceColumns ] = useState( [] );

	const { updateBlockAttributes, insertBlock, removeBlock } = useDispatch( 'core/block-editor' );

	const { getBlocksByClientId, innerBlocks, isSelected } = useSelect(
		( select ) => {
			const {
				getBlockHierarchyRootClientId,
				getSelectedBlockClientId,
			} = select( 'core/block-editor' );

			// Get clientID of the parent block.
			const rootClientId = getBlockHierarchyRootClientId( clientId );
			const selectedRootClientId = getBlockHierarchyRootClientId( getSelectedBlockClientId() );

			return {
				getBlocksByClientId: select( 'core/block-editor' ).getBlocksByClientId,
				innerBlocks: select( 'core/block-editor' ).getBlocks( clientId ),
				isSelected: isSelected || rootClientId === selectedRootClientId,
			};
		} );

	const updateStyle = ( style ) => {
		const activeStyle = getActiveStyle( layoutOptions, className );
		const updatedClassName = replaceActiveStyle(
			attributes.className,
			activeStyle,
			style
		);

		setAttributes( { className: updatedClassName } );
	};

	const updateInnerAttributes = ( blockName, newAttributes ) => {
		const innerColumns = getBlocksByClientId( clientId )[ 0 ].innerBlocks;
		innerColumns.forEach( ( column ) => {
			const innerServiceItems = getBlocksByClientId( column.clientId )[ 0 ].innerBlocks;
			innerServiceItems.forEach( ( item ) => {
				if ( item.name === blockName ) {
					updateBlockAttributes(
						item.clientId,
						newAttributes
					);
				}
			} );
		} );
	};

	const onChangeAlignment = ( alignment ) => {
		setAttributes( { alignment } );
		updateInnerAttributes( 'coblocks/service', { alignment } );
	};

	const onChangeHeadingLevel = ( headingLevel ) => {
		setAttributes( { headingLevel } );
		updateInnerAttributes( 'coblocks/service', { headingLevel } );
	};

	const toggleCtas = () => {
		const buttons = ! attributes.buttons;
		setAttributes( { buttons } );

		updateInnerAttributes( 'coblocks/service', { showCta: buttons } );
	};

	const setColumns = ( value ) => {
		setAttributes( { columns: parseInt( value ) } );
	};

	/* istanbul ignore next */
	useEffect( () => {
		const activeStyle = getActiveStyle( layoutOptions, attributes.className );
		return () => {
			const lastActiveStyle = getActiveStyle(
				layoutOptions,
				attributes.className
			);

			if ( activeStyle !== lastActiveStyle ) {
				if ( 'circle' === activeStyle.name && ( typeof attributes.alignment === 'undefined' || attributes.alignment === 'none' ) ) {
					onChangeAlignment( 'center' );
				}
			}
		};
	}, [ attributes.className ] );

	// Add service-column when column count is increased.
	/* istanbul ignore next */
	useEffect( () => {
		if ( innerBlocks.length < attributes.columns ) {
		// Add a new service-column block if the count is less than the columns set.
			const { buttons, headingLevel, alignment } = attributes;

			const blockToInsert = () => {
				const removedBlock = removedServiceColumns?.[ 0 ];
				if ( ! removedBlock ) {
					return createBlock( 'coblocks/service-column', {
						showCta: buttons,
						headingLevel,
						alignment,
					} );
				}

				const shiftedRemovedServiceColumns = removedServiceColumns;
				shiftedRemovedServiceColumns.shift();

				setRemovedServiceColumns( shiftedRemovedServiceColumns );
				return removedBlock;
			};

			insertBlock(
				blockToInsert(),
				innerBlocks.length + 1,
				clientId,
				false,
			);
		}
	}, [ attributes.columns ] );

	// Remove service-column when column count is reduced.
	/* istanbul ignore next */
	useEffect( () => {
		if ( innerBlocks.length > attributes.columns ) {
			const targetBlock = innerBlocks[ innerBlocks.length - 1 ];
			if ( targetBlock ) {
				const unshiftedRemovedServiceColumns = removedServiceColumns;
				unshiftedRemovedServiceColumns.unshift( targetBlock );

				setRemovedServiceColumns( unshiftedRemovedServiceColumns );
				removeBlock( targetBlock.clientId, false );
			}
		}
	}, [ attributes.columns ] );

	const {
		alignment,
		columns,
	} = attributes;

	const classes = classnames(
		'has-columns', {
			[ `has-${ columns }-columns` ]: columns,
			'has-responsive-columns': columns > 1,
		}
	);

	const activeStyle = getActiveStyle( layoutOptions, className );

	return (
		<Fragment>
			<BlockControls>
				<HeadingToolbar
					minLevel={ 2 }
					maxLevel={ 6 }
					selectedLevel={ attributes.headingLevel }
					onChange={ onChangeHeadingLevel }
				/>
				<AlignmentToolbar
					value={ alignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>
			<InspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				activeStyle={ activeStyle }
				layoutOptions={ layoutOptions }
				onToggleCtas={ toggleCtas }
				onUpdateStyle={ updateStyle }
				onSetColumns={ setColumns }
			/>
			<div className={ className }>
				<GutterWrapper { ...attributes } >
					<div className={ classes }>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							orientation={ attributes.columns > 1 ? 'horizontal' : 'vertical' }
							templateInsertUpdatesSelection={ false }
							__experimentalCaptureToolbars={ true }
						/>
					</div>
				</GutterWrapper>
			</div>
		</Fragment>
	);
};

export default Edit;

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import InspectorControls from './inspector';
import HeadingToolbar from '../../components/heading-toolbar';
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';
import {
	SERVICE_ALLOWED_BLOCKS as ALLOWED_BLOCKS,
	SERVICE_TEMPLATE as TEMPLATE,
	replaceActiveStyle,
	getActiveStyle,
	layoutOptions,
} from './utilities';

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { AlignmentToolbar, BlockControls, InnerBlocks } from '@wordpress/block-editor';

const Edit = ( props ) => {
	const {	className, attributes, setAttributes, clientId } = props;

	const [ removedColumns, setRemovedColumns ] = useState( [] );

	const { updateBlockAttributes, insertBlock, removeBlock } = useDispatch( 'core/block-editor' );

	const { getBlocksByClientId, innerBlocks } = useSelect(
		( select ) => {
			return {
				getBlocksByClientId: select( 'core/block-editor' ).getBlocksByClientId,
				innerBlocks: select( 'core/block-editor' ).getBlocks( clientId ),
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

	/* istanbul ignore next */
	useEffect( () => {
		// Add service-column when column count is increased.
		if ( innerBlocks.length < attributes.columns ) {
			// Add a new service-column block if the count is less than the columns set.
			const blockToInsert = () => {
				const removedBlock = removedColumns?.[ 0 ];
				if ( ! removedBlock ) {
					return createBlock( 'coblocks/service-column' );
				}

				const shiftedRemovedColumns = removedColumns;
				shiftedRemovedColumns.shift();

				setRemovedColumns( shiftedRemovedColumns );
				return removedBlock;
			};

			insertBlock(
				blockToInsert(),
				innerBlocks.length + 1,
				clientId,
				false,
			);
		}

		// Remove service-column when column count is reduced.
		if ( innerBlocks.length > attributes.columns ) {
			const targetBlock = innerBlocks[ innerBlocks.length - 1 ];
			if ( targetBlock ) {
				const unshiftedRemovedColumns = removedColumns;
				unshiftedRemovedColumns.unshift( targetBlock );

				setRemovedColumns( unshiftedRemovedColumns );
				removeBlock( targetBlock.clientId, false );
			}
		}
	}, [ attributes.columns ] );

	const {	alignment, columns } = attributes;

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

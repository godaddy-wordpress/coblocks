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
	SERVICES_ALLOWED_BLOCKS as ALLOWED_BLOCKS,
	SERVICES_TEMPLATE as TEMPLATE,
	replaceActiveStyle,
	getActiveStyle,
	layoutOptions,
	isEmptyInnerBlocks,
	isEmpty,
} from './utilities';

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { AlignmentToolbar, BlockControls, InnerBlocks } from '@wordpress/block-editor';

const Edit = ( props ) => {
	const {	className, attributes, setAttributes, clientId } = props;

	const {	updateBlockAttributes, insertBlock, removeBlocks } = useDispatch( 'core/block-editor' );

	const innerServiceItems = useSelect( ( select ) => select( 'core/block-editor' ).getBlocks( clientId ), [] );

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
		innerServiceItems.forEach( ( item ) => {
			if ( item.name === blockName ) {
				updateBlockAttributes(
					item.clientId,
					newAttributes
				);
			}
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

	const setColumns = ( value ) => {
		setAttributes( { columns: parseInt( value ) } );
	};

	/* istanbul ignore next */
	useEffect( () => {
		const activeStyle = getActiveStyle( layoutOptions, attributes.className );

		// When circle style is set and alignment is not specified by user, than set center alignment
		if ( 'circle' === activeStyle.name && ( typeof attributes.alignment === 'undefined' || attributes.alignment === 'none' ) ) {
			onChangeAlignment( 'center' );
		}
	}, [ attributes.className ] );

	/* istanbul ignore next */
	useEffect( () => {
		// Handle add and removal of service block when column is changed.
		const { headingLevel, alignment } = props;

		handlePlaceholderPlacement( 'coblocks/service', {
			headingLevel,
			alignment,
		} );
	}, [ attributes.columns, innerServiceItems ] );

	/**
	 * Handle creation and removal of placeholder elements so that we always have one available to use.
	 *
	 * @param {string} blockName       The block to insert.
	 * @param {Object} blockAttributes The attributes for the placeholder block.
	 */
	const handlePlaceholderPlacement = ( blockName, blockAttributes = {} ) => {
		const filledServiceItems = innerServiceItems.filter(	( item ) => ( ! isEmpty( item.attributes ) || ! isEmptyInnerBlocks( item.innerBlocks ) ) );
		const placeholders = innerServiceItems.filter( ( item ) => isEmpty( item.attributes ) && isEmptyInnerBlocks( item.innerBlocks ) );

		// Remove trailing placeholders if there are more inner blocks than columns.
		// Should always be at least a single placeholder present.
		if ( placeholders.length + filledServiceItems.length > columns ) {
			removeBlocks(
				placeholders.filter( ( item, index ) => index !== 0 ).map( ( item ) => item.clientId ),
				false
			);
		}

		// Add a placeholder if there are none or if block count is less than columns.
		if ( placeholders.length === 0 || placeholders.length + filledServiceItems.length < columns ) {
			const newServiceItem = createBlock( blockName, blockAttributes );
			insertBlock(
				newServiceItem,
				innerServiceItems.length,
				clientId,
				false
			);
		}
	};

	const {	alignment, columns } = attributes;

	const classes = classnames(
		'has-columns', {
			[ `has-${ columns }-columns` ]: columns,
			'has-responsive-columns': columns > 1,
		}
	);

	const activeStyle = getActiveStyle( layoutOptions, className );
	return (
		<>
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
		</>
	);
};

export default Edit;

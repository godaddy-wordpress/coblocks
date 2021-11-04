/**
 * External dependencies
 */
import classnames from 'classnames';
import get from 'lodash/get';
import { RowIcon as icon } from '@godaddy-wordpress/coblocks-icons';
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import Controls from './controls';
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';
import Inspector from './inspector';
import rowIcons from './icons';
import { allowedBlocks, layoutOptions, template } from './utilities';
import { BackgroundClasses, BackgroundDropZone, BackgroundVideo } from '../../components/background';
import { createBlock, registerBlockVariation } from '@wordpress/blocks';

/**
 * WordPress dependencies
 */
import { isBlobURL } from '@wordpress/blob';
import { __, sprintf } from '@wordpress/i18n';
import { compose, usePrevious } from '@wordpress/compose';
import { useDispatch, withDispatch, withSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
// Disable reason: We choose to use unsafe APIs in our codebase.
// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import { __experimentalBlockVariationPicker, InnerBlocks } from '@wordpress/block-editor';
import { Button, ButtonGroup, Icon, Placeholder, Spinner, Tooltip } from '@wordpress/components';

/**
 * Block edit function
 *
 * @param {Object} props
 */
const Edit = ( props ) => {
	const {
		attributes,
		isSelected,
		setAttributes,
		className,
		variations,
		hasInnerBlocks,
		defaultVariation,
		replaceInnerBlocks,
		blockType,
		textColor,
		backgroundColor,
		clientId,
	} = props;

	const {
		columns,
		layout,
		id,
		backgroundImg,
		coblocks,
		paddingSize,
		marginSize,
		marginUnit,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		paddingUnit,
		paddingTop,
		backgroundType,
		hasParallax,
		focalPoint,
		paddingRight,
		paddingBottom,
		isStackedOnMobile,
		paddingLeft,
		verticalAlignment,
	} = attributes;

	const prevHasInnerBlocks = usePrevious( hasInnerBlocks );

	const [ layoutSelection, setLayoutSelection ] = useState( true );

	useEffect( () => {
		// Store the selected innerBlocks layout in state so that undo and redo functions work properly.
		if ( prevHasInnerBlocks && ! hasInnerBlocks ) {
			setLayoutSelection( true );
			setAttributes( { columns: null, layout: null } );
		}
	}, [ hasInnerBlocks, prevHasInnerBlocks ] );

	const numberToText = ( newColumns ) => {
		if ( newColumns === 1 ) {
			return __( 'one', 'coblocks' );
		} else if ( newColumns === 2 ) {
			return __( 'two', 'coblocks' );
		} else if ( newColumns === 3 ) {
			return __( 'three', 'coblocks' );
		} else if ( newColumns === 4 ) {
			return __( 'four', 'coblocks' );
		}
	};

	const createBlocksFromInnerBlocksTemplate = ( innerBlocksTemplate ) => {
		return map( innerBlocksTemplate, ( [ name, newAttributes, innerBlocks = [] ] ) => createBlock( name, newAttributes, createBlocksFromInnerBlocksTemplate( innerBlocks ) ) );
	};

	const supportsBlockVariationPicker = () => {
		return !! registerBlockVariation;
	};

	const dropZone = (
		<BackgroundDropZone
			{ ...props }
			label={ __( 'Add background to row', 'coblocks' ) }
		/>
	);

	const columnOptions = [
		{ columns: 1, icon: rowIcons.colOne, key: '100', name: __( 'One column', 'coblocks' ) },
		{ columns: 2, icon: rowIcons.colTwo, name: __( 'Two columns', 'coblocks' ) },
		{ columns: 3, icon: rowIcons.colThree, name: __( 'Three columns', 'coblocks' ) },
		{ columns: 4, icon: rowIcons.colFour, name: __( 'Four columns', 'coblocks' ) },
	];

	let selectedRows = 1;

	if ( columns ) {
		selectedRows = parseInt( columns.toString().split( '-' ) );
	}

	if ( ! layout && layoutSelection && ! supportsBlockVariationPicker() ) {
		return (
			<>
				{ isSelected && (
					<Controls
						{ ...props }
					/>
				) }
				{ isSelected && (
					<Inspector
						{ ...props }
					/>
				) }
				<Placeholder
					className="components-coblocks-row-placeholder"
					icon={ <Icon icon={ icon } /> }
					instructions={ columns
						? sprintf(
							/* translators: %s: 'one' 'two' 'three' and 'four' */
							__( 'Select a layout for this %s column row.', 'coblocks' ),
							numberToText( columns )
						)
						: __( 'Select the number of columns for this row.', 'coblocks' )
					}
					key="placeholder"
					label={ columns ? __( 'Row layout', 'coblocks' ) : __( 'Row', 'coblocks' ) }
				>
					{ ! columns
						? <ButtonGroup aria-label={ __( 'Select row columns', 'coblocks' ) } className="block-editor-inner-blocks__template-picker-options block-editor-block-pattern-picker__patterns">
							{ map( columnOptions, ( option ) => (
								<Tooltip text={ option.name }>
									<div className="components-coblocks-row-placeholder__button-wrapper">
										<Button
											className="components-coblocks-row-placeholder__button block-editor-inner-blocks__template-picker-option block-editor-block-pattern-picker__pattern"
											isSecondary
											onClick={ () => {
												setAttributes( {
													columns: option.columns,
													layout: option.columns === 1 ? option.key : null,
												} );

												if ( option.columns === 1 ) {
													setLayoutSelection( false );
												}
											} }
										>
											{ option.icon }
										</Button>
									</div>
								</Tooltip>
							) ) }
						</ButtonGroup>
						: <>
							<ButtonGroup aria-label={ __( 'Select row layout', 'coblocks' ) } className="block-editor-inner-blocks__template-picker-options block-editor-block-pattern-picker__patterns">
								<Button
									className="components-coblocks-row-placeholder__back"
									icon="exit"
									label={ __( 'Back to columns', 'coblocks' ) }
									onClick={ () => {
										setAttributes( {
											columns: null,
										} );
										setLayoutSelection( true );
									} }
								/>
								{ map( layoutOptions[ selectedRows ], ( option ) => (
									<Tooltip text={ option.name }>
										<div className="components-coblocks-row-placeholder__button-wrapper">
											<Button
												className="components-coblocks-row-placeholder__button block-editor-inner-blocks__template-picker-option block-editor-block-pattern-picker__pattern"
												isSecondary
												key={ option.key }
												onClick={ () => {
													setAttributes( {
														layout: option.key,
													} );
													setLayoutSelection( false );
												} }
											>
												{ option.icon }
											</Button>
										</div>
									</Tooltip>
								) ) }
							</ButtonGroup>
						</>
					}
				</Placeholder>
			</>
		);
	}

	let classes = classnames(
		className, {
			[ `coblocks-row--${ id }` ]: id,
		}
	);

	if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
		classes = classnames( classes, `coblocks-row-${ coblocks.id }` );
	}

	const innerClasses = classnames(
		'wp-block-coblocks-row__inner',
		...BackgroundClasses( attributes ), {
			'has-margin': marginSize && marginSize !== 'no',
			'has-padding': paddingSize && paddingSize !== 'no',
			'has-text-color': textColor.color,
			[ `has-${ paddingSize }-padding` ]: ! [ 'no', 'advanced' ].includes( paddingSize ),
			[ `has-${ marginSize }-margin` ]: ! [ 'no', 'advanced' ].includes( marginSize ),
			'is-stacked-on-mobile': isStackedOnMobile,
			[ `are-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
		}
	);

	const innerStyles = {
		backgroundColor: backgroundColor.color,
		backgroundImage: backgroundImg && backgroundType === 'image' ? `url(${ backgroundImg })` : undefined,
		backgroundPosition: focalPoint && ! hasParallax ? `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%` : undefined,
		color: textColor.color,
		marginBottom: marginSize === 'advanced' && marginBottom ? marginBottom + marginUnit : undefined,
		marginLeft: marginSize === 'advanced' && marginLeft ? marginLeft + marginUnit : undefined,
		marginRight: marginSize === 'advanced' && marginRight ? marginRight + marginUnit : undefined,
		marginTop: marginSize === 'advanced' && marginTop ? marginTop + marginUnit : undefined,
		paddingBottom: paddingSize === 'advanced' && paddingBottom ? paddingBottom + paddingUnit : undefined,
		paddingLeft: paddingSize === 'advanced' && paddingLeft ? paddingLeft + paddingUnit : undefined,
		paddingRight: paddingSize === 'advanced' && paddingRight ? paddingRight + paddingUnit : undefined,
		paddingTop: paddingSize === 'advanced' && paddingTop ? paddingTop + paddingUnit : undefined,
	};

	if ( hasInnerBlocks || !! layout ) {
		const deprecatedInnerBlocks = () => (
			<InnerBlocks
				allowedBlocks={ allowedBlocks }
				renderAppender={ () => null }
				template={ template[ layout ] }
				templateInsertUpdatesSelection={ columns === 1 }
				templateLock="all"
			/>
		);

		const variationInnerBlocks = () => (
			<InnerBlocks
				allowedBlocks={ allowedBlocks }
				renderAppender={ () => null }
				templateInsertUpdatesSelection={ columns === 1 }
				templateLock="all" />
		);

		return (
			<>
				{ dropZone }
				{ isSelected && (
					<Controls
						{ ...props }
					/>
				) }
				{ isSelected && (
					<Inspector
						{ ...props }
					/>
				) }
				<div className={ classes }>
					{ isBlobURL( backgroundImg ) && <Spinner /> }
					<GutterWrapper { ...attributes }>
						<div className={ innerClasses } style={ innerStyles }>
							{ BackgroundVideo( attributes ) }
							{ supportsBlockVariationPicker()
								? variationInnerBlocks()
								: deprecatedInnerBlocks() }
						</div>
					</GutterWrapper>
				</div>
			</>
		);
	}

	const blockVariationPickerOnSelect = ( nextVariation = defaultVariation ) => {
		if ( nextVariation.attributes ) {
			setAttributes( nextVariation.attributes );
		}

		if ( nextVariation.innerBlocks ) {
			replaceInnerBlocks(
				clientId,
				createBlocksFromInnerBlocksTemplate( nextVariation.innerBlocks )
			);
		}
	};

	return (
		<>
			<__experimentalBlockVariationPicker
				allowSkip
				icon={ get( blockType, [ 'icon', 'src' ] ) }
				instructions={ __( 'Select a variation to start with.', 'coblocks' ) }
				label={ get( blockType, [ 'title' ] ) }
				onSelect={ ( nextVariation ) => blockVariationPickerOnSelect( nextVariation ) }
				variations={ variations }
			/>
		</>
	);
};

const applyWithDispatch = withDispatch( ( dispatch ) => {
	const { updateBlockAttributes } = dispatch( 'core/block-editor' );

	return {
		updateBlockAttributes, // passed to controls & inspector
	};
} );

const applyWithSelect = withSelect( ( select, props ) => {
	const { getBlocks, getBlocksByClientId } = select( 'core/block-editor' );
	const { getBlockType, getBlockVariations, getDefaultBlockVariation } = select( 'core/blocks' );
	const innerBlocks = getBlocks( props.clientId );
	const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );

	return {
		blockType: getBlockType( props.name ),
		defaultVariation: typeof getDefaultBlockVariation === 'undefined' ? null : getDefaultBlockVariation( props.name ),
		getBlocksByClientId, // passed to controls & inspector
		hasInnerBlocks: select( 'core/block-editor' ).getBlocks( props.clientId ).length > 0,
		// Subscribe to changes of the innerBlocks to control the display of the layout selection placeholder.
		innerBlocks,
		replaceInnerBlocks,
		variations: typeof getBlockVariations === 'undefined' ? null : getBlockVariations( props.name ),
	};
} );

export default compose( applyWithColors, applyWithSelect, applyWithDispatch )( Edit );

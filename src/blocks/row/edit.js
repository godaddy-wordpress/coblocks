/**
 * External dependencies
 */
import classnames from 'classnames';
import get from 'lodash/get';
import { RowIcon as icon } from '@godaddy-wordpress/coblocks-icons';
import map from 'lodash/map';

/**
 * WordPress dependencies
 */
import { isBlobURL } from '@wordpress/blob';
import { __, sprintf } from '@wordpress/i18n';
import { Button, ButtonGroup, Icon, Placeholder, Spinner, Tooltip } from '@wordpress/components';
import { compose, usePrevious } from '@wordpress/compose';
import { lazy, useEffect, useState } from '@wordpress/element';
import { useDispatch, withDispatch, withSelect } from '@wordpress/data';
// Disable reason: We choose to use unsafe APIs in our codebase.
// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import { __experimentalBlockVariationPicker, InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
const Inspector = lazy( () => import( './inspector' ) );
import applyWithColors from './colors';
import Controls from './controls';
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';
import InspectorLoader from '../../components/inspector-loader';
import rowIcons from './icons';
import { allowedBlocks, layoutOptions, template } from './utilities';
import { BackgroundClasses, BackgroundDropZone, BackgroundVideo } from '../../components/background';
import { createBlock, registerBlockVariation } from '@wordpress/blocks';

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

	const { __unstableMarkNextChangeAsNotPersistent } = useDispatch( 'core/block-editor' );

	useEffect( () => {
		// Store the selected innerBlocks layout in state so that undo and redo functions work properly.
		if ( prevHasInnerBlocks && ! hasInnerBlocks ) {
			__unstableMarkNextChangeAsNotPersistent();
			setLayoutSelection( true );
			setAttributes( { layout: null, columns: null } );
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
		{ columns: 1, name: __( 'One column', 'coblocks' ), icon: rowIcons.colOne, key: '100' },
		{ columns: 2, name: __( 'Two columns', 'coblocks' ), icon: rowIcons.colTwo },
		{ columns: 3, name: __( 'Three columns', 'coblocks' ), icon: rowIcons.colThree },
		{ columns: 4, name: __( 'Four columns', 'coblocks' ), icon: rowIcons.colFour },
	];

	let selectedRows = 1;

	if ( columns ) {
		selectedRows = parseInt( columns.toString().split( '-' ) );
	}

	if ( ! layout && layoutSelection && ! supportsBlockVariationPicker() ) {
		return (
			<>
				{ isSelected && (
					<>
						<Controls { ...props } />
						<InspectorLoader>
							<Inspector { ...props } />
						</InspectorLoader>
					</>
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
												__unstableMarkNextChangeAsNotPersistent();
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
										__unstableMarkNextChangeAsNotPersistent();
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
													__unstableMarkNextChangeAsNotPersistent();
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
			'has-text-color': textColor.color,
			'has-padding': paddingSize && paddingSize !== 'no',
			[ `has-${ paddingSize }-padding` ]: paddingSize && paddingSize !== 'advanced',
			'has-margin': marginSize && marginSize !== 'no',
			[ `has-${ marginSize }-margin` ]: marginSize && marginSize !== 'advanced',
			'is-stacked-on-mobile': isStackedOnMobile,
			[ `are-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
		}
	);

	const innerStyles = {
		backgroundColor: backgroundColor.color,
		backgroundImage: backgroundImg && backgroundType === 'image' ? `url(${ backgroundImg })` : undefined,
		backgroundPosition: focalPoint && ! hasParallax ? `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%` : undefined,
		color: textColor.color,
		paddingTop: paddingSize === 'advanced' && paddingTop ? paddingTop + paddingUnit : undefined,
		paddingRight: paddingSize === 'advanced' && paddingRight ? paddingRight + paddingUnit : undefined,
		paddingBottom: paddingSize === 'advanced' && paddingBottom ? paddingBottom + paddingUnit : undefined,
		paddingLeft: paddingSize === 'advanced' && paddingLeft ? paddingLeft + paddingUnit : undefined,
		marginTop: marginSize === 'advanced' && marginTop ? marginTop + marginUnit : undefined,
		marginRight: marginSize === 'advanced' && marginRight ? marginRight + marginUnit : undefined,
		marginBottom: marginSize === 'advanced' && marginBottom ? marginBottom + marginUnit : undefined,
		marginLeft: marginSize === 'advanced' && marginLeft ? marginLeft + marginUnit : undefined,
	};

	if ( hasInnerBlocks || !! layout ) {
		const deprecatedInnerBlocks = () => (
			<InnerBlocks
				allowedBlocks={ allowedBlocks }
				renderAppender={ () => ( null ) }
				template={ template[ layout ] }
				templateInsertUpdatesSelection={ columns === 1 }
				templateLock="all"
			/>
		);

		const variationInnerBlocks = () => (
			<InnerBlocks
				allowedBlocks={ allowedBlocks }
				renderAppender={ () => ( null ) }
				templateInsertUpdatesSelection={ columns === 1 }
				templateLock="all" />
		);

		return (
			<>
				{ dropZone }
				{ isSelected && (
					<>
						<Controls { ...props } />
						<InspectorLoader>
							<Inspector { ...props } />
						</InspectorLoader>
					</>
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
		__unstableMarkNextChangeAsNotPersistent();

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
		// Subscribe to changes of the innerBlocks to control the display of the layout selection placeholder.
		innerBlocks,
		hasInnerBlocks: select( 'core/block-editor' ).getBlocks( props.clientId ).length > 0,

		blockType: getBlockType( props.name ),
		defaultVariation: typeof getDefaultBlockVariation === 'undefined' ? null : getDefaultBlockVariation( props.name ),
		variations: typeof getBlockVariations === 'undefined' ? null : getBlockVariations( props.name ),
		replaceInnerBlocks,

		getBlocksByClientId, // passed to controls & inspector
	};
} );

export default compose( applyWithColors, applyWithSelect, applyWithDispatch )( Edit );

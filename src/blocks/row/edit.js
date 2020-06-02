/**
 * External dependencies
 */
import classnames from 'classnames';
import map from 'lodash/map';
import get from 'lodash/get';

/**
 * Internal dependencies
 */
import { template, allowedBlocks, layoutOptions } from './utilities';
import Inspector from './inspector';
import Controls from './controls';
import applyWithColors from './colors';
import rowIcons from './icons';
import { createBlock, registerBlockVariation } from '@wordpress/blocks';
import { BackgroundClasses, BackgroundDropZone, BackgroundVideo } from '../../components/background';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect, useDispatch, withDispatch } from '@wordpress/data';
import { BlockIcon, InnerBlocks, __experimentalBlockVariationPicker } from '@wordpress/block-editor';
import { ButtonGroup, Button, IconButton, Tooltip, Placeholder, Spinner } from '@wordpress/components';
import { isBlobURL } from '@wordpress/blob';

/**
 * Block edit function
 */
class Edit extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			layoutSelection: true,
		};
	}

	componentDidUpdate( prevProps ) {
		const { setAttributes, hasInnerBlocks } = this.props;
		// Store the selected innerBlocks layout in state so that undo and redo functions work properly.
		if ( prevProps.hasInnerBlocks && ! hasInnerBlocks ) {
			this.setState( { layoutSelection: true } );
			setAttributes( { layout: null, columns: null } );
		}
	}

	numberToText( columns ) {
		if ( columns === 1 ) {
			return __( 'one', 'coblocks' );
		} else if ( columns === 2 ) {
			return __( 'two', 'coblocks' );
		} else if ( columns === 3 ) {
			return __( 'three', 'coblocks' );
		} else if ( columns === 4 ) {
			return __( 'four', 'coblocks' );
		}
	}

	createBlocksFromInnerBlocksTemplate( innerBlocksTemplate ) {
		return map( innerBlocksTemplate, ( [ name, attributes, innerBlocks = [] ] ) => createBlock( name, attributes, this.createBlocksFromInnerBlocksTemplate( innerBlocks ) ) );
	}

	supportsBlockVariationPicker() {
		return !! registerBlockVariation;
	}

	render() {
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
		} = this.props;

		const {
			columns,
			layout,
			id,
			backgroundImg,
			coblocks,
			gutter,
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

		const dropZone = (
			<BackgroundDropZone
				{ ...this.props }
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

		if ( ! layout && this.state.layoutSelection && ! this.supportsBlockVariationPicker() ) {
			return (
				<Fragment>
					{ isSelected && (
						<Controls
							{ ...this.props }
						/>
					) }
					{ isSelected && (
						<Inspector
							{ ...this.props }
						/>
					) }
					<Placeholder
						key="placeholder"
						className="components-coblocks-row-placeholder"
						icon={ <BlockIcon icon={ columns ? rowIcons.layout : rowIcons.row } /> }
						label={ columns ? __( 'Row layout', 'coblocks' ) : __( 'Row', 'coblocks' ) }
						instructions={ columns ?
							sprintf(
								/* translators: %s: 'one' 'two' 'three' and 'four' */
								__( 'Select a layout for this %s column row.', 'coblocks' ),
								this.numberToText( columns )
							) :
							__( 'Select the number of columns for this row.', 'coblocks' )
						}
					>
						{ ! columns ?
							<ButtonGroup aria-label={ __( 'Select row columns', 'coblocks' ) } className="block-editor-inner-blocks__template-picker-options block-editor-block-pattern-picker__patterns">
								{ map( columnOptions, ( option ) => (
									<Tooltip text={ option.name }>
										<div className="components-coblocks-row-placeholder__button-wrapper">
											<Button
												className="components-coblocks-row-placeholder__button block-editor-inner-blocks__template-picker-option block-editor-block-pattern-picker__pattern"
												isLarge
												isSecondary
												onClick={ () => {
													setAttributes( {
														columns: option.columns,
														layout: option.columns === 1 ? option.key : null,
													} );

													if ( option.columns === 1 ) {
														this.setState( { layoutSelection: false } );
													}
												} }
											>
												{ option.icon }
											</Button>
										</div>
									</Tooltip>
								) ) }
							</ButtonGroup> :
							<Fragment>
								<ButtonGroup aria-label={ __( 'Select row layout', 'coblocks' ) } className="block-editor-inner-blocks__template-picker-options block-editor-block-pattern-picker__patterns">
									<IconButton
										icon="exit"
										className="components-coblocks-row-placeholder__back"
										onClick={ () => {
											setAttributes( {
												columns: null,
											} );
											this.setState( { layoutSelection: true } );
										} }
										label={ __( 'Back to columns', 'coblocks' ) }
									/>
									{ map( layoutOptions[ selectedRows ], ( { name, key, icon } ) => (
										<Tooltip text={ name }>
											<div className="components-coblocks-row-placeholder__button-wrapper">
												<Button
													key={ key }
													className="components-coblocks-row-placeholder__button block-editor-inner-blocks__template-picker-option block-editor-block-pattern-picker__pattern"
													isLarge
													isSecondary
													onClick={ () => {
														setAttributes( {
															layout: key,
														} );
														this.setState( { layoutSelection: false } );
													} }
												>
													{ icon }
												</Button>
											</div>
										</Tooltip>
									) ) }
								</ButtonGroup>
							</Fragment>
						}
					</Placeholder>
				</Fragment>
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
				'has-text-color': this.props.textColor.color,
				[ `has-${ gutter }-gutter` ]: gutter,
				'has-padding': paddingSize && paddingSize !== 'no',
				[ `has-${ paddingSize }-padding` ]: paddingSize && paddingSize !== 'advanced',
				'has-margin': marginSize && marginSize !== 'no',
				[ `has-${ marginSize }-margin` ]: marginSize && marginSize !== 'advanced',
				'is-stacked-on-mobile': isStackedOnMobile,
				[ `are-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
			}
		);

		const innerStyles = {
			backgroundColor: this.props.backgroundColor.color,
			backgroundImage: backgroundImg && backgroundType === 'image' ? `url(${ backgroundImg })` : undefined,
			backgroundPosition: focalPoint && ! hasParallax ? `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%` : undefined,
			color: this.props.textColor.color,
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
					template={ template[ layout ] }
					templateLock="all"
					allowedBlocks={ allowedBlocks }
					templateInsertUpdatesSelection={ columns === 1 }
					renderAppender={ () => ( null ) }
				/>
			);

			const variationInnerBlocks = () => (
				<InnerBlocks
					allowedBlocks={ allowedBlocks }
					templateInsertUpdatesSelection={ columns === 1 }
					renderAppender={ () => ( null ) }
					templateLock="all" />
			);

			return (
				<Fragment>
					{ dropZone }
					{ isSelected && (
						<Controls
							{ ...this.props }
						/>
					) }
					{ isSelected && (
						<Inspector
							{ ...this.props }
						/>
					) }
					<div className={ classes }>
						{ isBlobURL( backgroundImg ) && <Spinner /> }
						<div className={ innerClasses } style={ innerStyles }>
							{ BackgroundVideo( attributes ) }
							{ this.supportsBlockVariationPicker() ?
								variationInnerBlocks() :
								deprecatedInnerBlocks() }
						</div>
					</div>
				</Fragment>
			);
		}

		const blockVariationPickerOnSelect = ( nextVariation = defaultVariation ) => {
			if ( nextVariation.attributes ) {
				this.props.setAttributes( nextVariation.attributes );
			}

			if ( nextVariation.innerBlocks ) {
				replaceInnerBlocks(
					this.props.clientId,
					this.createBlocksFromInnerBlocksTemplate( nextVariation.innerBlocks )
				);
			}
		};

		return (
			<Fragment>
				<__experimentalBlockVariationPicker
					icon={ get( blockType, [ 'icon', 'src' ] ) }
					label={ get( blockType, [ 'title' ] ) }
					instructions={ __( 'Select a variation to start with.', 'coblocks' ) }
					variations={ variations }
					allowSkip
					onSelect={ ( nextVariation ) => blockVariationPickerOnSelect( nextVariation ) }
				/>
			</Fragment>
		);
	}
}

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

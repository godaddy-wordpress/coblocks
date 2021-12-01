/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { withSelect } from '@wordpress/data';
import { hasBlockSupport } from '@wordpress/blocks';
import { ToggleControl } from '@wordpress/components';
import { Fragment, useEffect } from '@wordpress/element';
import { InspectorAdvancedControls } from '@wordpress/block-editor';
import { compose, createHigherOrderComponent } from '@wordpress/compose';

const blocksWithSpacingSupport = [
	'core/image',
	'core/gallery',
	'core/spacer',
	'core/cover',
	'core/group',
];

/**
 * Filters registered block settings, extending attributes with settings
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Filtered block settings.
 */
function addAttributes( settings ) {
	// Add custom attribute
	if ( hasBlockSupport( settings, 'stackedOnMobile' ) ) {
		if ( typeof settings.attributes !== 'undefined' ) {
			if ( ! settings.attributes.isStackedOnMobile ) {
				settings.attributes = Object.assign( settings.attributes, {
					isStackedOnMobile: {
						type: 'boolean',
						default: true,
					},
				} );
			}
		}
	}

	//Add CoBlocks spacing support
	if ( blocksWithSpacingSupport.includes( settings.name ) ) {
		if ( ! settings.supports ) {
			settings.supports = {};
		}
		settings.supports = Object.assign( settings.supports, {
			coBlocksSpacing: true,
		} );
	}

	if ( hasBlockSupport( settings, 'coBlocksSpacing' ) ) {
		if ( typeof settings.attributes !== 'undefined' ) {
			if ( ! settings.attributes.noBottomMargin ) {
				settings.attributes = Object.assign( settings.attributes, {
					noBottomMargin: {
						type: 'boolean',
						default: false,
					},
				} );
			}
			if ( ! settings.attributes.noTopMargin ) {
				settings.attributes = Object.assign( settings.attributes, {
					noTopMargin: {
						type: 'boolean',
						default: false,
					},
				} );
			}
		}
	}

	return settings;
}

/**
 * Add custom CoBlocks attributes to selected blocks
 *
 * @param {Function} BlockEdit Original component.
 * @return {string} Wrapped component.
 */
const withAdvancedControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { name, clientId, attributes, setAttributes, isSelected } = props;

		const { isStackedOnMobile, noBottomMargin, noTopMargin } = attributes;

		const hasStackedControl = hasBlockSupport( name, 'stackedOnMobile' );
		const withBlockSpacing = hasBlockSupport( name, 'coBlocksSpacing' );

		const handleMargins = ( target ) => {
			if ( ! target.querySelector ) {
				return;
			}

			const innerAlignmentBlock = target.querySelector( '.wp-block[data-align]' );
			const setInnerAlignmentBlock = ( margin, val ) => {
				if ( !! innerAlignmentBlock ) {
					innerAlignmentBlock.style[ margin ] = val;
				}
			};
			switch ( target.outerHTML.includes( 'data-coblocks-bottom-spacing' ) ) {
				case true:
					target.style.marginBottom = 0;
					setInnerAlignmentBlock( 'marginBottom', 0 );
					break;
				case false:
					target.style.marginBottom = null;
					setInnerAlignmentBlock( 'marginBottom', null );
					break;
			}
			switch ( target.outerHTML.includes( 'data-coblocks-top-spacing' ) ) {
				case true:
					target.style.marginTop = 0;
					setInnerAlignmentBlock( 'marginTop', 0 );
					break;
				case false:
					target.style.marginTop = null;
					setInnerAlignmentBlock( 'marginTop', null );

					break;
			}
		};

		useEffect( ( ) => {
			// Check if alignment wrapper has been applied - Gutenberg 8.2.1
			if ( !! document.getElementsByClassName( 'block-editor-block-list__layout is-root-container' ).length ) {
				const targetElems = document.querySelectorAll( '.block-editor-block-list__layout' );
				targetElems.forEach( ( elem ) => {
					elem.childNodes.forEach( ( child ) => {
						handleMargins( child );
					} );
				} );
			}
		}, [ noBottomMargin, noTopMargin ] );

		const hasAdvancedControl = !! hasStackedControl || !! withBlockSpacing;

		return (
			<Fragment>
				<BlockEdit { ...props } />
				{ isSelected && hasAdvancedControl && (
					<InspectorAdvancedControls>
						{ hasStackedControl && (
							<ToggleControl
								label={ __( 'Stack on mobile', 'coblocks' ) }
								checked={ !! isStackedOnMobile }
								onChange={ () =>
									setAttributes( { isStackedOnMobile: ! isStackedOnMobile } )
								}
								help={
									!! isStackedOnMobile
										? __( 'Responsiveness is enabled.', 'coblocks' )
										: __(
											'Toggle to stack elements on top of each other on smaller viewports.', 'coblocks'
										)
								}
							/>
						) }
						{ withBlockSpacing && (
							<ToggleControl
								label={ __( 'Remove top spacing', 'coblocks' ) }
								checked={ !! noTopMargin }
								onChange={ () =>
									setAttributes( {
										noTopMargin: ! noTopMargin,
										marginTop: 0,
										marginTopTablet: 0,
										marginTopMobile: 0,
									} )
								}
								help={ !! noTopMargin ? __( 'Toggle to add top margin back.', 'coblocks' ) : __( 'Toggle to remove any top margin.', 'coblocks' ) }
							/>
						) }
						{ withBlockSpacing && (
							<ToggleControl
								label={ __( 'Remove bottom spacing', 'coblocks' ) }
								checked={ !! noBottomMargin }
								onChange={ () => {
									setAttributes( {
										noBottomMargin: ! noBottomMargin,
										marginBottom: 0,
										marginBottomTablet: 0,
										marginBottomMobile: 0,
									} );

									const nextBlockClientId = wp.data
										.select( 'core/block-editor' )
										.getNextBlockClientId( clientId );
									if ( nextBlockClientId && ! noBottomMargin ) {
										wp.data
											.dispatch( 'core/block-editor' ).updateBlockAttributes( nextBlockClientId, {
												noTopMargin: ! noTopMargin,
												marginTop: 0,
												marginTopTablet: 0,
												marginTopMobile: 0,
											} );
									}
								} }
								help={ !! noBottomMargin ? __( 'Toggle to add bottom margin back.', 'coblocks' ) : __( 'Toggle to remove any bottom margin.', 'coblocks' ) }
							/>
						) }
					</InspectorAdvancedControls>
				) }
			</Fragment>
		);
	};
}, 'withAdvancedControls' );

/**
 * Override props assigned to save component to inject attributes
 *
 * @param {Object} extraProps Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 * @return {Object} Filtered props applied to save element.
 */
function applySpacingClass( extraProps, blockType, attributes ) {
	const withBlockSpacing = hasBlockSupport( blockType.name, 'coBlocksSpacing' );

	if ( withBlockSpacing ) {
		const { noBottomMargin, noTopMargin } = attributes;

		if ( typeof noBottomMargin !== 'undefined' && noBottomMargin ) {
			extraProps.className = classnames( extraProps.className, 'mb-0' );
		}

		if ( typeof noTopMargin !== 'undefined' && noTopMargin ) {
			extraProps.className = classnames( extraProps.className, 'mt-0' );
		}
	}

	return extraProps;
}

/**
 * Override the default block element to add wrapper props.
 *
 * @param {Function} BlockListBlock Original component
 * @return {Function} Wrapped component
 */

const enhance = compose(
	/**
	 * For blocks whose block type doesn't support `multiple`, provides the
	 * wrapped component with `originalBlockClientId` -- a reference to the
	 * first block of the same type in the content -- if and only if that
	 * "original" block is not the current one. Thus, an inexisting
	 * `originalBlockClientId` prop signals that the block is valid.
	 *
	 * @param {Function} WrappedBlockEdit A filtered BlockEdit instance.
	 * @return {Function} Enhanced component with merged state data props.
	 */
	withSelect( ( select ) => {
		return {
			selected: select( 'core/block-editor' ).getSelectedBlock(),
			select,
		};
	} ),
);

const addEditorBlockAttributes = createHigherOrderComponent( ( BlockListBlock ) => {
	return enhance( ( { select, ...props } ) => {
		let wrapperProps = props.wrapperProps;
		let customData = {};

		const block = select( 'core/block-editor' ).getBlock( props.rootClientId || props.clientId );
		const blockName = select( 'core/block-editor' ).getBlockName( props.rootClientId || props.clientId );

		const withBlockSpacing = hasBlockSupport( blockName, 'coBlocksSpacing' );
		let withAlignSupport = hasBlockSupport( blockName, 'align' );

		if ( [ 'core/image' ].includes( blockName ) ) {
			withAlignSupport = true;
		}

		if ( withBlockSpacing && block?.attributes ) {
			const { noBottomMargin, noTopMargin } = block.attributes;

			if ( typeof noTopMargin !== 'undefined' && noTopMargin ) {
				customData = Object.assign( customData, {
					'data-coblocks-top-spacing': 1,
				} );
			}

			if ( typeof noBottomMargin !== 'undefined' && noBottomMargin ) {
				customData = Object.assign( customData, {
					'data-coblocks-bottom-spacing': 1,
				} );
			}
		}

		if ( withAlignSupport ) {
			customData = Object.assign( customData, {
				'data-coblocks-align-support': 1,
			} );
		}

		if ( withBlockSpacing || withAlignSupport ) {
			wrapperProps = {
				...wrapperProps,
				...customData,
			};
		}

		return <BlockListBlock { ...props } wrapperProps={ wrapperProps } />;
	} );
}, 'addEditorBlockAttributes' );

addFilter(
	'blocks.registerBlockType',
	'coblocks/AdvancedControls/attributes',
	addAttributes
);

addFilter( 'editor.BlockEdit', 'coblocks/advanced', withAdvancedControls );

addFilter(
	'blocks.getSaveContent.extraProps',
	'coblocks/applySpacingClass',
	applySpacingClass
);

addFilter(
	'editor.BlockListBlock',
	'coblocks/addEditorBlockAttributes',
	addEditorBlockAttributes
);

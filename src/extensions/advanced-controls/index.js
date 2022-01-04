/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { hasBlockSupport } from '@wordpress/blocks';
import { InspectorAdvancedControls } from '@wordpress/block-editor';
import { ToggleControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { dispatch, select } from '@wordpress/data';

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
function applyAttributes( settings ) {
	// Add custom attribute
	if ( hasBlockSupport( settings, 'stackedOnMobile' ) ) {
		if ( typeof settings.attributes !== 'undefined' ) {
			if ( ! settings.attributes.isStackedOnMobile ) {
				settings.attributes = Object.assign( settings.attributes, {
					isStackedOnMobile: {
						default: true,
						type: 'boolean',
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
						default: false,
						type: 'boolean',
					},
				} );
			}
			if ( ! settings.attributes.noTopMargin ) {
				settings.attributes = Object.assign( settings.attributes, {
					noTopMargin: {
						default: false,
						type: 'boolean',
					},
				} );
			}
		}
	}

	return settings;
}

/**
 * React hook function to extend the block editor with custom controls.
 *
 * @function useAdvancedControls
 * @param {Object} props Block props object.
 * @return {string} Conditionally rendered block controls.
 */
const useAdvancedControls = ( props ) => {
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

	return isSelected && hasAdvancedControl ? (
		<InspectorAdvancedControls>
			{ hasStackedControl && (
				<ToggleControl
					checked={ !! isStackedOnMobile }
					help={
						!! isStackedOnMobile
							? __( 'Responsiveness is enabled.', 'coblocks' )
							: __(
								'Toggle to stack elements on top of each other on smaller viewports.', 'coblocks'
							)
					}
					label={ __( 'Stack on mobile', 'coblocks' ) }
					onChange={ () =>
						setAttributes( { isStackedOnMobile: ! isStackedOnMobile } )
					}
				/>
			) }
			{ withBlockSpacing && (
				<ToggleControl
					checked={ !! noTopMargin }
					help={ !! noTopMargin ? __( 'Toggle to add top margin back.', 'coblocks' ) : __( 'Toggle to remove any top margin.', 'coblocks' ) }
					label={ __( 'Remove top spacing', 'coblocks' ) }
					onChange={ () =>
						setAttributes( {
							marginTop: 0,
							marginTopMobile: 0,
							marginTopTablet: 0,
							noTopMargin: ! noTopMargin,

						} )
					}
				/>
			) }
			{ withBlockSpacing && (
				<ToggleControl
					checked={ !! noBottomMargin }
					help={ !! noBottomMargin ? __( 'Toggle to add bottom margin back.', 'coblocks' ) : __( 'Toggle to remove any bottom margin.', 'coblocks' ) }
					label={ __( 'Remove bottom spacing', 'coblocks' ) }
					onChange={ () => {
						setAttributes( {
							marginBottom: 0,
							marginBottomMobile: 0,
							marginBottomTablet: 0,
							noBottomMargin: ! noBottomMargin,
						} );

						const nextBlockClientId = select( 'core/block-editor' )
							.getNextBlockClientId( clientId );
						if ( nextBlockClientId && ! noBottomMargin ) {
							dispatch( 'core/block-editor' ).updateBlockAttributes( nextBlockClientId, {
								marginTop: 0,
								marginTopMobile: 0,
								marginTopTablet: 0,
								noTopMargin: ! noTopMargin,
							} );
						}
					} }
				/>
			) }
		</InspectorAdvancedControls>
	) : null;
};

/**
 * Override props assigned to save component to inject attributes
 *
 * @param {Object} extraProps Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 * @return {Object} Filtered props applied to save element.
 */
function applySaveProps( extraProps, blockType, attributes ) {
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
 * React hook function to override the default block element to add wrapper props.
 *
 * @function useEditorProps
 * @param {Object} block        Contains the selected block.
 * @param {string} blockName    String referencing the selected block.
 * @param {Object} props        Object with block props.
 * @param {Object} wrapperProps Object with wrapper props used to extend selected block.
 * @return {Object} Wrapper props to apply to block.
 */
const useEditorProps = ( block, blockName, props, wrapperProps ) => {
	const withBlockSpacing = hasBlockSupport( blockName, 'coBlocksSpacing' );
	let withAlignSupport = hasBlockSupport( blockName, 'align' );

	if ( [ 'core/image' ].includes( blockName ) ) {
		withAlignSupport = true;
	}

	let customData = {};

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
	return wrapperProps;
};

export { applyAttributes, useAdvancedControls, useEditorProps, applySaveProps };

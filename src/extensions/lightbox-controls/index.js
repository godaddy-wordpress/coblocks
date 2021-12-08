/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { select } from '@wordpress/data';
import { PanelRow, ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies.
 */
const blocksWithLightboxSupport = [ 'core/gallery', 'core/image' ];

/**
 * Add custom CoBlocks lightbox controls to selected blocks
 *
 * @function useLightbox
 * @param {Object} props Object with block props.
 * @return {JSX} Wrapped component.
 */
const useLightbox = ( props ) => {
	const { name, attributes, setAttributes, isSelected } = props;
	const { lightbox, images, id } = attributes;

	const hasParentGallery = select( 'core/block-editor' ).
		getBlockParentsByBlockName(
			props.clientId,
			[ 'core/gallery', 'coblocks/gallery-masonry' ]
		)?.length === 0;

	let supportsLightbox = false;
	supportsLightbox = blocksWithLightboxSupport.includes( name ) && !! hasParentGallery;

	const getLightboxHelp = ( checked ) => {
		return checked
			? __( 'Image lightbox is enabled.', 'coblocks' )
			: __( 'Toggle to enable the image lightbox.', 'coblocks' );
	};

	return (
		<>
			{ isSelected && supportsLightbox && ( !! images?.length || !! id ) && (
				<InspectorControls>
					<PanelRow className={ 'coblocks-lightbox-controls' }>
						<ToggleControl
							checked={ !! lightbox }
							help={ getLightboxHelp }
							label={ __( 'Lightbox', 'coblocks' ) }
							onChange={ () => setAttributes( { lightbox: ! lightbox } ) }
						/>
					</PanelRow>
				</InspectorControls>
			) }
		</>
	);
};

/**
 * Add custom CoBlocks editor lightbox classes to selected blocks
 *
 * @param {Object} props        Object with block props.
 * @param {Object} wrapperProps Object with wrapper props used to extend selected block.
 * @return {Object} Wrapper props to apply to block.
 */
const useEditorProps = ( props, wrapperProps ) => {
	const { name, attributes } = props;
	const { lightbox } = attributes;

	const hasParentGallery = select( 'core/block-editor' ).
		getBlockParentsByBlockName(
			props.clientId,
			[ 'core/gallery', 'coblocks/gallery-masonry' ]
		)?.length === 0;

	let supportsLightbox = false;
	supportsLightbox = blocksWithLightboxSupport.includes( name ) && !! hasParentGallery;

	if ( supportsLightbox ) {
		wrapperProps = {
			...wrapperProps,
			className: classnames( wrapperProps?.className, {
				[ `has-lightbox` ]: lightbox,
			} ),
		};
	}

	return wrapperProps;
};

/**
 * Override props assigned to save component to inject lightbox classes.
 * `core/image` blocks nested within galleries should not be capable of setting `lightbox: true`
 * We do not have access to the clientID to identify the nested nature in the save function
 * so we rely on the logic persisting on the edit side to prevent use of the lightbox with nested `core/image`.
 *
 * @param {Object} extraProps Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 * @return {Object} Filtered props applied to save element.
 */
const applySaveProps = ( extraProps, blockType, attributes ) => {
	let supportsLightbox = false;
	supportsLightbox = blocksWithLightboxSupport.includes( blockType?.name );

	if ( supportsLightbox ) {
		const { lightbox } = attributes;

		extraProps.className = classnames( extraProps.className, { [ `has-lightbox` ]: lightbox } );
	}

	return extraProps;
};

/**
 * Filters registered block settings, extends block with lightbox attributes.
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Filtered block settings.
 */
const applyAttributes = ( settings ) => {
	const supportsLightbox = blocksWithLightboxSupport.includes( settings?.name );
	// Add custom attribute
	if ( supportsLightbox ) {
		if ( ! settings?.attributes?.lightbox ) {
			settings.attributes = Object.assign( settings.attributes, {
				lightbox: {
					default: false,
					type: 'boolean',
				},
			} );
		}
	}

	return settings;
};

export { applyAttributes, applySaveProps, useEditorProps, useLightbox };

/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelRow, ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies.
 */
const blocksWithLightboxSupport = [ 'core/gallery', 'core/image' ];

/**
 * Add custom CoBlocks lightbox controls to selected blocks
 *
 * @param {Function} BlockEdit Original component.
 * @return {string} Wrapped component.
 */
const withLightbox = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { name, attributes, setAttributes, isSelected } = props;
		const { lightbox, images, id, className } = attributes;
		let supportsLightbox = false;
		supportsLightbox = blocksWithLightboxSupport.includes( name ) &&
			// We ensure that the `core/image` block is not nested within the masonry.
			! className?.includes( 'masonry-brick' );

		const getLightboxHelp = ( checked ) => {
			return checked
				? __( 'Image lightbox is enabled.', 'coblocks' )
				: __( 'Toggle to enable the image lightbox.', 'coblocks' );
		};

		return (
			<>
				<BlockEdit { ...props } />
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
}, 'withLightbox' );

/**
 * Add custom CoBlocks editor lightbox classes to selected blocks
 *
 * @param {Function} BlockEdit Original component.
 * @return {string} Wrapped component.
 */
const withLightboxClasses = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		const { name, attributes, wrapperProps } = props;
		const { lightbox, className } = attributes;

		let newWrapperProps;
		let newClassName = className;

		let supportsLightbox = false;
		supportsLightbox = blocksWithLightboxSupport.includes( name ) &&
			// We ensure that the `core/image` block is not nested within the masonry.
			! className?.includes( 'masonry-brick' );

		if ( supportsLightbox ) {
			newWrapperProps = wrapperProps;
			newClassName = classnames( className, { [ `has-lightbox` ]: lightbox } );
		}

		return <BlockListBlock { ...props } className={ newClassName } wrapperProps={ newWrapperProps } />;
	};
}, 'withlightboxClasses' );

/**
 * Override props assigned to save component to inject lightbox classes.
 *
 * @param {Object} extraProps Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 * @return {Object} Filtered props applied to save element.
 */
function applyLightboxClasses( extraProps, blockType, attributes ) {
	let supportsLightbox = false;
	supportsLightbox = blocksWithLightboxSupport.includes( blockType?.name ) &&
		// We ensure that the `core/image` block is not nested within the masonry.
		! extraProps?.className?.includes( 'masonry-brick' );

	if ( supportsLightbox ) {
		const { lightbox } = attributes;

		extraProps.className = classnames( extraProps.className, { [ `has-lightbox` ]: lightbox } );
	}

	return extraProps;
}

/**
 * Filters registered block settings, extends block with lightbox attributes.
 *
 * ***Unable to prevent insertion of attributes into conditionally allowed blocks such as the `core/image` block
 * nested within the `coblocks/gallery-masonry` block.***
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Filtered block settings.
 */
function addAttributes( settings ) {
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
}

addFilter( 'blocks.registerBlockType', 'coblocks/lightbox-controls/block-attributes', addAttributes );
addFilter( 'editor.BlockEdit', 'coblocks/lightbox-controls/editor-controls', withLightbox );
addFilter( 'editor.BlockListBlock', 'coblocks/lightbox-controls/editor-lightbox-classes', withLightboxClasses );
addFilter( 'blocks.getSaveContent.extraProps', 'coblocks/lightbox-controls/save-lightbox-classes', applyLightboxClasses );

/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelRow, ToggleControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';

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
		const { lightbox } = attributes;

		const supportsLightbox = blocksWithLightboxSupport.includes( name );

		const getLightboxHelp = ( checked ) => {
			return checked
				? __( 'Image lightbox is enabled.', 'coblocks' )
				: __( 'Toggle to enable the image lightbox.', 'coblocks' );
		};

		return (
			<>
				<BlockEdit { ...props } />
				{ isSelected && supportsLightbox && ( !! props.attributes?.images?.length || !! props.attributes.id ) && (
					<InspectorControls>
						<PanelRow className={ 'coblocks-lightbox-controls' }>
							<ToggleControl
								label={ __( 'Lightbox', 'coblocks' ) }
								checked={ !! lightbox }
								onChange={ () => setAttributes( { lightbox: ! lightbox } ) }
								help={ getLightboxHelp }
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
		const { name, attributes } = props;
		const { lightbox } = attributes;
		const supportsLightbox = blocksWithLightboxSupport.includes( name );

		let wrapperProps;
		let newClassName = props.className;

		if ( supportsLightbox ) {
			wrapperProps = props?.wrapperProps;
			newClassName = classnames( props.className, { [ `has-lightbox` ]: lightbox } );
		}

		return <BlockListBlock { ...props } wrapperProps={ wrapperProps } className={ newClassName } />;
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
	const supportsLightbox = blocksWithLightboxSupport.includes( blockType?.name );

	if ( supportsLightbox ) {
		const { lightbox } = attributes;

		extraProps.className = classnames( extraProps.className, { [ `has-lightbox` ]: lightbox } );
	}

	return extraProps;
}

/**
 * Filters registered block settings, extends block with lightbox attributes.
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
					type: 'boolean',
					default: false,
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

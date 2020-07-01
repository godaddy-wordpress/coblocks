/**
 * External Dependencies
 */
import classnames from 'classnames';
import { startCase } from 'lodash';

/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies.
 */
import OptionSelectorControl from '../../components/option-selector-control';
import gutterOptions from '../../utils/gutter-options';
const blocksWithGutterSupport = [ 'core/group' ];

/**
 * Add custom CoBlocks gutter controls to selected blocks
 *
 * @param {Function} BlockEdit Original component.
 * @return {string} Wrapped component.
 */
const withGutterControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { name, attributes, setAttributes, isSelected } = props;
		const { gutter } = attributes;

		const supportsGutterControls = blocksWithGutterSupport?.includes( name );
		const panelTitle = startCase( name.split( '/' )[ 1 ] );
		return (
			<>
				<BlockEdit { ...props } />
				{ isSelected && supportsGutterControls && (
					<InspectorControls>
						<PanelBody title={ sprintf(
							/* translators: %1$s is placeholder for block name such as Group, or Embed */
							__( '%1$s settings', 'coblocks' ),
							panelTitle
						) }>
							<OptionSelectorControl
								label={ __( 'Gutter', 'coblocks' ) }
								currentOption={ gutter }
								options={ gutterOptions }
								onChange={ ( newGutter ) => setAttributes( { gutter: newGutter } ) }
							/>
						</PanelBody>
					</InspectorControls>
				) }
			</>
		);
	};
}, 'withGutterControls' );

/**
 * Add custom CoBlocks editor gutter classes to selected blocks
 *
 * @param {Function} BlockEdit Original component.
 * @return {string} Wrapped component.
 */
const withGutterClasses = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		const { name, attributes } = props;
		const { gutter } = attributes;
		const supportsGutterControls = blocksWithGutterSupport?.includes( name );

		let wrapperProps;

		if ( supportsGutterControls ) {
			wrapperProps = props?.wrapperProps;
			props.className = classnames( props.className, { [ `has-${ gutter }-gutter` ]: gutter } );
		}

		return <BlockListBlock { ...props } wrapperProps={ wrapperProps } />;
	};
}, 'withGutterClasses' );

/**
 * Override props assigned to save component to inject gutter classes.
 *
 * @param {Object} extraProps Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 *
 * @return {Object} Filtered props applied to save element.
 */
function applyGutterClass( extraProps, blockType, attributes ) {
	const supportsGutterControls = blocksWithGutterSupport?.includes( blockType?.name );

	if ( supportsGutterControls ) {
		const { gutter } = attributes;

		extraProps.className = classnames( extraProps.className, { [ `has-${ gutter }-gutter` ]: gutter } );
	}

	return extraProps;
}

/**
 * Filters registered block settings, extends block with gutter attributes.
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Filtered block settings.
 */
function addAttributes( settings ) {
	const supportsGutterControls = blocksWithGutterSupport?.includes( settings?.name );
	// Add custom attribute
	if ( supportsGutterControls ) {
		if ( ! settings?.attributes?.gutter ) {
			settings.attributes = Object.assign( settings.attributes, {
				gutter: {
					type: 'string',
					default: 'no',
				},
			} );
		}
	}

	return settings;
}

addFilter( 'blocks.registerBlockType', 'coblocks/gutter-controls/block-attributes', addAttributes );
addFilter( 'editor.BlockEdit', 'coblocks/gutter-controls/editor-controls', withGutterControls );
addFilter( 'editor.BlockListBlock', 'coblocks/gutter-controls/editor-gutter-classes', withGutterClasses );
addFilter( 'blocks.getSaveContent.extraProps', 'coblocks/gutter-controls/save-gutter-class', applyGutterClass );

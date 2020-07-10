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
const blocksWithPaddingSupport = [ 'core/group' ];

const paddingOptions = [
	{
		value: 'no',
		label: __( 'None', 'coblocks' ),
		tooltip: __( 'None', 'coblocks' ),
	},
	{
		value: 'small',
		/* translators: abbreviation for small size */
		label: __( 'S', 'coblocks' ),
		tooltip: __( 'Small', 'coblocks' ),
	},
	{
		value: 'medium',
		/* translators: abbreviation for medium size */
		label: __( 'M', 'coblocks' ),
		tooltip: __( 'Medium', 'coblocks' ),
	},
	{
		value: 'large',
		/* translators: abbreviation for large size */
		label: __( 'L', 'coblocks' ),
		tooltip: __( 'Large', 'coblocks' ),
	},
	{
		value: 'huge',
		/* translators: abbreviation for largest size */
		label: __( 'XL', 'coblocks' ),
		tooltip: __( 'Huge', 'coblocks' ),
	},
];

/**
 * Add custom CoBlocks padding controls to selected blocks
 *
 * @param {Function} BlockEdit Original component.
 * @return {string} Wrapped component.
 */
const withPaddingControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { name, attributes, setAttributes, isSelected } = props;
		const { padding } = attributes;

		const supportsPaddingControls = blocksWithPaddingSupport.includes( name );
		const panelTitle = startCase( name.split( '/' )[ 1 ] );
		return (
			<>
				<BlockEdit { ...props } />
				{ isSelected && supportsPaddingControls && (
					<InspectorControls>
						<PanelBody title={ sprintf(
							/* translators: %1$s is placeholder for block name such as Group, or Embed */
							__( '%1$s settings', 'coblocks' ),
							panelTitle
						) }>
							<OptionSelectorControl
								label={ __( 'Padding', 'coblocks' ) }
								currentOption={ padding }
								options={ paddingOptions }
								onChange={ ( newPadding ) => setAttributes( { padding: newPadding } ) }
							/>
						</PanelBody>
					</InspectorControls>
				) }
			</>
		);
	};
}, 'withPaddingControls' );

/**
 * Add custom CoBlocks editor padding classes to selected blocks
 *
 * @param {Function} BlockEdit Original component.
 * @return {string} Wrapped component.
 */
const withPaddingClasses = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		const { name, attributes } = props;
		const { padding } = attributes;
		const supportsPaddingControls = blocksWithPaddingSupport.includes( name );

		let wrapperProps;

		if ( supportsPaddingControls ) {
			wrapperProps = props?.wrapperProps;
			props.className = classnames( props.className, { [ `has-${ padding }-padding` ]: padding } );
		}

		return <BlockListBlock { ...props } wrapperProps={ wrapperProps } />;
	};
}, 'withPaddingClasses' );

/**
 * Override props assigned to save component to inject padding classes.
 *
 * @param {Object} props Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 *
 * @return {Object} Filtered props applied to save element.
 */
function applyPaddingClass( props, blockType, attributes ) {
	const supportsPaddingControls = blocksWithPaddingSupport.includes( blockType?.name );

	if ( supportsPaddingControls ) {
		const { padding } = attributes;

		props.className = classnames( props.className, { [ `has-${ padding }-padding` ]: padding } );
	}

	return props;
}

/**
 * Filters registered block settings, extends block with padding attributes.
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Filtered block settings.
 */
function addAttributes( settings ) {
	const supportsPaddingControls = blocksWithPaddingSupport.includes( settings?.name );
	// Add custom attribute
	if ( supportsPaddingControls ) {
		if ( ! settings?.attributes?.padding ) {
			settings.attributes = Object.assign( settings.attributes, {
				padding: {
					type: 'string',
				},
			} );
		}
	}

	return settings;
}

addFilter( 'blocks.registerBlockType', 'coblocks/padding-controls/block-attributes', addAttributes );
addFilter( 'editor.BlockEdit', 'coblocks/padding-controls/editor-controls', withPaddingControls );
// addFilter( 'editor.BlockListBlock', 'coblocks/padding-controls/editor-padding-classes', withPaddingClasses );
addFilter( 'blocks.getSaveContent.extraProps', 'coblocks/padding-controls/save-padding-class', applyPaddingClass );

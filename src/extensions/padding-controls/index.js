/**
 * External Dependencies
 */
import classnames from 'classnames';
import { startCase } from 'lodash';

/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { __, sprintf } from '@wordpress/i18n';
import { PanelBody, RangeControl } from '@wordpress/components';

/**
 * Internal dependencies.
 */
import OptionSelectorControl from '../../components/option-selector-control';
import PaddingWrapper from './padding-wrapper';
const blocksWithPaddingSupport = [ 'core/group' ];

const paddingOptions = [
	{
		label: __( 'None', 'coblocks' ),
		tooltip: __( 'None', 'coblocks' ),
		value: 'no',
	},
	{
		/* translators: abbreviation for small size */
		label: __( 'S', 'coblocks' ),
		tooltip: __( 'Small', 'coblocks' ),
		value: 'small',
	},
	{
		/* translators: abbreviation for medium size */
		label: __( 'M', 'coblocks' ),
		tooltip: __( 'Medium', 'coblocks' ),
		value: 'medium',
	},
	{
		/* translators: abbreviation for large size */
		label: __( 'L', 'coblocks' ),
		tooltip: __( 'Large', 'coblocks' ),
		value: 'large',

	},
	{
		/* translators: abbreviation for largest size */
		label: __( 'XL', 'coblocks' ),
		tooltip: __( 'Huge', 'coblocks' ),
		value: 'huge',
	},
];

/**
 * Add custom CoBlocks padding controls to selected blocks
 *
 * @function usePaddingControls
 * @param {Object} props Block props object.
 * @return {string} Conditionally rendered block controls.
 */
const usePaddingControls = ( props ) => {
	const { name, attributes, setAttributes, isSelected } = props;
	const { padding, paddingCustom } = attributes;

	const maxValue = attributes.align === 'full' ? 10 : 5;

	const supportsPaddingControls = blocksWithPaddingSupport.includes( name );
	const panelTitle = startCase( name.split( '/' )[ 1 ] );
	return isSelected && supportsPaddingControls ? (
		<InspectorControls>
			<PanelBody title={ sprintf(
				/* translators: %1$s is placeholder for block name such as Group, or Embed */
				__( '%1$s settings', 'coblocks' ),
				panelTitle
			) }>
				<OptionSelectorControl
					currentOption={ padding }
					label={ __( 'Padding', 'coblocks' ) }
					onChange={ ( newPadding ) => setAttributes( { padding: newPadding } ) }
					options={ paddingOptions }
					showCustomOption
				/>
				{
					padding === 'custom' &&
					<RangeControl
						initialValue={ 0 }
						max={ maxValue }
						min={ 0 }
						onChange={ ( newPadding ) => setAttributes( { paddingCustom: newPadding.toString() } ) }
						step={ 0.1 }
						value={ parseFloat( paddingCustom ) || 0 }
						withInputField
					/>
				}
			</PanelBody>
		</InspectorControls>
	) : null;
};

/**
 * Add custom CoBlocks editor padding classes to selected blocks
 *
 * @function useEditorProps
 * @param {Object} props        Object with block props.
 * @param {Object} wrapperProps Object with wrapper props used to extend selected block.
 * @return {Object} Wrapper props to apply to block.
 */
const useEditorProps = ( props, wrapperProps ) => {
	const { name, attributes } = props;
	const { padding, paddingCustom } = attributes;
	const supportsPaddingControls = blocksWithPaddingSupport.includes( name );
	if ( supportsPaddingControls ) {
		wrapperProps = {
			...wrapperProps,
			className: classnames( wrapperProps?.className, { [ `has-${ padding }-padding` ]: padding } ),
		};
		if ( padding === 'custom' ) {
			wrapperProps = {
				...wrapperProps,
				style: {
					...wrapperProps?.style,
					'--coblocks-custom-padding': padding === 'custom' && `${ paddingCustom }em`,
				},
			};
		}
	}
	return wrapperProps;
};

/**
 * Override props assigned to save component to inject padding classes.
 *
 * @param {Object} elem       Original element produced by save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 * @return {Object} Filtered elem applied to save element.
 */
const applySaveProps = ( elem, blockType, attributes ) => {
	const supportsPaddingControls = blocksWithPaddingSupport.includes( blockType?.name );

	if ( supportsPaddingControls ) {
		return (
			<PaddingWrapper { ...attributes }>
				{ elem }
			</PaddingWrapper>
		);
	}

	return elem;
};

/**
 * Filters registered block settings, extends block with padding attributes.
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Filtered block settings.
 */
const applyAttributes = ( settings ) => {
	const supportsPaddingControls = blocksWithPaddingSupport.includes( settings?.name );
	// Add custom attribute
	if ( supportsPaddingControls ) {
		if ( ! settings?.attributes?.padding ) {
			settings.attributes = Object.assign( settings.attributes, {
				padding: {
					type: 'string',
				},
				paddingCustom: {
					default: '0',
					type: 'string',
				},
			} );
		}
	}

	return settings;
};

// this is needed to ensure that the padding information is persisted to the saved data
addFilter( 'blocks.getSaveElement', 'coblocks/padding-controls/save-padding-class', applySaveProps );

export { applyAttributes, useEditorProps, applySaveProps, usePaddingControls };

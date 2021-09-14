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
import { PanelBody, RangeControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies.
 */
import OptionSelectorControl from '../../components/option-selector-control';
import PaddingWrapper from './padding-wrapper';
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
		const { padding, paddingCustom } = attributes;

		const maxValue = attributes.align === 'full' ? 10 : 5;

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
								showCustomOption
								onChange={ ( newPadding ) => setAttributes( { padding: newPadding } ) }
							/>
							{
								padding === 'custom' &&
								<RangeControl
									step={ 0.1 }
									initialValue={ 0 }
									value={ parseFloat( paddingCustom ) || 0 }
									onChange={ ( newPadding ) => setAttributes( { paddingCustom: newPadding.toString() } ) }
									min={ 0 }
									max={ maxValue }
									withInputField
								/>
							}
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
 * @param {Function} BlockListBlock Original component.
 * @return {string} Wrapped component.
 */
const withPaddingClasses = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		const { name, attributes } = props;
		const { padding, paddingCustom } = attributes;
		const supportsPaddingControls = blocksWithPaddingSupport.includes( name );

		if ( supportsPaddingControls ) {
			let wrapperProps = props.wrapperProps;
			wrapperProps = {
				...props.wrapperProps,
				style: {
					...props.wrapperProps?.style,
					'--coblocks-custom-padding': padding === 'custom' && `${ paddingCustom }em`,
				},
			};

			const newClassnames = classnames( props.className, { [ `has-${ padding }-padding` ]: padding } );

			return (
				<BlockListBlock { ...props } className={ newClassnames } wrapperProps={ wrapperProps } />
			);
		}

		return <BlockListBlock { ...props } />;
	};
}, 'withPaddingClasses' );

/**
 * Override props assigned to save component to inject padding classes.
 *
 * @param {Object} elem       Original element produced by save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 * @return {Object} Filtered elem applied to save element.
 */
function applySavePadding( elem, blockType, attributes ) {
	const supportsPaddingControls = blocksWithPaddingSupport.includes( blockType?.name );

	if ( supportsPaddingControls ) {
		return (
			<PaddingWrapper { ...attributes }>
				{ elem }
			</PaddingWrapper>
		);
	}

	return elem;
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
				paddingCustom: {
					type: 'string',
				},
			} );
		}
	}

	return settings;
}

addFilter( 'blocks.registerBlockType', 'coblocks/padding-controls/block-attributes', addAttributes );
addFilter( 'editor.BlockEdit', 'coblocks/padding-controls/editor-controls', withPaddingControls );
addFilter( 'editor.BlockListBlock', 'coblocks/padding-controls/editor-padding-classes', withPaddingClasses );
addFilter( 'blocks.getSaveElement', 'coblocks/padding-controls/save-padding-class', applySavePadding );

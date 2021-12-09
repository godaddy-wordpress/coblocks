/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorAdvancedControls } from '@wordpress/block-editor';
import { ToggleControl } from '@wordpress/components';

/**
 * Because `core/button` is a child of `core/buttons` we must be sure to extend the inner child block
 * as opposed to the outer parent wrapper method that other extensions use.
 */
const allowedBlocks = [ 'core/button' ];

/**
 * Filters registered block settings, extending attributes with settings
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Filtered block settings.
 */
function applyAttributes( settings ) {
	// Use Lodash's assign to gracefully handle if attributes are undefined
	if ( allowedBlocks.includes( settings.name ) ) {
		settings.attributes = Object.assign( settings.attributes, {
			isFullwidth: {
				default: false,
				type: 'boolean',
			},
		} );
	}

	return settings;
}

/**
 * Add custom Button Controls to selected blocks
 *
 * @param {Object} props
 * @return {string} Wrapped component.
 */
const useButtonControls = ( props ) => {
	const {
		name,
		attributes,
		setAttributes,
	} = props;

	const {
		isFullwidth,
	} = attributes;

	const hasFullwidth = allowedBlocks.includes( name );

	return (
		<>
			{ hasFullwidth &&
			<InspectorAdvancedControls>
				<ToggleControl
					checked={ !! isFullwidth }
					help={ !! isFullwidth ? __( 'Displaying as full width.', 'coblocks' ) : __( 'Toggle to display button as full width.', 'coblocks' ) }
					label={ __( 'Display fullwidth', 'coblocks' ) }
					onChange={ () => setAttributes( { isFullwidth: ! isFullwidth } ) }
				/>
			</InspectorAdvancedControls>
			}
		</>
	);
};

/**
 * Override props assigned to save component to inject atttributes
 *
 * @param {Object} extraProps Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 * @return {Object} Filtered props applied to save element.
 */
function applySaveProps( extraProps, blockType, attributes ) {
	const hasFullwidth = allowedBlocks.includes( blockType.name );

	if ( hasFullwidth ) {
		const { isFullwidth } = attributes;

		if ( typeof isFullwidth !== 'undefined' && isFullwidth ) {
			extraProps.className = classnames( extraProps.className, 'w-100' );
		}
	}
	return extraProps;
}

/**
 * Extend custom Button Controls attributes to be used in the editor.
 *
 * @param {Object} block        Should be the inner child button block.
 * @param {string} blockName    Name of the selected block.
 * @param {Object} props        Object containing selected block props.
 * @param {Object} wrapperProps Object containing existing wrapper props.
 */
const useEditorProps = ( block, blockName, props, wrapperProps ) => {
	let customData = {};
	const hasFullwidth = allowedBlocks.includes( blockName );

	if ( hasFullwidth && block?.attributes ) {
		const { isFullwidth } = block.attributes;

		if ( typeof isFullwidth !== 'undefined' && isFullwidth ) {
			customData = Object.assign( { 'data-coblocks-button-fullwidth': 1 } );
		}
	}

	if ( hasFullwidth ) {
		wrapperProps = {
			...wrapperProps,
			...customData,
		};
	}

	return wrapperProps;
};

export { useButtonControls, useEditorProps, applyAttributes, applySaveProps };

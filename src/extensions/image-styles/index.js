/**
 * Styles
 */
import './styles/style.scss';
import './styles/editor.scss';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockStyle } = wp.blocks;

// Add default for reset, until WordPress 5.3 is released.
registerBlockStyle( 'core/image', {
	name: 'default',
	label: __( 'Default' ),
	isDefault: true,
} );

registerBlockStyle( 'core/image', {
	name: 'bottom-wave',
	label: __( 'Bottom Wave' ),
	isDefault: false,
} );

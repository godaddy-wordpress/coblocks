/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockStyle } = wp.blocks;

/**
 * Internal Dependencies
 */
import './styles/style.scss';

// Default list style for reset.
registerBlockStyle( 'core/list', {
	name: 'default',
	label: __( 'Default' ),
	isDefault: true,
} );

registerBlockStyle( 'core/list', {
	name: 'none',
	label: __( 'None' ),
	isDefault: false,
} );

registerBlockStyle( 'core/list', {
	name: 'checkbox',
	label: __( 'Checkbox' ),
	isDefault: false,
} );


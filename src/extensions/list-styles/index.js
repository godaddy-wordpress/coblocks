/**
 * WordPress dependencies
 */
const { _x } = wp.i18n;
const { registerBlockStyle } = wp.blocks;

/**
 * Internal Dependencies
 */
import './styles/style.scss';

// Default list style for reset.
registerBlockStyle( 'core/list', {
	name: 'default',
	label: _x( 'Default', 'block styles' ),
	isDefault: true,
} );

registerBlockStyle( 'core/list', {
	name: 'none',
	label: _x( 'None', 'block styles' ),
	isDefault: false,
} );

registerBlockStyle( 'core/list', {
	name: 'checkbox',
	label: _x( 'Checkbox', 'block styles' ),
	isDefault: false,
} );


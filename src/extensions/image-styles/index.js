/**
 * Styles
 */
import './styles/style.scss';

/**
 * WordPress dependencies
 */
const { _x } = wp.i18n;
const { registerBlockStyle } = wp.blocks;

// Add default for reset, until WordPress 5.3 is released.
registerBlockStyle( 'core/image', {
	name: 'default',
	label: _x( 'Default', 'block style' ),
	isDefault: true,
} );

registerBlockStyle( 'core/image', {
	name: 'bottom-wave',
	label: _x( 'Bottom Wave', 'block style' ),
	isDefault: false,
} );

registerBlockStyle( 'core/image', {
	name: 'top-wave',
	label: _x( 'Top Wave', 'block style' ),
	isDefault: false,
} );

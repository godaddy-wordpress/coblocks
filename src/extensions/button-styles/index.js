/**
 * WordPress dependencies
 */
const { _x } = wp.i18n;
const { registerBlockStyle } = wp.blocks;

/**
 * Internal Dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';

// Register custom styles for the core list block.
registerBlockStyle( 'core/button', {
	name: 'circular',
	label: _x( 'Circular', 'block styles' ),
	isDefault: false,
} );

registerBlockStyle( 'core/button', {
	name: '3d',
	label: _x( '3D', 'block styles' ),
	isDefault: false,
} );

registerBlockStyle( 'core/button', {
	name: 'shadow',
	label: _x( 'Shadow', 'block styles' ),
	isDefault: false,
} );

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockStyle } = wp.blocks;

/**
 * Internal Dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';

// Register custom styles for the core list block.
registerBlockStyle( 'core/button', {
	name: 'circular',
	label: __( 'Circular' ),
	isDefault: false,
} );

registerBlockStyle( 'core/button', {
	name: '3d',
	label: __( '3D' ),
	isDefault: false,
} );

registerBlockStyle( 'core/button', {
	name: 'shadow',
	label: __( 'Shadow' ),
	isDefault: false,
} );

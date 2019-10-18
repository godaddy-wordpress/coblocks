/**
 * WordPress dependencies
 */
import { _x } from '@wordpress/i18n';
import { registerBlockStyle } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';

// Register custom styles for the core list block.
registerBlockStyle( 'core/button', {
	name: 'circular',
	label: _x( 'Circular', 'block styles', 'coblocks' ),
	isDefault: false,
} );

registerBlockStyle( 'core/button', {
	name: '3d',
	label: _x( '3D', 'block styles', 'coblocks' ),
	isDefault: false,
} );

registerBlockStyle( 'core/button', {
	name: 'shadow',
	label: _x( 'Shadow', 'block styles', 'coblocks' ),
	isDefault: false,
} );
